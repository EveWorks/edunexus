import PreviewTwo from "./chat-content/previewTwo";
import PreviewOne from "./chat-content/previewOne";
import {
  fetchMessages,
  getConversationDetail,
  resetChatDetail,
} from "@/store/features/chat";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "@/axios";
import useUser from "@/hooks/use-user";

const ChatContent = ({ preview }: { preview: string }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { user } = useUser();
  const id = pathname.split("/")?.[2];
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const updatePersonalization = async () => {
    const payload = {
      conversationId: id,
      userId: user.id,
    };
    await axios.post("/conversation/update-personalization", payload);
  };

  useEffect(() => {
    dispatch(
      fetchMessages({
        id,
        limit,
        page,
      })
    );
  }, [page]);

  useEffect(() => {
    return () => {
      updatePersonalization();
      dispatch(resetChatDetail({}));
    };
  }, []);

  if (preview === "2") {
    return <PreviewTwo page={page} setPage={setPage} />;
  }

  return <PreviewOne page={page} setPage={setPage} />;
};

export default ChatContent;
