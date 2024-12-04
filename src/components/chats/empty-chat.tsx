import { useState } from "react";
import ChatContent from "@/components/chats/chat-content";
import ChatFooter from "@/components/chats/chat-footer";
import ChatHeader from "@/components/chats/chat-header";
import useChatMessages from "@/hooks/use-chat-messages";

const EmptyChat = () => {
  const [chats, setChats] = useState<any>([]);
  const [preview, setPreview] = useState<any>(false);
  const { sendMessage } = useChatMessages({});

  return (
    <div className="flex flex-col h-full">
      <ChatHeader setPreview={setPreview} />
      <ChatContent chats={chats} preview={preview} />
      <ChatFooter preview={preview} />
    </div>
  );
};

export default EmptyChat;
