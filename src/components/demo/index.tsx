import Image from "next/image";
import dashboard from "@/public/dashboard.png";
import { GoArrowDownLeft } from "react-icons/go";
import FadeUpComponent from "../fadeInComponent";

const Demo = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-[1.875rem] md:px-[3.125rem] py-[5rem] max-w-[1366px] m-auto"
      data-scroll-section
    >
      <div className="mb-[4.125rem] w-full">
        <span className="text-[15px] leading-[20px] md:text-[1.5625rem] md:leading-[1.875rem] tracking-[-1px] font-medium flex items-center justify-center text-center">
          <GoArrowDownLeft className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] mr-[10px] md:mr-[1.25rem]" />{" "}
          OUR DASHBOARD
        </span>
      </div>
      <div className="w-full h-full mb-[1.875rem] md:mb-[3.125rem]">
        <Image
          className="w-full h-[36.9375rem] md:h-full object-cover"
          src={dashboard}
          alt="img1"
        />
      </div>
      <FadeUpComponent className="text-[20px] leading-[20px] text-[2.5rem] leading-[2.5rem] tracking-[-1px] font-medium text-center">
        Alinda aims to make personalised academic support scalable, learning
        management seamless, and academic integrity non-negotiable.
      </FadeUpComponent>
    </div>
  );
};

export default Demo;
