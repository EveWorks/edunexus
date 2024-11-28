import Image from "next/image";
import Header from "@/components/header";
import Orb from "@/public/vc.svg";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="" data-scroll-section>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="grow flex items-center justify-center py-[3rem] relative md:min-h-0 min-h-[400px]">
          <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
            <Image
              className="w-auto h-full max-w-[662px] max-h-[662px] object-contain p-[4rem] rotate-center"
              src={Orb}
              alt="orb"
            />
          </div>
          <div className="text-[10rem] md:text-[18.75rem] leading-[15rem] md:leading-[15rem] text-center font-druk-heavy text-primary z-[2] tracking-[-8px] mix-blend-difference">
            ALINDA
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between w-full py-[3.0625rem] px-[3.25rem]">
          <div className="md:w-[33.33%] order-2 md:order-1 mb-[8.75rem] md:mb-0">
            <Link
              href={"/dashboard"}
              className="text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] text-primary underline font-borel"
            >
              Start wuth Alinda
            </Link>
          </div>
          <div className="md:w-[33.33%] text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] text-center order-1 md:order-2 mb-[1.25rem] md:mb-0">
            THE LEARNING <br />
            YOU DESERVE
          </div>
          <div className="md:w-[33.33%] md:flex items-center justify-end text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] order-3">
            <div className="md:mr-[1.0625rem] mb-[.625rem] text-center">INSTAGRAM</div>
            <div className="md:mr-[1.6875rem] mb-[.625rem] text-center">TWITTER</div>
            <div className="mb-[.625rem] text-center">LINKEDIN</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
