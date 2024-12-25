import Image from "next/image";
import { Button } from "rizzui";
import BgVector from "@/public/bg.png";
import BgVectorShadow from "@/public/vector.svg";
import {
  createConversation,
  getConversationList,
  getTopicList,
} from "@/store/features/chat";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import ConversationTitle from "./conversation-title";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import useMixpanel from "@/hooks/use-mixpanel";

const CreateChat = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { topicList } = useAppSelector((state) => state.Chat);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const mixpanel = useMixpanel();

  useEffect(() => {
    mixpanel.track("page_viewed", {
      email: user.email,
      page: "dashboard",
      url: window.location.href,
    });
    dispatch(getTopicList({ limit, page }));
  }, []);

  const callbackMessage = (id: string) => {
    dispatch(getConversationList({ userId: user.id }));
    router.replace(`/chat/${id}`);
  };

  const createNewConversation = async (id: string) => {
    if (!loading) {
      setLoading(true);
      const payload: any = {
        conversation_title: "Untitled",
        topicid: id,
        userid: user.id,
        callback: callbackMessage,
      };

      dispatch(createConversation(payload));
    }
  };

  return (
    <div className="grow px-4 md:mt-0 mt-4">
      <div className="flex flex-col items-center justify-center h-full">
        <div
          className={`relative transition-all duration-400 scale-[1] h-[6rem] w-[6rem] mb-[1.5rem]`}
        >
          <Image
            src={BgVector}
            alt="vector"
            className="w-full h-auto absolute bottom-0 right-0 z-[2] opacity-[0.2] rotate-audio"
            priority
          />
          <Image
            src={BgVectorShadow}
            alt="vector"
            className="w-full h-auto absolute bottom-0 right-0 z-[1] rotate-audio-reverse scale-custom"
            priority
          />
        </div>
        <div className="text-[1.875rem] leading-[0.9375rem] font-medium mb-[0.625rem]">
          Choose one of the following
        </div>
        <div className="text-[1.25rem] leading-[0.9375rem] md:w-[30.125rem] mb-[1.875rem] text-center text-[#525252]">
          Topic Titles:
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {topicList?.length > 0 &&
            topicList?.map((item: any) => {
              return (
                <Button
                  key={item.id}
                  onClick={() => createNewConversation(item.id)}
                  variant="text"
                  className={`h-fit text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] p-[0.5rem] mr-[1.25rem] mb-2 `}
                >
                  {item.topic_name}
                </Button>
              );
            })}
        </div>
        {/* <ConversationTitle topicId={topicId} /> */}
      </div>
    </div>
  );
};

export default CreateChat;
