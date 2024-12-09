import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "@/axios";
import useUser from "./use-user";

interface Message {
  id: string;
  text: string;
}

interface MessagesResponse {
  messages: Message[];
}

interface UseChatMessagesProps {
  id?: string;
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
  const [topicId, setTopicId] = useState<string>("");
  const {user} = useUser();

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
          setTopicId(response.data.data[0]?.conversationid?.topicid);
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

  const sendMessage = async (data: any) => {
    setMsgLoading(true);
    const payload = {
      message: data.message,
      message_type: data.message_type,
      topicid: data?.topicid || topicId,
      userid: data.userid,
      conversationid: data.conversationid,
    };

    const userPayload = {
      ...payload,
      userid: {
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
      },
    };

    messages.push(userPayload);
    setMessages(messages);
    try {
      const response: any = await axios.post(
        "/conversation/sendmessage",
        payload
      );
      if (response?.AiResponse) {
        if (data?.callback) {
          await data.callback(response?.AiResponse.message);
        }
        messages.push(response?.AiResponse);
        setMessages(messages);
      }
      return response;
    } catch (error: any) {
      console.log(error);
      setError(error || "Failed to send message");
    } finally {
      setMsgLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(page);
  }, [fetchMessages, page]);

  const loadMore = useCallback(() => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  }, []);

  // useEffect(() => {
  //   return () => {
  //     setTopicId("");
  //   };
  // }, []);

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
    topicId,
  };
};

export default useChatMessages;
