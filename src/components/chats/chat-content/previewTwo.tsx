import { BsSoundwave } from "react-icons/bs";
import { LuRefreshCcw } from "react-icons/lu";
import { Button } from "rizzui";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import CreateChat from "../create-chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAppSelector } from "@/store/hooks";

const PreviewTwo = ({ page, setPage }: { page: number; setPage: any }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatWrapperRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];
  const { messages } = useAppSelector((state: any) => state.Chat);
  const [scrollFromBottom, setScrollFromBottom] = useState(0);

  const calculateScrollFromBottom = () => {
    const chatWrapper = chatWrapperRef.current;
    if (chatWrapper) {
      const scrollValue =
        chatWrapper.scrollHeight -
        (chatWrapper.scrollTop + chatWrapper.offsetHeight);
      setScrollFromBottom(scrollValue);
    }
  };

  useEffect(() => {
    const chatWrapper = chatWrapperRef.current;
    if (page === 1 && messages?.length > 0 && chatEndRef?.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (chatWrapper && scrollFromBottom > 0) {
      chatWrapper.scrollTop =
        chatWrapper.scrollHeight - scrollFromBottom - chatWrapper.offsetHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const chatWrapper = chatWrapperRef.current;
      if (chatWrapper) {
        if (chatWrapper.scrollTop === 0) {
          setPage((prevPage: number) => prevPage + 1);
          calculateScrollFromBottom();
        }
      }
    };

    const chatWrapper = chatWrapperRef.current;
    if (chatWrapper) {
      chatWrapper.addEventListener("scroll", handleScroll);
    }

    // Cleanup listener on component unmount
    return () => {
      if (chatWrapper) {
        chatWrapper.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="grow">
      {id ? (
        <div className="h-full overflow-auto ps-[2.6875rem] pr-[1.25rem] pb-[2.6875rem]">
          <ul
            ref={chatWrapperRef}
            className="h-[calc(100dvh-300px)] overflow-y-auto custom-scrollbar"
          >
            {messages?.map((item: any) => {
              return (
                <li className="flex mt-[4.375rem]" key={item?.message}>
                  {item?.role === "assistant" ? (
                    <div className="w-[3.125rem] mr-[1.25rem] flex flex-col items-center">
                      <div
                        className="text-primary font-bold flex items-center justify-center w-[3.125rem] h-[3.125rem] rounded-[0.625rem] border border-[#525252] mb-[0.625rem]"
                        style={{ boxShadow: "0px 0px 2px 0px #FFFFFF" }}
                      >
                        <BsSoundwave className="w-[1.875rem] h-[1.875rem]" />
                      </div>
                      {/* <Button
                        variant="text"
                        className="p-0 font-bold flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[0.625rem] border border-[#525252]"
                        style={{ boxShadow: "0px 0px 2px 0px #525252" }}
                      >
                        <LuRefreshCcw className="text-[#525252] w-[1.25rem] h-[1.25rem]" />
                      </Button> */}
                    </div>
                  ) : (
                    <div className="w-[3.125rem] mr-[1.25rem] flex flex-col items-center">
                      <div
                        className="text-primary text-[1.25rem] font-bold flex items-center justify-center w-[3.125rem] h-[3.125rem] rounded-[0.625rem] border border-[#525252]"
                        style={{ boxShadow: "0px 0px 2px 0px #FFFFFF" }}
                      >
                        {item?.userid?.firstname?.substring(0, 1)}
                        {item?.userid?.lastname?.substring(0, 1)}
                      </div>
                    </div>
                  )}
                  <div className="w-[calc(100%-4.375rem)] mt-[0.75rem] text-[1.5625rem] leading-[1.4375rem]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item?.message}
                    </ReactMarkdown>
                  </div>
                </li>
              );
            })}
            <div ref={chatEndRef}></div>
          </ul>
        </div>
      ) : (
        <CreateChat />
      )}
    </div>
  );
};

export default PreviewTwo;
