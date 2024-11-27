import Image from "next/image";
import StatementOne from "@/public/statement1.png";
import StatementTwo from "@/public/statement2.png";
import StatementThree from "@/public/statement3.png";
import { GoArrowDownLeft } from "react-icons/go";

const Statement = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-[3.125rem] py-[5rem]"
      data-scroll-section
    >
      <div className="mb-[4.125rem] w-full">
        <span className="text-[1.5625rem] leading-[1.875rem] tracking-[-1px] font-medium flex items-center">
          <GoArrowDownLeft className="w-[2.5rem] h-[2.5rem] mr-[1.25rem]" />{" "}
          PROBLEM STATEMENT
        </span>
      </div>
      <div className="h-full flex flex-wrap justify-between gap-[1.5rem]">
        <div className="md:w-[calc(33.33%-1.5rem)] self-start md:mb-[11.875rem]">
          <Image
            className="w-full mb-[3.125rem]"
            src={StatementOne}
            alt="img1"
          />
          <div className="text-[2.5rem] leading-[2.5rem] tracking-[-1px] font-medium">
            Education is the foundation of progress, but millions of students
            don’t receive the personalised support they need.
          </div>
        </div>
        <div className="md:w-[calc(33.33%-1.5rem)] self-center">
          <Image
            className="w-full mb-[3.125rem]"
            src={StatementTwo}
            alt="img1"
          />
          <div className="text-[2.5rem] leading-[2.5rem] tracking-[-1px] font-medium text-center">
            Educators are overwhelmed by large classrooms and responsibilities.
          </div>
        </div>
        <div className="md:w-[calc(33.33%-1.5rem)] self-end">
          <div className="text-[2.5rem] leading-[2.5rem] tracking-[-1px] font-medium text-right mb-[3.125rem]">
            Institutions struggle with maintaining academic integrity and
            adapting to digital changes.
          </div>
          <Image className="w-full" src={StatementThree} alt="img1" />
        </div>
      </div>
    </div>
  );
};

export default Statement;
