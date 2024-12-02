import { BsSoundwave } from "react-icons/bs";
import { LuRefreshCcw } from "react-icons/lu";
import { Button } from "rizzui";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import CreateChat from "../create-chat";

const PreviewTwo = ({ chats }: { chats: any }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];

  useEffect(() => {
    if (chatEndRef?.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <div className="grow">
      {id ? (
        <div className="h-full overflow-auto ps-[2.6875rem] pr-[1.25rem] pb-[2.6875rem]">
          <ul className="h-[calc(100dvh-300px)] overflow-y-auto custom-scrollbar">
            {chats?.map((item: any) => {
              return (
                <li className="flex mt-[4.375rem]" key={item?.message}>
                  {/* {item?.alinda ? ( */}
                  <div className="w-[3.125rem] mr-[1.25rem] flex flex-col items-center">
                    <div
                      className="text-primary font-bold flex items-center justify-center w-[3.125rem] h-[3.125rem] rounded-[0.625rem] border border-[#525252] mb-[0.625rem]"
                      style={{ boxShadow: "0px 0px 2px 0px #FFFFFF" }}
                    >
                      <BsSoundwave className="w-[1.875rem] h-[1.875rem]" />
                    </div>
                    <Button
                      variant="text"
                      className="p-0 font-bold flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[0.625rem] border border-[#525252]"
                      style={{ boxShadow: "0px 0px 2px 0px #525252" }}
                    >
                      <LuRefreshCcw className="text-[#525252] w-[1.25rem] h-[1.25rem]" />
                    </Button>
                  </div>
                  {/* ) : (
                                        <div className="w-[3.125rem] mr-[1.25rem] flex flex-col items-center">
                                            <div className="text-primary text-[1.25rem] font-bold flex items-center justify-center w-[3.125rem] h-[3.125rem] rounded-[0.625rem] border border-[#525252]" style={{ boxShadow: '0px 0px 2px 0px #FFFFFF' }}>
                                                ST
                                            </div>
                                        </div>
                                    )} */}
                  <div className="w-[calc(100%-4.375rem)] mt-[1.25rem] text-[1.5625rem] leading-[1.4375rem]">
                    {item?.message}
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
