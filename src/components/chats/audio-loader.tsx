import Image from "next/image"
import BgVector from "@/public/vc.svg"
import BgVectorShadow from "@/public/vector.svg"

const AudioLoader = ({ show, size }: { show: boolean, size: string }) => {
    return (
        <div className={`relative transition-all duration-400 ${show ? 'scale-[1] ms-[1rem] md:h-[6rem] md:w-[6rem]' : 'scale-[0] md:h-[0] md:w-[0]'}`}>
            <Image src={BgVector} alt="vector" className="w-full h-auto absolute bottom-0 right-0 z-[2] mix-blend-overlay rotate-audio" priority />
            <Image src={BgVectorShadow} alt="vector" className="w-full h-auto absolute bottom-0 right-0 z-[1] rotate-audio-reverse" priority />
        </div>
    )
}

export default AudioLoader