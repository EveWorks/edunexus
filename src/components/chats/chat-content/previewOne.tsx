import Image from "next/image";
import BgVector2 from "@/public/vc.svg";
import BgVectorShadow from "@/public/vector.svg";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import MarkdownRenderer from "@/components/markdown";
import dynamic from "next/dynamic";
// Lazy load the VisualizerComponent with no SSR
const VisualizerComponent = dynamic(() => import('@/components/orb'), {
  ssr: false, // Disable server-side rendering for this component
});

const PreviewOne = ({ page, setPage }: { page: number; setPage: any }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
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
      <div className="h-full max-h-[calc(100dvh-176px)] md:max-h-[calc(100dvh-235px)]">
        <div className="h-[50%] flex items-center justify-center" ref={orbRef}>
          <Suspense fallback={<div>Alinda is waking up...</div>}>
            <VisualizerComponent
              width={150}
              height={150}
              wrapperHeight={
                orbRef?.current?.clientHeight
                  ? orbRef?.current?.clientHeight
                  : null
              }
              wrapperWidth={
                orbRef?.current?.clientWidth ? orbRef?.current?.clientWidth : null
              }
            />
          </Suspense>
        </div>
        <div className="h-[50%] ps-[2.6875rem] pr-[1.25rem] pb-[2.6875rem] relative fadeBox">
          <ul
            ref={chatWrapperRef}
            className="h-full overflow-y-auto no-scrollbar chat-list"
          >
            {messages?.map((item: any, index: number) => {
              return (
                <Message
                  content={item?.content || item?.message}
                  key={item?.id || index}
                />
              );
            })}
            <div ref={chatEndRef}></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Message = ({ content }: { content: string }) => {
  return (
    <li className="flex justify-center mb-[2rem]">
      <div className="mb-[1.25rem] text-[1.2625rem] leading-[1.4375rem] text-center">
        <MarkdownRenderer markdown={content} />
      </div>
    </li>
  );
};

export default PreviewOne;
