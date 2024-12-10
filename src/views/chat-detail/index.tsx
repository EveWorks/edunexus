"use client";

import Chat from "@/components/chats";
import { getConversationDetail } from "@/store/features/chat";
import { useAppDispatch } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getConversationDetail({
        id,
      })
    );
  }, []);

  return <Chat id={id} />;
};

export default Dashboard;
