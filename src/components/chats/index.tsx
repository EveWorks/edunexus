import { useEffect, useRef, useState } from "react";
import ChatContent from "@/components/chats/chat-content";
import ChatFooter from "@/components/chats/chat-footer";
import ChatHeader from "@/components/chats/chat-header";
import {
  LiveConnectionState,
  LiveTranscriptionEvent,
  LiveTranscriptionEvents,
  useDeepgram,
} from "@/context/DeepgramContextProvider";
import {
  MicrophoneEvents,
  MicrophoneState,
  useMicrophone,
} from "@/context/MicrophoneContextProvider";
import axios from "@/axios";
import useUser from "@/hooks/use-user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage, sendMessage, updateMsgLoader } from "@/store/features/chat";
import { useAudio } from "@/hooks/use-audio";
import { Button } from "rizzui";

const Chat = ({ id }: { id: string }) => {
  const captionTimeout = useRef<any>(null);
  const keepAliveInterval = useRef<any>(null);
  const [preview, setPreview] = useState<string>("1");
  const { msgLoading, chatDetail } = useAppSelector((state: any) => state.Chat);
  const { user } = useUser();
  const { getAudio } = useAudio();
  const dispatch = useAppDispatch();
  const { connection, connectToDeepgram, connectionState } = useDeepgram();
  const { setupMicrophone, microphone, startMicrophone, microphoneState } =
    useMicrophone();

  useEffect(() => {
    if (id) {
      setupMicrophone();
    }
  }, []);

  useEffect(() => {
    if (id && microphoneState === MicrophoneState.Ready) {
      connectToDeepgram({
        model: "nova-2",
        smart_format: true,
        filler_words: true,
        utterance_end_ms: 3000,
        interim_results: true,
        vad_events: true,
        endpointing: 300,
      });
    }
  }, [microphoneState]);

  const sendNewMessage = async (text: string) => {
    if (chatDetail?.topicid?.id && !msgLoading) {
      dispatch(updateMsgLoader(true));

      if (preview !== "2") {
        dispatch(
          addMessage({
            message: text,
            message_type: "message",
            topicid: chatDetail.topicid.id,
            conversation_id: id,
            userid: {
              firstname: user.firstname,
              lastname: user.lastname,
              id: user.id,
            },
          })
        );
      }

      const payload = {
        data: {
          message: text,
          message_type: "message",
          userid: user.id,
          conversation_id: id,
          topicid: chatDetail.topicid.id,
          audioCallback: (response: string) => getAudio(response),
        },
      };

      await dispatch(sendMessage(payload));
    }
  };

  useEffect(() => {
    if (!id) return;
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      if (e.data.size > 0 && !msgLoading) {
        connection?.send(e.data);
      }
    };

    const onTranscript = async (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      const transcript = data.channel.alternatives[0].transcript;

      if (isFinal && speechFinal) {
        if (transcript !== "" && !msgLoading) {
          sendNewMessage(transcript);
        }
        clearTimeout(captionTimeout.current);
        captionTimeout.current = setTimeout(() => {
          clearTimeout(captionTimeout.current);
        }, 3000);
      }
    };

    if (connectionState === LiveConnectionState.OPEN) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);

      startMicrophone();
    }

    return () => {
      connection.removeListener(
        LiveTranscriptionEvents.Transcript,
        onTranscript
      );
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
      clearTimeout(captionTimeout.current);
    };
  }, [connectionState]);

  useEffect(() => {
    if (!id) return;
    if (!connection) return;

    if (
      microphoneState !== MicrophoneState.Open &&
      connectionState === LiveConnectionState.OPEN
    ) {
      connection.keepAlive();

      keepAliveInterval.current = setInterval(() => {
        connection.keepAlive();
      }, 10000);
    } else {
      clearInterval(keepAliveInterval.current);
    }

    return () => {
      clearInterval(keepAliveInterval.current);
    };
  }, [microphoneState, connectionState]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader setPreview={setPreview} />
      <ChatContent preview={preview} />
      <ChatFooter id={id} preview={preview} />
    </div>
  );
};

export default Chat;
