"use client";

import Chat from "@/components/chats";
import { usePathname } from "next/navigation";

const Dashboard = () => {
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];

  return <Chat id={id} />;
};

export default Dashboard;
