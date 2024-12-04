import PreviewTwo from "./chat-content/previewTwo";
import PreviewOne from "./chat-content/previewOne";

const ChatContent = ({ chats, preview }: { chats: any; preview: boolean }) => {
  if (preview) {
    return <PreviewTwo chats={chats} />;
  }

  return <PreviewOne chats={chats} />;
};

export default ChatContent;
