"use client";

import Chat from "@/components/chats";
import { useMicrophone } from "@/context/MicrophoneContextProvider";
import { getConversationDetail } from "@/store/features/chat";
import { useAppDispatch } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];
  const dispatch = useAppDispatch();
  const { setupMicrophone } = useMicrophone();

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

  return <Chat id={id} />;
};

export default Dashboard;
