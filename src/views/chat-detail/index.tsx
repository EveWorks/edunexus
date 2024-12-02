"use client";

import Chat from "@/components/chats";
import ChatProvider from "@/components/provider/chat-provider";
import { usePathname } from "next/navigation";

const Dashboard = () => {
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];

  return (
    <ChatProvider>
      <Chat id={id} />
    </ChatProvider>
  );
};

export default Dashboard;
