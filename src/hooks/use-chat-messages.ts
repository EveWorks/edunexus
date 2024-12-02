import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "@/axios";

interface Message {
  id: string;
  text: string;
}

interface MessagesResponse {
  messages: Message[];
}

interface UseChatMessagesProps {
  id: string;
  initialPage?: number;
  limit?: number;
}

const useChatMessages = ({
  id,
  initialPage = 1,
  limit = 10,
}: UseChatMessagesProps) => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [msgLoading, setMsgLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchMessages = useCallback(
    async (currentPage: number) => {
      if (!hasMore) return;
      setLoading(true);
      try {
        const response = await axios.get<any>(`/conversation/get_allmessage`, {
          params: {
            conversation_id: id,
            limit,
            page: currentPage,
          },
        });

        if (response.data.data?.length > 0) {
          setMessages((prev: any) => [...prev, ...response.data.data]);
          setTotalItems(response.data.pagination.totalItems);
        }
        // if (data.messages.length < limit) {
        //   setHasMore(false);
        // }
      } catch (err: any) {
        setError(err.message || "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    },
    [id, limit]
  );

  const sendMessage = async (payload: any) => {
    setMsgLoading(true);
    try {
      const response: any = await axios.post(
        "/conversation/sendmessage",
        payload
      );
      if (response?.AiResponse) {
        setMessages((prev: any) => [...prev, response?.AiResponse]);
        return response?.AiResponse.message;
      }
    } catch (error: any) {
      console.log(error);
      setError(error || "Failed to send message");
    }
    setMsgLoading(false);
  };

  useEffect(() => {
    fetchMessages(page);
  }, [fetchMessages, page]);

  const loadMore = useCallback(() => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  }, []);

  const memoizedMessages = useMemo(() => messages, [messages]);

  return {
    messages: memoizedMessages,
    setMessages,
    loading,
    msgLoading,
    error,
    hasMore,
    loadMore,
    totalItems,
    sendMessage,
  };
};

export default useChatMessages;
