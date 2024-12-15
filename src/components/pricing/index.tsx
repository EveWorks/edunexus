import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { GoArrowDownLeft } from "react-icons/go";
import { Button } from "rizzui";

const Pricing = () => {
  return (
    <div
      className="flex flex-col justify-center items-center px-[1.875rem] md:px-[3.125rem] py-[8rem] max-w-[85.375rem] m-auto"
      data-scroll-section
    >
      <div className="mb-[4.125rem] w-full">
        <span className="text-[15px] leading-[20px] md:text-[1.5625rem] md:leading-[1.875rem] tracking-[-1px] font-medium flex items-center justify-center">
          <GoArrowDownLeft className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] mr-[10px] md:mr-[1.25rem]" />{" "}
          PRICING
        </span>
      </div>
      <div className="w-full flex flex-wrap items-center">
        <div className="w-full md:w-1/2 md:mb-0 mb-[3.125rem] md:pr-[3.125rem]">
          <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border w-full text-center">
            <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
              #Free Plan
            </span>
            <h2 className="text-[30px] leading-[70px] md:text-[3.125rem] md:leading-[4.375rem] text-center font-medium mt-[3.125rem]">
              Free Plan - £0
            </h2>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              1 Week Trial
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Limited usage{" "}
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Hyper-personalised experience
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
              Full Access
            </p>
            <Button
              className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out border border-primary"
              color="primary"
              variant="text"
              type="submit"
            >
              Choose this Package
              <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:mb-0 mb-[3.125rem] md:ps-[50px]">
          <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border w-full text-center">
            <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
              #Paid Plan
            </span>
            <h2 className="text-[30px] leading-[70px] md:text-[3.125rem] md:leading-[4.375rem] text-center font-medium mt-[3.125rem]">
              Pro Plan - £9.99
            </h2>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Monthly access
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Unlimited usage
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Hyper-personalised experience
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
              No limits
            </p>
            <Button
              className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out"
              color="primary"
              variant="solid"
              type="submit"
            >
              Choose this Package
              <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
