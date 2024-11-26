import Image from "next/image"
import BgVector from "@/public/bg.png"
import BgVectorShadow from "@/public/vector.svg"
import { BsSoundwave } from "react-icons/bs"
import { LuRefreshCcw } from "react-icons/lu"
import { Button } from "rizzui"
import { useEffect, useRef } from "react"

const PreviewTwo = ({ chats }: { chats: any }) => {

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef?.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [chats]);

    return (
        <div className="grow">
            {chats?.length > 0 ? (
                <div className="h-full overflow-auto ps-[2.6875rem] pr-[1.25rem] pb-[2.6875rem]">
                    <ul className="h-[calc(100dvh-300px)] overflow-y-auto custom-scrollbar">
                        {chats?.map((item: any) => {
                            return (
                                <li className="flex mt-[4.375rem]" key={item.id}>
                                    {item?.alinda ? (
                                        <div className="w-[3.125rem] mr-[1.25rem] flex flex-col items-center">
                                            <div className="text-primary font-bold flex items-center justify-center w-[3.125rem] h-[3.125rem] rounded-[0.625rem] border border-[#525252] mb-[0.625rem]" style={{ boxShadow: '0px 0px 2px 0px #FFFFFF' }}>
                                                <BsSoundwave className="w-[1.875rem] h-[1.875rem]" />
                                            </div>
                                            <Button variant="text" className="p-0 font-bold flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[0.625rem] border border-[#525252]" style={{ boxShadow: '0px 0px 2px 0px #525252' }} >
                                                <LuRefreshCcw className="text-[#525252] w-[1.25rem] h-[1.25rem]" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="w-[3.125rem] mr-[1.25rem] flex flex-col items-center">
                                            <div className="text-primary text-[1.25rem] font-bold flex items-center justify-center w-[3.125rem] h-[3.125rem] rounded-[0.625rem] border border-[#525252]" style={{ boxShadow: '0px 0px 2px 0px #FFFFFF' }}>
                                                ST
                                            </div>
                                        </div>
                                    )}
                                    <div className="w-[calc(100%-4.375rem)] mt-[1.25rem] text-[1.5625rem] leading-[1.4375rem]">{item?.data}</div>
                                </li>
                            )
                        })}
                        <div ref={chatEndRef}></div>
                    </ul>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className={`relative transition-all duration-400 scale-[1] h-[6rem] w-[6rem] mb-[1.5rem]`}>
                        <Image src={BgVector} alt="vector" className="w-full h-auto absolute bottom-0 right-0 z-[2] opacity-[0.2] rotate-audio" priority />
                        <Image src={BgVectorShadow} alt="vector" className="w-full h-auto absolute bottom-0 right-0 z-[1] rotate-audio-reverse scale-custom" priority />
                    </div>
                    <div className="text-[1.875rem] leading-[0.9375rem] font-medium mb-[0.625rem]">Choose one of the following</div>
                    <div className="text-[1.25rem] leading-[0.9375rem] w-[30.125rem] mb-[1.875rem] text-center text-[#525252]" >Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</div>
                    <div className="flex items-center justify-center">
                        <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] p-[0.5rem] mr-[1.25rem]">Mathematics</span>
                        <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] p-[0.5rem]">Computer Science</span>
                    </div>
                </div>
            )}
        </div >
    )
}

export default PreviewTwo