import Image from "next/image";
import BgVector2 from "@/public/vc.svg";
import BgVectorShadow from "@/public/vector.svg";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CreateChat from "../create-chat";
import { useAppSelector } from "@/store/hooks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PreviewOne = ({ page, setPage }: { page: number; setPage: any }) => {
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

    return () => {
      if (chatWrapper) {
        chatWrapper.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="grow">
      <div className="h-full">
        <div className="h-[calc(100%-244px)] flex items-center justify-center">
          <div
            className={`relative transition-all duration-400 scale-[1] h-[200px] md:h-[315px] w-[200px] md:w-[315px]`}
          >
            <Image
              src={BgVector2}
              alt="vector"
              className="w-full h-auto absolute bottom-0 right-0 z-[2] mix-blend-overlay rotate-audio"
              priority
            />
            <Image
              src={BgVectorShadow}
              alt="vector"
              className="w-full h-auto absolute bottom-0 right-0 z-[1] rotate-audio-reverse"
              priority
            />
          </div>
        </div>
        <div className="ps-[2.6875rem] pr-[1.25rem] pb-[2.6875rem] relative fadeBox">
          <ul
            ref={chatWrapperRef}
            className="h-[244px] overflow-y-auto no-scrollbar mb-[0.75rem]"
          >
            {messages?.map((item: any, index: number) => {
              return (
                <li className="flex justify-center mb-[2rem]" key={index}>
                  <div className="mb-[1.25rem] text-[1.5625rem] leading-[1.4375rem] text-center">
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
      </div>
    </div>
  );
};

export default PreviewOne;
