import Link from "next/link";
import FadeUpComponent from "../fadeInComponent";

const Footer = () => {
  return (
    <footer
      data-scroll-section
      className="w-full h-[34.9375rem] bg-[#FFFFFF] text-[#0c0c0c] pb-[17px] p-[3.125rem] md:p-[3.125rem]"
    >
      <div className="flex flex-wrap items-end justify-center md:justify-between h-full w-full text-[1.875rem] leading-[2.8125rem] tracking-[-1px]">
        <FadeUpComponent className="order-1 md:order-1 md:text-left text-center text-[30px] md:text-[inherit] leading-[45px] md:leading-[inherit] md:mt-0 mt-[134px]">
          &#169; ALINDA&#174; 2024
        </FadeUpComponent>
        <FadeUpComponent
          delay={100}
          className="order-3 md:order-2 md:text-left text-center text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] "
        >
          <div className="md:flex items-center justify-center">
            <div className="md:mb-0 mb-[10px] text-[15px] md:text-[inherit] leading-[20px] md:leading-[inherit] md:mr-[1.0625rem]">
              INSTAGRAM
            </div>
            <div className="md:mb-0 mb-[10px] text-[15px] md:text-[inherit] leading-[20px] md:leading-[inherit] md:mr-[1.6875rem]">
              TWITTER
            </div>
            <div className="md:mb-0 mb-[10px] text-[15px] md:text-[inherit] leading-[20px] md:leading-[inherit] ">
              LINKEDIN
            </div>
          </div>
          <div className="text-center mt-[1.25rem] text-[20px] md:text-[inherit] leading-[25px] md:leading-[inherit]">
            Designed by EveWorks
          </div>
        </FadeUpComponent>
        <FadeUpComponent
          delay={200}
          className="order-2 md:order-3 md:text-left text-center text-[20px] md:text-[inherit] leading-[30px] md:leading-[inherit] md:mb-0 mb-[66px]"
        >
          Alinda@alinda.com
        </FadeUpComponent>
      </div>
    </footer>
  );
};

export default Footer;
