"use client";

import Chat from "@/components/chats";
import { useMicrophone } from "@/context/MicrophoneContextProvider";
import useUser from "@/hooks/use-user";
import { getConversationDetail } from "@/store/features/chat";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];
  const dispatch = useAppDispatch();
  const { setupMicrophone } = useMicrophone();
  const { user, token } = useUser();

  useEffect(() => {
    if (id) {
      setupMicrophone();
    }
    dispatch(
      getConversationDetail({
        id,
      })
    );
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const apiEndpoint = "/api/track-close";
      // const apiEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/conversation/update-personalization`;

      const payload = JSON.stringify({
        token: token,
        conversationId: id,
        userId: user.id,
      });

      navigator.sendBeacon(apiEndpoint, payload);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <Chat id={id} />;
};

export default Dashboard;
