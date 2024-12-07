import Image from "next/image";
import { Button, Select } from "rizzui";
import Icon from "@/public/layout-icon.svg";
import Logo from "@/public/logo.svg";
import { TbEdit } from "react-icons/tb";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAppDispatch } from "@/store/hooks";
import { updateMenu } from "@/store/features/settings";
import useDevice from "@/hooks/use-device";

const courses = [
  {
    value: "mathematics",
    label: "Mathematics",
  },
  {
    value: "computer_science",
    label: "Computer Science",
  },
];

const ChatHeader = ({ setPreview }: { setPreview: any }) => {
  const { isMobile } = useDevice();
  const dispatch = useAppDispatch();

  const OpenMenu = () => {
    dispatch(updateMenu(true));
  };

  return (
    <>
      {!isMobile ? (
        <div className="bg-[#0C0C0C50] border-b border-[#525252] py-[1.875rem] ps-[1.875rem] pr-[1.25rem] flex items-center">
          <div className="w-[33.33%]">
            <Button
              className="w-[2.5rem] h-[2.5rem] rounded-[0.625rem] border border-primary p-0"
              variant="text"
              color="primary"
              onClick={() =>
                setPreview((prev: string) => (prev === "1" ? "2" : "1"))
              }
            >
              <Image src={Icon} alt="layout" className="w-[1rem] h-[1rem]" />
            </Button>
          </div>
          <div className="w-[33.33%] text-center text-[1.875rem] leading-[2.0269rem] flex items-center justify-center">
            Conversation 8{" "}
            <TbEdit className="ml-[1.25rem] w-[1.125rem] h-[1.125rem] text-[#525252]" />
          </div>
          <div className="w-[33.33%] text-center flex items-center justify-end">
            <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#525252] border border-primary bg-primary rounded-[0.625rem] p-[0.5rem] mr-[1.25rem]">
              Mathematics
            </span>
            <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] p-[0.5rem]">
              Computer Science
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-[#141414] rounded-bl-[1.5625rem] rounded-br-[1.5625rem] py-[1.25rem] px-[1.1875rem] flex flex-wrap items-center justify-between">
          <div className="w-[33.33%]">
            <Button
              className="bg-[#0c0c0c] w-[30px] h-[30px] rounded-[30px] p-0"
              variant="text"
              color="primary"
              onClick={OpenMenu}
            >
              <HiOutlineMenuAlt3 className="w-[15px] h-[15px]" />
            </Button>
          </div>
          <div className="w-[33.33%] text-center flex items-center justify-center">
            <Image className="w-[1.25rem] mr-[0.3rem]" src={Logo} alt="logo" />
            <span
              className={`text-[1.25rem] leading-[1.3125rem] font-medium transition-all duration-400`}
            >
              Alinda
            </span>
          </div>
          <div className="w-[33.33%] flex items-center justify-end">
            <Button
              className="bg-[#0c0c0c] w-[30px] h-[30px] rounded-[30px] p-0 text-[15px] leading-[21px]"
              variant="text"
              color="primary"
            >
              ST
            </Button>
          </div>
          <div className="w-[50%] text-center text-[20px] leading-[21px] flex items-center mt-[15px]">
            Conversation 8{" "}
            <TbEdit className="ml-[5px] w-[1.125rem] h-[1.125rem] text-[#525252]" />
          </div>
          <div className="w-[50%] flex justify-end mt-[15px]">
            <Select
              className="w-fit font-medium"
              suffixClassName="text-[#151515]"
              selectClassName="text-[12px] leading-[1.875rem] min-w-[92px] w-fit h-[22px] rounded-[10px] py-[7px] px-[10px] border border-primary bg-primary"
              placeholder="Course"
              options={courses}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
