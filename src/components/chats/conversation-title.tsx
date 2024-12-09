import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { MdMicNone } from "react-icons/md";
import { Button, Input, Textarea } from "rizzui";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { FaStop } from "react-icons/fa6";
import AudioLoader from "./audio-loader";
import AudioPreview from "./audio-preview";
import useDevice from "@/hooks/use-device";
import { useMicrophone } from "@/context/MicrophoneContextProvider";
import useUser from "@/hooks/use-user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addMessage,
  createConversation,
  getConversationList,
  sendMessage,
} from "@/store/features/chat";
import { useRouter } from "next/navigation";

const ConversationTitle = ({ topicId }: { topicId: string }) => {
  const { user } = useUser();

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
  const { loading } = useAppSelector((state: any) => state.Chat);

  const callbackMessage = (id: string) => {
    setValue("message", "");
    dispatch(getConversationList({ userId: user.id }));
    router.replace(`/chat/${id}`);
  };

  const createNewConversation = async (data: any) => {
    if (data?.message && !loading) {
      const payload: any = {
        conversation_title: data?.message,
        topicid: topicId,
        userid: user.id,
        callback: callbackMessage,
      };

      dispatch(createConversation(payload));
    }
  };

  return (
    <div className="flex items-end p-[1.25rem]">
      <form
        onSubmit={handleSubmit(createNewConversation)}
        className={`w-full transition-all duration-400`}
      >
        <div className="w-full relative transition-all duration-400">
          {errors?.message && (
            <p className="text-red text-[13px] my-1 rizzui-textarea-error-text pl-3">
              {errors?.message?.message}
            </p>
          )}
          <Input
            {...register("message", {
              maxLength: {
                value: 200,
                message:
                  "Conversation title has maximum limit of 200 characters",
              },
            })}
            placeholder="Write a conversation title here"
            className="w-full transition-all duration-400 "
            style={{
              overflow: "hidden",
              resize: "none",
            }}
            inputClassName="ml-[0.625rem] border-2 border-[#525252] md:border-0 bg-[#0C0C0C] text-[15px] md:text-[1.25rem] leading-[30px] md:leading-[0.9375rem] rounded-[15px] md:rounded-[1.5625rem] h-[45px] md:h-[5.125rem] !py-[5px] md:!py-[2.125rem] md:pl-[1.25rem] md:pr-[2.5rem] px-[15px]"
          />
          <Button
            type="submit"
            disabled={watch("message")?.length < 1 || loading}
            isLoading={loading}
            variant="text"
            className="p-0 rounded-[3.125rem] h-[1.875rem] w-[1.875rem] absolute bottom-[10px] md:bottom-[1.3125rem] right-[0.625rem]"
          >
            {watch("message")?.length < 1 || loading ? (
              <FiSend className="w-[1.25rem] h-[1.25rem]" />
            ) : (
              <BsFillSendFill className="text-primary  w-[1.25rem] h-[1.25rem]" />
            )}
          </Button>
          {watch("message")?.length > 0 && (
            <span className="text-[1.25rem] leading-[0.9375rem] absolute bottom-[1.625rem] right-[3REM] text-[#525252]">
              {watch("message")?.length}/200
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ConversationTitle;
