import PreviewTwo from "./chat-content/previewTwo";
import PreviewOne from "./chat-content/previewOne";
import { fetchMessages } from "@/store/features/chat";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const ChatContent = ({ preview }: { preview: string }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchMessages({
        id,
        limit,
        page,
      })
    );
  }, [page]);

  if (preview === "2") {
    return <PreviewTwo page={page} setPage={setPage} />;
  }

  return <PreviewOne />;
};

export default ChatContent;
