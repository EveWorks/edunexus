import Image from "next/image";
import BgVector2 from "@/public/vc.svg";
import BgVectorShadow from "@/public/vector.svg";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import CreateChat from "../create-chat";

const PreviewOne = ({ chats }: { chats: any }) => {
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef?.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  console.log("chats", chats);

  return (
    <div className="grow">
      {id ? (
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
            <ul className="h-[244px] overflow-y-auto no-scrollbar mb-[0.75rem]">
              {chats?.map((item: any, index: number) => {
                return (
                  <li className="flex justify-center mb-[2rem]" key={index}>
                    <div className="mb-[1.25rem] text-[1.5625rem] leading-[1.4375rem] text-center">
                      {item?.message}
                    </div>
                  </li>
                );
              })}
              <div ref={chatEndRef}></div>
            </ul>
          </div>
        </div>
      ) : (
        <CreateChat />
      )}
    </div>
  );
};

export default PreviewOne;
