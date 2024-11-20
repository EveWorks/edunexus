import Image from "next/image"
import Logo from "@/public/logo.svg"
import BgVector from "@/public/bg.png"
import BgVectorShadow from "@/public/vector.svg"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-between p-[1.25rem] md:p-[2.8531rem] auth-bg">
            <div>
                <Image src={Logo} alt="Alinda" className="w-[2.5rem] h-[2.5rem] mb-[3.125rem]" />
            </div>
            <div>
                {children}
            </div>
            <div></div>
            <div className="fixed md:left-0 md:bottom-0 md:h-[40dvh] md:w-full z-[1] opacity-[0.1] left-[-50%] bottom-[-30%] h-[60dvh] w-[200vw]">
                <Image src={BgVector} alt="vector" className="w-full h-auto rotate-center" priority />
            </div>
            <div className="fixed md:left-0 md:bottom-0 md:h-[40dvh] md:w-full z-[2] left-[-50%] bottom-[-30%] h-[60dvh] w-[200dvw]">
                <Image src={BgVectorShadow} alt="vector" className="w-full h-auto rotate-center-reverse" priority />
            </div>
        </div>
    )
}

export default AuthLayout

