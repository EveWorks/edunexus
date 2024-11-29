import Image from "next/image";
import StatementOne from "@/public/statement1.png";
import StatementTwo from "@/public/statement2.png";
import StatementThree from "@/public/statement3.png";
import { GoArrowDownLeft } from "react-icons/go";
import FadeUpComponent from "../fadeInComponent";

const Statement = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-[1.875rem] md:px-[3.125rem] py-[5rem]"
      data-scroll-section
    >
      <div className="mb-[3.125rem] md:mb-[4.125rem] w-full">
        <span className="text-[15px] leading-[20px] md:text-[1.5625rem] md:leading-[1.875rem] tracking-[-1px] font-medium flex items-center">
          <GoArrowDownLeft className="w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] mr-[10px] md:mr-[1.25rem]" />{" "}
          PROBLEM STATEMENT
        </span>
      </div>
      <div className="h-full flex flex-wrap justify-between gap-[1.5rem]">
        <div className="md:w-[calc(33.33%-1.5rem)] md:self-start md:mb-[11.875rem]" data-scroll data-scroll-speed="1">
          <Image
            className="w-full mb-[3.125rem]"
            src={StatementOne}
            alt="img1"
          />
          <FadeUpComponent className="text-[20px] leading-[20px] md:text-[2.5rem] md:leading-[2.5rem] tracking-[-1px] font-medium">
            Education is the foundation of progress, but millions of students
            don’t receive the personalised support they need.
          </FadeUpComponent>
        </div>
        <div className="md:w-[calc(33.33%-1.5rem)] md:self-center" data-scroll data-scroll-speed="4">
          <Image
            className="w-full mb-[3.125rem]"
            src={StatementTwo}
            alt="img1"
          />
          <FadeUpComponent delay={100} className="text-[20px] leading-[20px] md:text-[2.5rem] md:leading-[2.5rem] tracking-[-1px] font-medium text-center">
            Educators are overwhelmed by large classrooms and responsibilities.
          </FadeUpComponent>
        </div>
        <div className="md:w-[calc(33.33%-1.5rem)] md:self-end flex flex-col" data-scroll data-scroll-speed="8">
          <FadeUpComponent delay={200} className="text-[20px] leading-[20px] md:text-[2.5rem] md:leading-[2.5rem] tracking-[-1px] font-medium text-right md:mb-[3.125rem] order-2 md:order-1">
            Institutions struggle with maintaining academic integrity and
            adapting to digital changes.
          </FadeUpComponent>
          <Image className="w-full order-1 md:order-2 mb-[3.125rem] md:m-0" src={StatementThree} alt="img1" />
        </div>
      </div>
    </div>
  );
};

export default Statement;
