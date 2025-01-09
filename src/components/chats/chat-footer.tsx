import { Suspense, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { BsFillSendFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { MdMicNone } from "react-icons/md";
import { Button, Input, Textarea } from "rizzui";
import { FaStop } from "react-icons/fa6";
import useDevice from "@/hooks/use-device";
import { useMicrophone } from "@/context/MicrophoneContextProvider";
import useUser from "@/hooks/use-user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage, sendMessage } from "@/store/features/chat";
import { useAudio } from "@/hooks/use-audio";
import useMixpanel from "@/hooks/use-mixpanel";
import dynamic from "next/dynamic";

// Lazy load the VisualizerComponent with no SSR
const VisualizerComponent = dynamic(() => import("@/components/orb"), {
  ssr: false, // Disable server-side rendering for this component
});

const ChatFooter = ({ id, preview }: { id?: string; preview: string }) => {
  const textareaRef = useRef(null);
  const { isMobile } = useDevice();
  const { user } = useUser();
  const { getAudio } = useAudio();
  const mixpanel = useMixpanel();

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

  const orbRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { startMicrophone, stopMicrophone, microphone } = useMicrophone();
  const { msgLoading, chatDetail, error }: any = useAppSelector(
    (state: any) => state.Chat
  );
  const loadingState = useMemo(() => {
    return msgLoading;
  }, [msgLoading]);

  useEffect(() => {
    startMicrophone();
  }, []);

  const sendNewMessage = async (data: any) => {
    if (loadingState) {
      return;
    }

    if (data?.message && !loadingState && chatDetail?.topicid?.id) {
      const payload: any = {
        data: {
          message: data?.message,
          message_type: "message",
          topicid: chatDetail?.topicid?.id,
          userid: user.id,
          conversation_id: id,
          audioCallback: (response: string) => getAudio(response),
        },
      };

      dispatch(
        addMessage({
          message: data?.message,
          message_type: "message",
          topicid: chatDetail?.topicid?.id,
          conversation_id: id,
          userid: {
            firstname: user.firstname,
            lastname: user.lastname,
            id: user.id,
          },
        })
      );

      setValue("message", "");
      await dispatch(sendMessage(payload));

      mixpanel.track("user_interacted_with_key_feature", {
        conversation_id: id,
        message: data?.message,
        email: user.email,
        type: "text",
      });
    }
  };

  const handleInput = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSubmit(sendNewMessage)();
    }
  };

  return (
    <div className="flex items-end p-[1.25rem]">
      {microphone?.state === "recording" ? (
        <Button
          onClick={() => stopMicrophone()}
          isLoading={loadingState}
          variant="text"
          className="p-0 bg-[#FFC42526] hover:bg-[#FFC425] hover:text-[#0C0C0C] rounded-[15px] md:rounded-[3.125rem] h-[45px] w-[45px] md:h-[5.125rem] md:w-[5.9375rem]"
        >
          <FaStop className="w-[1.875rem] h-[1.875rem]" />
        </Button>
      ) : (
        <Button
          onClick={() => startMicrophone()}
          isLoading={loadingState}
          variant="text"
          className="p-0 bg-[#FFC42526] hover:bg-[#FFC425] hover:text-[#0C0C0C] rounded-[15px] md:rounded-[3.125rem] h-[45px] w-[45px] md:h-[5.125rem] md:w-[5.9375rem]"
        >
          <MdMicNone className="w-[1.875rem] h-[1.875rem]" />
        </Button>
      )}
      <form
        onSubmit={handleSubmit(sendNewMessage)}
        className={`${
          preview === "2" && microphone?.state === "recording" && !isMobile
            ? "w-[calc(100%-10rem)]"
            : "w-full"
        } transition-all duration-400`}
      >
        <div className="w-full relative transition-all duration-400">
          {error && (
            <p className="text-red text-[13px] my-1 rizzui-textarea-error-text pl-3">
              {error}
            </p>
          )}
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
            onKeyDown={handleInput}
            style={{
              overflow: "hidden",
              // maxHeight: '250px',
              resize: "none",
            }}
            disabled={msgLoading}
            textareaClassName="ml-[0.625rem] border-2 border-[#525252] md:border-0 bg-[#0C0C0C] text-[15px] md:text-[1.25rem] leading-[30px] md:leading-[0.9375rem] rounded-[15px] md:rounded-[1.5625rem] h-[45px] md:h-[5.125rem] !py-[5px] md:!py-[2.125rem] md:pl-[1.25rem] md:pr-[2.5rem] px-[15px]"
          />
          <Button
            type="submit"
            disabled={watch("message")?.length < 1 || msgLoading}
            isLoading={msgLoading}
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
      {preview === "2" && !isMobile && (
        <div
          className={`relative transition-all duration-400 scale-[1] ms-[1rem] md:h-[6rem] md:w-[6rem]`}
          ref={orbRef}
        >
          <Suspense fallback={<div>Alinda is waking up...</div>}>
            <VisualizerComponent
              size="sm"
              width={150}
              height={150}
              wrapperHeight={
                orbRef?.current?.clientHeight
                  ? orbRef?.current?.clientHeight
                  : null
              }
              wrapperWidth={
                orbRef?.current?.clientWidth
                  ? orbRef?.current?.clientWidth
                  : null
              }
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ChatFooter;
