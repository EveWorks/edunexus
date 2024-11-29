import { useState } from "react";
import Image from "next/image";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { GoArrowDownLeft } from "react-icons/go";
import Hand from "@/public/hand.png";
import { Button } from "rizzui";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "swiper/css";
import "swiper/css/controller";
import FadeUpComponent from "../fadeInComponent";

const Product = () => {
  const [swiper1, setSwiper1] = useState(null) as any;
  const [swiper2, setSwiper2] = useState(null) as any;
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const slidePrev = () => {
    if (swiper1) swiper1.slidePrev();
    if (swiper2) swiper2.slidePrev();
  };

  const slideNext = () => {
    if (swiper1) swiper1.slideNext();
    if (swiper2) swiper2.slideNext();
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-[1.875rem] md:px-[3.125rem] py-[5rem] max-w-[1366px] m-auto"
      data-scroll-section
    >
      <div className="mb-[4.125rem] w-full">
        <span className="text-[15px] leading-[20px] md:text-[1.5625rem] md:leading-[1.875rem] tracking-[-1px] font-medium flex justify-end items-center">
          <GoArrowDownLeft className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] mr-[10px] md:mr-[1.25rem]" />{" "}
          PRODUCT
        </span>
      </div>
      <div className="w-full md:flex flex-wrap justify-between">
        <div
          className="w-full md:w-1/2 md:pr-8"
          data-scroll
          data-scroll-speed="-1"
        >
          <Swiper
            className="w-full"
            modules={[Controller]}
            onSwiper={(swiper) => {
              setSwiper1(swiper);
              updateNavigationState(swiper);
            }}
            onSlideChange={(swiper) => updateNavigationState(swiper)}
            controller={{ control: swiper2 }}
          >
            <SwiperSlide>
              <Image
                className="w-full h-auto object-cover md:min-h-0 min-h-[36.9375rem]"
                src={Hand}
                alt="img1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="w-full h-auto object-cover md:min-h-0 min-h-[36.9375rem]"
                src={Hand}
                alt="img1"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-full md:w-1/2 md:mt-0 mt-[30px]" data-scroll data-scroll-speed="1">
          <Swiper
            modules={[Controller]}
            onSwiper={(swiper) => {
              setSwiper2(swiper);
              updateNavigationState(swiper);
            }}
            onSlideChange={(swiper) => updateNavigationState(swiper)}
            controller={{ control: swiper1 }}
            className="h-full"
          >
            <SwiperSlide className="">
              <FadeUpComponent className="text-[20px] md:text-[2.5rem] leading-[20px] md:leading-[2.5rem] tracking-[-1px] text-center md:text-right font-medium flex flex-col justify-end h-full pb-[6.25rem]">
                Tailored virtual tutoring using AI, offering the personalised
                help students need.
              </FadeUpComponent>
            </SwiperSlide>
            <SwiperSlide className="">
              <FadeUpComponent className="text-[20px] md:text-[2.5rem] leading-[20px] md:leading-[2.5rem] tracking-[-1px] text-center md:text-right font-medium flex flex-col justify-end h-full pb-[6.25rem]">
                Tailored virtual tutoring using AI, offering the personalised
                help students need. 2
              </FadeUpComponent>
            </SwiperSlide>
          </Swiper>
          <div className="mt-[-54px] flex items-center justify-center md:justify-end z-[2] relative">
            <Button
              className="w-[44px] md:w-[4rem] h-[44px] md:h-[4rem] border border-[#ffffff] text-[#ffffff] mr-[2.1875rem] disabled:border-[#525252] disabled:text-[#525252]"
              variant="text"
              onClick={slidePrev}
              disabled={isBeginning}
            >
              <BiChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              className="w-[44px] md:w-[4rem] h-[44px] md:h-[4rem] border border-[#ffffff] text-[#ffffff] disabled:border-[#525252] disabled:text-[#525252]"
              onClick={slideNext}
              variant="text"
              disabled={isEnd}
            >
              <BiChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
