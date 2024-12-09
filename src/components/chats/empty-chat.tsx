import { useState } from "react";
import ChatHeader from "@/components/chats/chat-header";
import ConversationTitle from "./conversation-title";
import CreateChat from "./create-chat";

const EmptyChat = () => {
  const [topicId, setTopicId] = useState<any>(false);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <CreateChat topicId={topicId} setTopicId={setTopicId} />
      <ConversationTitle topicId={topicId} />
    </div>
  );
};

export default EmptyChat;
