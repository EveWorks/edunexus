"use client";
import Link from "next/link";
import FadeUpComponent from "../fadeInComponent";
import { routes } from "@/utils/routes";
import useDevice from "@/hooks/use-device";

const Footer = () => {
  const { isMobile } = useDevice();

  return (
    <footer
      data-scroll-section
      className="w-full h-[38.9375rem] md:h-[34.9375rem] bg-[#FFFFFF] text-[#0c0c0c] pb-[17px] px-[30px] py-[20px] md:p-[3.125rem]"
    >
      {isMobile ? (
        <div className="flex flex-wrap items-end justify-center md:justify-between h-full w-full text-[1.875rem] leading-[2.0269rem] tracking-[-1px]">
          <FadeUpComponent className="md:text-left text-center text-[30px] md:text-[inherit] leading-[45px] md:leading-[inherit] md:mt-0 mt-[134px] font-semibold">
            <p> &#169; ALINDA&#174; 2024</p>
            <p className="text-[1.25rem] leading-[1.3513rem]">
              Alinda@alinda.com
            </p>
          </FadeUpComponent>
          <FadeUpComponent
            delay={100}
            className="md:text-left text-center text-[20px] md:text-[1.875rem] leading-[30px] md:leading-[2.0269rem] flex items-end justify-between w-full mt-[5rem]"
          >
            <div className="w-1/2 text-left">
              <div>
                <Link
                  href={routes.gdpr}
                  className=" text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem] font-regular"
                >
                  GDPR
                </Link>
              </div>
              <div>
                <Link
                  href={routes.contact}
                  className=" text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem] font-regular"
                >
                  CONTACT US
                </Link>
              </div>
              <div>
                <Link
                  href={routes.terms}
                  className=" text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem] font-regular"
                >
                  TERMS OF USER
                </Link>
              </div>
              <div className="mb-[8px]">
                <Link
                  href={routes.privacy}
                  className=" text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem] font-regular"
                >
                  PRIVACY POLICY
                </Link>
              </div>
            </div>
            <div className="w-1/2 md:flex flex-col items-end justify-center font-regular text-right">
              <div className="md:mb-0 mb-[10px] text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem]">
                INSTAGRAM
              </div>
              <div className="md:mb-0 mb-[10px] text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem]">
                TWITTER
              </div>
              <div className="md:mb-0 mb-[10px] text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem] ">
                LINKEDIN
              </div>
            </div>
          </FadeUpComponent>
          <FadeUpComponent
            delay={200}
            className="md:text-left text-center text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] "
          >
            <div className="text-center text-[20px] md:text-[1.5625rem] leading-[25px] md:leading-[1.5625rem] md:font-medium">
              By Eduseekrs™, a Seekrs™ Group Company
            </div>
          </FadeUpComponent>
        </div>
      ) : (
        <div className="flex flex-wrap items-end justify-center md:justify-between h-full w-full text-[1.875rem] leading-[2.0269rem] tracking-[-1px]">
          <FadeUpComponent className="order-1 md:order-1 md:text-left text-center text-[30px] md:text-[inherit] leading-[45px] md:leading-[inherit] md:mt-0 mt-[134px] font-bold">
            <div>
              <Link
                href={routes.gdpr}
                className="text-[1.5625rem] leading-[1.5625rem] font-regular"
              >
                GDPR
              </Link>
            </div>
            <div>
              <Link
                href={routes.contact}
                className="text-[1.5625rem] leading-[1.5625rem] font-regular"
              >
                CONTACT US
              </Link>
            </div>
            <div>
              <Link
                href={routes.terms}
                className="text-[1.5625rem] leading-[1.5625rem] font-regular"
              >
                TERMS OF USER
              </Link>
            </div>
            <div className="mb-[1.3125rem]">
              <Link
                href={routes.privacy}
                className="text-[1.5625rem] leading-[1.5625rem] font-regular"
              >
                PRIVACY POLICY
              </Link>
            </div>
            &#169; ALINDA&#174; 2024
          </FadeUpComponent>
          <FadeUpComponent
            delay={100}
            className="order-3 md:order-2 md:text-left text-center text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] "
          >
            <div className="text-center mt-[1.25rem] text-[20px] md:text-[1.5625rem] leading-[25px] md:leading-[1.5625rem] font-medium">
              By Eduseekrs™, a Seekrs™ Group Company
            </div>
          </FadeUpComponent>
          <FadeUpComponent
            delay={200}
            className="order-2 md:order-3 md:text-left text-center text-[20px] md:text-[1.875rem] leading-[30px] md:leading-[2.0269rem] md:mb-0 mb-[66px] font-bold"
          >
            <div className="md:flex flex-col items-end justify-center font-regular mb-[1.3125rem]">
              <div className="md:mb-0 mb-[10px] text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem]">
                INSTAGRAM
              </div>
              <div className="md:mb-0 mb-[10px] text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem]">
                TWITTER
              </div>
              <div className="md:mb-0 mb-[10px] text-[15px] md:text-[1.5625rem] leading-[20px] md:leading-[1.5625rem] ">
                LINKEDIN
              </div>
            </div>
            Alinda@alinda.com
          </FadeUpComponent>
        </div>
      )}
    </footer>
  );
};

export default Footer;
