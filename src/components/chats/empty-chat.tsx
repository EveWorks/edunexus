import useDevice from "@/hooks/use-device";
import ChatHeader from "./chat-header";
import CreateChat from "./create-chat";

const EmptyChat = () => {
  const { isMobile } = useDevice();

  return (
    <div className="flex flex-col h-full md:px-8">
      {isMobile && <ChatHeader />}
      <CreateChat />
    </div>
  );
};

export default EmptyChat;
