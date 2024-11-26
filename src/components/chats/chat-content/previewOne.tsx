import Image from "next/image"
import BgVector from "@/public/bg.png"
import BgVector2 from "@/public/vc.svg"
import BgVectorShadow from "@/public/vector.svg"
import { BsSoundwave } from "react-icons/bs"
import { LuRefreshCcw } from "react-icons/lu"
import { Button } from "rizzui"
import { useEffect, useRef } from "react"

const PreviewOne = ({ chats }: { chats: any }) => {

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef?.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [chats]);

    return (
        <div className="grow">
            {chats?.length > 0 ? (
                <div className="h-full" >
                    <div className="h-[calc(100%-244px)] flex items-center justify-center" >
                        <div className={`relative transition-all duration-400 scale-[1] h-[200px] md:h-[315px] w-[200px] md:w-[315px]`}>
                            <Image src={BgVector2} alt="vector" className="w-full h-auto absolute bottom-0 right-0 z-[2] mix-blend-overlay rotate-audio" priority />
                            <Image src={BgVectorShadow} alt="vector" className="w-full h-auto absolute bottom-0 right-0 z-[1] rotate-audio-reverse" priority />
                        </div>
                    </div>
                    <div className="ps-[2.6875rem] pr-[1.25rem] pb-[2.6875rem] relative fadeBox">
                        <ul className="h-[244px] overflow-y-auto no-scrollbar mb-[0.75rem]">
                            {chats?.map((item: any) => {
                                return (
                                    <li className="flex justify-center mb-[2rem]" key={item.id}>
                                        <div className="mb-[1.25rem] text-[1.5625rem] leading-[1.4375rem] text-center">{item?.data}</div>
                                    </li>
                                )
                            })}
                            <div ref={chatEndRef}></div>
                        </ul>
                    </div>
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

export default PreviewOne