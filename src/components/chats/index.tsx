import { useEffect, useMemo, useRef, useState } from "react";
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
import useUser from "@/hooks/use-user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addMessage,
  sendMessage,
  updateMsgLoader,
} from "@/store/features/chat";
import { useAudio } from "@/hooks/use-audio";
import useMixpanel from "@/hooks/use-mixpanel";

const Chat = ({ id }: { id: string }) => {
  // const captionTimeout = useRef<any>(null);
  const keepAliveInterval = useRef<any>(null);
  const preview = localStorage.getItem("preview") || "1";
  const { msgLoading, chatDetail } = useAppSelector((state: any) => state.Chat);
  const { user } = useUser();
  const { getAudio } = useAudio();
  const dispatch = useAppDispatch();
  const { connection, connectToDeepgram, connectionState } = useDeepgram();
  const {
    setupMicrophone,
    microphone,
    startMicrophone,
    stopMicrophone,
    microphoneState,
  } = useMicrophone();
  const mixpanel = useMixpanel();

  const loadingState = useMemo(() => {
    return msgLoading;
  }, [msgLoading]);
  const chat = useMemo(() => {
    return chatDetail;
  }, [chatDetail]);
  const connectionStatememoized = useMemo(() => {
    return connectionState;
  }, [connectionState]);
  const microphoneStateMemoized = useMemo(() => {
    return microphoneState;
  }, [microphoneState]);

  useEffect(() => {
    if (id) {
      setupMicrophone();
    }
  }, []);

  useEffect(() => {
    if (id && microphoneStateMemoized === MicrophoneState.Ready) {
      connectToDeepgram({
        model: "nova-2",
        smart_format: true,
        filler_words: true,
        utterance_end_ms: 4000,
        interim_results: true,
        vad_events: true,
        endpointing: 2000,
      });
    }
  }, [microphoneStateMemoized]);

  const sendNewMessage = async (text: string) => {
    if (loadingState) {
      return;
    }

    if (chat?.topicid?.id && !loadingState) {
      dispatch(updateMsgLoader(true));
      stopMicrophone();

      // if (preview !== "2") {
      dispatch(
        addMessage({
          message: text,
          message_type: "message",
          topicid: chat.topicid.id,
          conversation_id: id,
          userid: {
            firstname: user.firstname,
            lastname: user.lastname,
            id: user.id,
          },
        })
      );
      // }

      const payload = {
        data: {
          message: text,
          message_type: "message",
          userid: user.id,
          conversation_id: id,
          topicid: chat.topicid.id,
          audioCallback: (response: string) => getAudio(response),
        },
      };

      mixpanel.track("user_interacted_with_key_feature", {
        conversation_id: id,
        message: text,
        email: user.email,
        text: "audio",
      });
      await dispatch(sendMessage(payload));
    }
  };

  useEffect(() => {
    if (!id) return;
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      if (e.data.size > 0 && !loadingState) {
        connection?.send(e.data);
      }
    };

    const onTranscript = async (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      const transcript = data.channel.alternatives[0].transcript;
      console.log("data", isFinal, !loadingState, transcript);

      if (isFinal && !loadingState) {
        if (transcript !== "") {
          sendNewMessage(transcript);
        }
        // clearTimeout(captionTimeout.current);
        // captionTimeout.current = setTimeout(() => {
        //   clearTimeout(captionTimeout.current);
        // }, 3000);
      }
    };

    if (connectionStatememoized === LiveConnectionState.OPEN) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone?.addEventListener(MicrophoneEvents.DataAvailable, onData);

      startMicrophone();
    }

    return () => {
      console.log("data disconnecting");
      connection?.removeListener(
        LiveTranscriptionEvents.Transcript,
        onTranscript
      );
      microphone?.removeEventListener(MicrophoneEvents.DataAvailable, onData);
      // clearTimeout(captionTimeout.current);
    };
  }, [connectionStatememoized, id]);

  useEffect(() => {
    if (!id) return;
    if (!connection) return;

    if (
      microphoneStateMemoized !== MicrophoneState.Open &&
      connectionStatememoized === LiveConnectionState.OPEN
    ) {
      connection.keepAlive();

      keepAliveInterval.current = setInterval(() => {
        connection.keepAlive();
      }, 5000);
    } else {
      clearInterval(keepAliveInterval.current);
    }

    return () => {
      console.log("data disconnecting 2");
      clearInterval(keepAliveInterval.current);
    };
  }, [microphoneStateMemoized, connectionStatememoized]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader preview={preview} />
      <ChatContent preview={preview} />
      <ChatFooter id={id} preview={preview} />
    </div>
  );
};

export default Chat;
