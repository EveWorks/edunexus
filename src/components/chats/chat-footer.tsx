import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { MdMicNone } from "react-icons/md";
import { Button, Textarea } from "rizzui";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { FaStop } from "react-icons/fa6";
import AudioLoader from "./audio-loader";
import AudioPreview from "./audio-preview";
import useDevice from "@/hooks/use-device";
import { useMicrophone } from "@/context/MicrophoneContextProvider";
import useUser from "@/hooks/use-user";
import useChatMessages from "@/hooks/use-chat-messages";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getConversationList } from "@/store/features/chat";
import { useRouter } from "next/navigation";

const ChatFooter = ({ id, preview }: { id?: string; preview: boolean }) => {
  const textareaRef = useRef(null);
  const { isMobile } = useDevice();
  const user = useUser();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentTopic = useAppSelector((state: any) => state.Chat.currentTopic);
  const { startMicrophone, stopMicrophone, microphone } = useMicrophone();
  const { sendMessage, msgLoading } = useChatMessages({ id });

  const callbackMessage = () => {
    dispatch(getConversationList({ userId: user.id }));
  };

  const sendNewMessage = async (data: any) => {
    if (data?.message && !msgLoading) {
      const payload = {
        message: data?.message,
        message_type: "message",
        topicid: currentTopic,
        userid: user.id,
        conversationid: id,
        callback: callbackMessage,
      };
      const response: any = await sendMessage(payload);
      if (response?.conversation?.id) {
        router.replace(`/chat/${response?.conversation?.id}`);
      }
    }
  };

  const handleInput = () => {
    const textarea: any = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";

      textarea.style.height = Math.min(textarea.scrollHeight, 250) + "px";
    }
  };

  return (
    <div className="flex items-end p-[1.25rem]">
      {microphone?.state === "recording" ? (
        <Button
          onClick={() => stopMicrophone()}
          variant="text"
          className="p-0 bg-[#FFC42526] hover:bg-[#FFC425] hover:text-[#0C0C0C] rounded-[15px] md:rounded-[3.125rem] h-[45px] w-[45px] md:h-[5.125rem] md:w-[5.9375rem]"
        >
          <FaStop className="w-[1.875rem] h-[1.875rem]" />
        </Button>
      ) : (
        <Button
          onClick={() => startMicrophone()}
          variant="text"
          className="p-0 bg-[#FFC42526] hover:bg-[#FFC425] hover:text-[#0C0C0C] rounded-[15px] md:rounded-[3.125rem] h-[45px] w-[45px] md:h-[5.125rem] md:w-[5.9375rem]"
        >
          <MdMicNone className="w-[1.875rem] h-[1.875rem]" />
        </Button>
      )}
      <form
        onSubmit={handleSubmit(sendNewMessage)}
        className={`${
          preview && !isMobile ? "w-[calc(100%-10rem)]" : "w-full"
        } transition-all duration-400`}
      >
        <div className="w-full relative transition-all duration-400">
          {errors?.message && (
            <p className="text-red text-[13px] my-1 rizzui-textarea-error-text pl-3">
              {errors?.message?.message}
            </p>
          )}
          <Textarea
            {...register("message", {
              maxLength: {
                value: 5000,
                message: "Message has maximum limit of 5000 characters",
              },
            })}
            placeholder="Type anything here"
            className="w-full transition-all duration-400 "
            onInput={handleInput}
            style={{
              overflow: "hidden",
              // maxHeight: '250px',
              resize: "none",
            }}
            textareaClassName="ml-[0.625rem] border-2 border-[#525252] md:border-0 bg-[#0C0C0C] text-[15px] md:text-[1.25rem] leading-[30px] md:leading-[0.9375rem] rounded-[15px] md:rounded-[1.5625rem] h-[45px] md:h-[5.125rem] !py-[5px] md:!py-[2.125rem] md:pl-[1.25rem] md:pr-[2.5rem] px-[15px]"
          ></Textarea>
          <Button
            type="submit"
            disabled={watch("message")?.length < 1 || msgLoading}
            variant="text"
            className="p-0 rounded-[3.125rem] h-[1.875rem] w-[1.875rem] absolute bottom-[10px] md:bottom-[1.3125rem] right-[0.625rem]"
          >
            {watch("message")?.length < 1 || msgLoading ? (
              <FiSend className="w-[1.25rem] h-[1.25rem]" />
            ) : (
              <BsFillSendFill className="text-primary  w-[1.25rem] h-[1.25rem]" />
            )}
          </Button>
          {watch("message")?.length > 0 && (
            <span className="text-[1.25rem] leading-[0.9375rem] absolute bottom-[1.625rem] right-[3REM] text-[#525252]">
              {watch("message")?.length}/5000
            </span>
          )}
        </div>
      </form>
      <AudioLoader show={preview && !isMobile} size="5.9375rem" />
    </div>
  );
};

export default ChatFooter;
