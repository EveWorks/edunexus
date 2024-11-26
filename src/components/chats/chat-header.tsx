import Image from "next/image"
import { Button } from "rizzui"
import Icon from "@/public/layout-icon.svg"
import { TbEdit } from "react-icons/tb"

const ChatHeader = ({ setPreview }: { setPreview: any }) => {
    return (
        <div className="bg-[#0C0C0C50] border-b border-[#525252] py-[1.875rem] ps-[1.875rem] pr-[1.25rem] flex items-center">
            <div className="w-[33.33%]">
                <Button className="w-[2.5rem] h-[2.5rem] rounded-[0.625rem] border border-primary p-0" variant="text" color="primary" onClick={() => setPreview((prev: boolean) => !prev)}>
                    <Image src={Icon} alt="layout" className="w-[1rem] h-[1rem]" />
                </Button>
            </div>
            <div className="w-[33.33%] text-center text-[1.875rem] leading-[2.0269rem] flex items-center justify-center">Conversation 8 <TbEdit className="ml-[1.25rem] w-[1.125rem] h-[1.125rem] text-[#525252]" /></div>
            <div className="w-[33.33%] text-center flex items-center justify-end">
                <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#525252] border border-primary bg-primary rounded-[0.625rem] p-[0.5rem] mr-[1.25rem]">Mathematics</span>
                <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] p-[0.5rem]">Computer Science</span>
            </div>
        </div>
    )
}

export default ChatHeader