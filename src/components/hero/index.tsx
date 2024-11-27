import Image from "next/image";
import Header from "@/components/header";
import Orb from "@/public/vc.svg";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="" data-scroll-section>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="grow flex items-center justify-center py-[3rem] relative">
          <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
            <Image
              className="w-auto h-full max-w-[662px] max-h-[662px] object-contain p-[4rem] rotate-center"
              src={Orb}
              alt="orb"
            />
          </div>
          <div className="text-[18.75rem] leading-[15rem] text-center font-druk-heavy leading-[-.5rem] text-primary z-[2] tracking-[-8px] mix-blend-difference">
            ALINDA
          </div>
        </div>
        <div className="flex items-center justify-between w-full py-[3.0625rem] px-[3.25rem]">
          <div className="md:w-[33.33%]">
            <Link
              href={"/dashboard"}
              className="text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] text-primary underline font-borel"
            >
              Start wuth Alinda
            </Link>
          </div>
          <div className="md:w-[33.33%] text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] text-center">
            THE LEARNING <br />
            YOU DESERVE
          </div>
          <div className="md:w-[33.33%] flex items-center justify-end text-[1.5625rem] leading-[1.5625rem] tracking-[-1px]">
            <div className="md:mr-[1.0625rem]">INSTAGRAM</div>
            <div className="md:mr-[1.6875rem]">TWITTER</div>
            <div>LINKEDIN</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
