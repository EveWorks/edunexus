import { useState } from "react";
import ChatContent from "@/components/chats/chat-content";
import ChatFooter from "@/components/chats/chat-footer";
import ChatHeader from "@/components/chats/chat-header";

const EmptyChat = () => {
  const [chats, setChats] = useState<any>([]);
  const [preview, setPreview] = useState<any>(false);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader setPreview={setPreview} />
      <ChatContent chats={chats} preview={preview} />
      <ChatFooter setChats={setChats} preview={preview} />
    </div>
  );
};

export default EmptyChat;
