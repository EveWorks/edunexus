import { useState } from "react";
import Image from "next/image";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { GoArrowDownLeft } from "react-icons/go";
import Hand from "@/public/hand.png";
import "swiper/css";
import { Button } from "rizzui";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Product = () => {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const swiper = useSwiper();

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-[3.125rem] py-[5rem]"
      data-scroll-section
    >
      <div className="mb-[4.125rem] w-full">
        <span className="text-[1.5625rem] leading-[1.875rem] tracking-[-1px] font-medium flex justify-end items-center">
          <GoArrowDownLeft className="w-[2.5rem] h-[2.5rem] mr-[1.25rem]" />{" "}
          PRODUCT
        </span>
      </div>
      <div className="flex flex-wrap justify-between slider-container">
        <div className="md:w-1/2">
          <Swiper
            modules={[Controller]}
            controller={{ control: controlledSwiper }}
          >
            <SwiperSlide>
              <Image className="w-full h-auto" src={Hand} alt="img1" />
            </SwiperSlide>
            <SwiperSlide>
              <Image className="w-full h-auto" src={Hand} alt="img1" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="md:w-1/2">
          <Swiper
            modules={[Controller]}
            controller={{ control: controlledSwiper }}
            className="h-full"
          >
            <SwiperSlide className="">
              <div className="text-[2.5rem] leading-[2.5rem] tracking-[-1px] text-right font-medium flex flex-col justify-end h-full pb-[6.25rem]">
                Tailored virtual tutoring using AI, offering the personalised
                help students need.
              </div>
            </SwiperSlide>
            <SwiperSlide className="">
              <div className="text-[2.5rem] leading-[2.5rem] tracking-[-1px] text-right font-medium flex flex-col justify-end h-full pb-[6.25rem]">
                Tailored virtual tutoring using AI, offering the personalised
                help students need. 2
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="mt-[-64px] flex items-center justify-end z-[2] relative">
            <Button
              className="w-[4rem] h-[4rem] border border-[#ffffff] text-[#ffffff] mr-[2.1875rem]"
              variant="text"
              onClick={() => swiper.slidePrev()}
            >
              <BiChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              className="w-[4rem] h-[4rem] border border-[#ffffff] text-[#ffffff]"
              onClick={() => swiper.slideNext()}
              variant="text"
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
