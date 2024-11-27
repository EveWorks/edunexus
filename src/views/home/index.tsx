import Header from "@/components/header";
import Link from "next/link";
import Image from "next/image";
import Orb from "@/public/vc.svg";

const LandingPage = () => {
  return (
    <div className="">
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="grow flex items-center justify-center py-[3rem] relative">
          <Image
            className="w-full h-full max-w-[662px] max-h-[662px] object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[4rem]"
            src={Orb}
            alt="orb"
          />
          <div className="text-[18.75rem] leading-[15rem] text-center font-druk-heavy leading-[-.5rem] text-primary z-[2] tracking-[-8px] mix-blend-difference">
            ALINDA
          </div>
        </div>
        <div className="flex items-center justify-between w-full py-[3.0625rem] px-[3.25rem]">
          <div className="md:w-[33.33%]">
            <Link
              href={"/dashboard"}
              className="text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] text-primary underline"
            >
              Start wuth Alinda
            </Link>
          </div>
          <div className="md:w-[33.33%] text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] text-center">
            THE LEARNING <br />
            YOU DESERVE
          </div>
          <div className="md:w-[33.33%] flex items-center justify-end text-[1.5625rem] leading-[1.5625rem] tracking-[-1px]">
            <div>INSTAGRAM</div>
            <div>TWITTER</div>
            <div>LINKEDIN</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
