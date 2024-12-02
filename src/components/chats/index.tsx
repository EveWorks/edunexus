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
import useChatMessages from "@/hooks/use-chat-messages";
import { getUser } from "@/utils/get-user";
import axios from "@/axios";
import { Button } from "rizzui";

const data: any = [];

const Chat = ({ id }: { id: string }) => {
  const [preview, setPreview] = useState<any>(false);
  const {
    messages,
    setMessages,
    sendMessage,
    msgLoading,
    loading,
    error,
    hasMore,
    loadMore,
    totalItems,
  } = useChatMessages({ id, initialPage: 1, limit: 10 });
  const user = getUser();
  const { connection, connectToDeepgram, connectionState } = useDeepgram();
  const { setupMicrophone, microphone, startMicrophone, microphoneState } =
    useMicrophone();
  const captionTimeout = useRef<any>();
  const keepAliveInterval = useRef<any>();

  useEffect(() => {
    if (id) {
      setupMicrophone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        endpointing: 200,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState]);

  const getAudio = async (text: string) => {
    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-audio`,
      { text },
      { responseType: "blob" }
    );
    if (response) {
      const audioBlob = await response;
      // Create an audio URL from the Blob
      const audioUrl = URL.createObjectURL(audioBlob);
      // Create an audio element and play the audio
      const audio = new Audio(audioUrl);
      audio.play();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!id) return;
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      // iOS SAFARI FIX:
      // Prevent packetZero from being sent. If sent at size 0, the connection will close.
      if (e.data.size > 0) {
        connection?.send(e.data);
      }
    };

    const onTranscript = async (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      let thisCaption = data.channel.alternatives[0].transcript;

      if (isFinal && speechFinal) {
        if (thisCaption !== "") {
          setMessages((prev: any) => [...prev, { message: thisCaption }]);

          const payload = {
            message: thisCaption,
            message_type: "text",
            topicid: id,
            userid: user.id,
            callback: getAudio,
          };
          await sendMessage(payload);
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
      // prettier-ignore
      connection.removeListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
      clearTimeout(captionTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState, connectionState]);

  useEffect(() => {
    setMessages(data);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Button
        onClick={() => {
          getAudio("Make a request and configure the request with options");
        }}
      >
        Click
      </Button>
      <ChatHeader setPreview={setPreview} />
      <ChatContent chats={messages} preview={preview} />
      <ChatFooter setChats={setMessages} preview={preview} />
    </div>
  );
};

export default Chat;
