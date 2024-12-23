import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Controller } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { GoArrowDownLeft } from "react-icons/go";
import Hand from "@/public/hand.png";
import Man from "@/public/man.png";
import Square from "@/public/square.png";
import { Button } from "rizzui";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "swiper/css";
import "swiper/css/controller";
import FadeUpComponent from "../fadeInComponent";

const Product = () => {
  const [swiper1, setSwiper1] = useState(null) as any;
  const [swiper2, setSwiper2] = useState(null) as any;
  const swiper1Ref = useRef(null) as any;
  const swiper2Ref = useRef(null) as any;

  useEffect(() => {
    if (swiper1Ref.current && swiper2Ref.current) {
      setSwiper1(swiper1Ref.current.swiper);
      setSwiper2(swiper2Ref.current.swiper);

      // Crucial: Set the controller relationship AFTER both Swipers are initialized
      swiper1Ref.current.swiper.controller.control = swiper2Ref.current.swiper;
      swiper2Ref.current.swiper.controller.control = swiper1Ref.current.swiper;
    }
  }, []);

  const slidePrev = () => {
    swiper1?.slidePrev();
  };

  const slideNext = () => {
    swiper1?.slideNext();
  };

  const isBeginning = swiper1?.isBeginning ?? true;
  const isEnd = swiper1?.isEnd ?? false;

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
          <Swiper className="w-full" modules={[Controller]} ref={swiper1Ref}>
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
                src={Man}
                alt="img2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="w-full h-auto object-cover md:min-h-0 min-h-[36.9375rem]"
                src={Square}
                alt="img3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div
          className="w-full md:w-1/2 md:mt-0 mt-[30px]"
          data-scroll
          data-scroll-speed="1"
        >
          <Swiper modules={[Controller]} className="h-full" ref={swiper2Ref}>
            <SwiperSlide className="">
              <FadeUpComponent className="text-[20px] md:text-[2.5rem] leading-[20px] md:leading-[2.5rem] tracking-[-1px] text-center md:text-right font-medium flex flex-col justify-end h-full pb-[6.25rem]">
                Tailored virtual tutoring using AI, offering the personalised
                help students need.
              </FadeUpComponent>
            </SwiperSlide>
            <SwiperSlide className="">
              <FadeUpComponent className="text-[20px] md:text-[2.5rem] leading-[20px] md:leading-[2.5rem] tracking-[-1px] text-center md:text-right font-medium flex flex-col justify-end h-full pb-[6.25rem]">
                AI teaching assistants that help manage large classrooms
                efficiently.
              </FadeUpComponent>
            </SwiperSlide>
            <SwiperSlide className="">
              <FadeUpComponent className="text-[20px] md:text-[2.5rem] leading-[20px] md:leading-[2.5rem] tracking-[-1px] text-center md:text-right font-medium flex flex-col justify-end h-full pb-[6.25rem]">
                Ensures transparency, accountability, and academic integrity in
                an AI-driven learning environment.
              </FadeUpComponent>
            </SwiperSlide>
          </Swiper>
          <div className="mt-[-54px] flex items-center justify-center md:justify-end z-[2] relative">
            <Button
              className="w-[44px] md:w-[4rem] h-[44px] md:h-[4rem] border border-[#ffffff] text-[#ffffff] mr-[2.1875rem] disabled:border-[#525252] disabled:text-[#525252]"
              variant="text"
              onClick={slidePrev}
            >
              <BiChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              className="w-[44px] md:w-[4rem] h-[44px] md:h-[4rem] border border-[#ffffff] text-[#ffffff] disabled:border-[#525252] disabled:text-[#525252]"
              onClick={slideNext}
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
