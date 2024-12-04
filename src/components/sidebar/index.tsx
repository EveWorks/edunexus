import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./index.module.css";
import { Button, Loader } from "rizzui";
// import { signOut } from "next-auth/react";
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenu } from "@/store/features/settings";
import { IoClose, IoCreateOutline } from "react-icons/io5";
import useDevice from "@/hooks/use-device";
import { useEffect } from "react";
import {
  clearconversationList,
  getConversationList,
} from "@/store/features/chat";
import useUser from "@/hooks/use-user";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import moment from "moment";

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const id = pathname.split("/")?.[2];
  const { isMobile } = useDevice();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: any) => state.Settings);
  const { conversationList, conversationListCount, listLoader } =
    useAppSelector((state: any) => state.Chat);
  const user = useUser();

  const CloseMenu = () => {
    dispatch(updateMenu(false));
  };

  useEffect(() => {
    return () => {
      dispatch(clearconversationList({}));
    };
  }, []);

  useEffect(() => {
    dispatch(getConversationList({ userId: user.id }));
  }, []);

  return (
    <aside
      className={`h-screen md:h-[calc(100vh-40px)] py-[1.875rem] fixed top-0 md:top-[1.25rem] ${
        settings?.menu ? "left-0" : "left-[-100%]"
      } md:left-[1.25rem] z-20 transition-all duration-300 overflow-hidden w-screen md:w-[calc(30%-1.25rem)] bg-[#0C0C0C] md:bg-transparent`}
    >
      <div className="px-[1.25rem] flex items-center justify-between mb-[1.0219rem]">
        <Image className="w-[2.5rem]" src={Logo} alt="logo" />
        <span
          className={`text-[3.125rem] leading-[3.3781rem] font-medium transition-all duration-400 pl-[0.625r`}
        >
          Alinda
          {isMobile && (
            <Button
              className="bg-[#ffffff] w-[30px] h-[30px] rounded-[30px] p-0 ml-3 mb-3"
              variant="text"
              color="primary"
              onClick={CloseMenu}
            >
              <IoClose className="w-[20px] h-[20px] text-[#0c0c0c]" />
            </Button>
          )}
        </span>
      </div>

      <div className="mb-[0.625rem] bg-[#141414] rounded-[3.125rem] ps-[1.875rem] pt-[2rem] pb-[1.75rem] pe-[4.75rem] relative">
        <p className="text-[1.25rem] leading-[1.3313rem] mb-[1.4375rem] text-[#525252]">
          Profile
        </p>
        <p className="text-[1.875rem] leading-[2.0269rem] mb-[0.9375rem] font-medium">
          Good Morning, {user?.firstname}
        </p>
        <div className="flex flex-wrap items-center">
          <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#525252] border border-[#525252] rounded-[0.625rem] p-[0.5rem] me-[0.625rem] mb-[0.9rem]">
            {user?.degree}
          </span>
          <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#525252] border border-[#525252] rounded-[0.625rem] p-[0.5rem] me-[0.625rem] mb-[0.9rem]">
            {user?.university}
          </span>
        </div>
        <div className="flex flex-wrap items-center">
          <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-primary border border-primary mb-0 rounded-[0.625rem] p-[0.5rem]">
            Free Plan (7 days left in your free trial)
          </span>
        </div>
        <div className="absolute right-[1.25rem] top-[1.25rem] z-2">
          <Button
            variant="text"
            onClick={() => router.push(`/settings`)}
            className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] p-0 mr-2"
          >
            <GoArrowUpRight className="w-[1.25rem] h-[1.25rem]" />
          </Button>
          <Button
            variant="text"
            onClick={signOut}
            className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] p-0"
          >
            <FiLogOut className="w-[1.25rem] h-[1.25rem]" />
          </Button>
        </div>
      </div>

      <nav className="mb-[0.625rem] bg-[#141414] rounded-[3.125rem] py-[2rem] px-[0.625rem] relative">
        <p className="pl-[1.25rem] text-[1.25rem] leading-[1.3313rem] mb-[1.4375rem] text-[#525252]">
          Notification
        </p>

        <div className="absolute right-[1.25rem] top-[1.25rem] z-2">
          <Button
            variant="text"
            onClick={() => router.push(`/dashboard`)}
            className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] p-0 mr-2"
          >
            <IoCreateOutline className="w-[1.25rem] h-[1.25rem]" />
          </Button>
          <Button
            variant="text"
            className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C]  p-0"
          >
            <HiOutlineMenuAlt3 className="w-[1.125rem] h-[1.125rem]" />
          </Button>
        </div>
        <ul className="h-[calc(100vh-440px)] overflow-y-auto custom-scrollbar">
          {conversationListCount > 0 &&
            conversationList?.map((item: any) => (
              <li
                key={item?.id}
                className={`mb-[0.625rem] bg-[#0C0C0C] py-[1.25rem] px-[1.875rem] rounded-[1.5625rem] mx-auto ${
                  id === item.id && "bg-primary text-[#0C0C0C]"
                }`}
              >
                <Link href={`/chat/${item?.id}`} className={``}>
                  <p className="text-[1.875rem] leading-[2.0269rem] mb-[0.625rem]">
                    {item?.topicid?.topic_name}
                  </p>
                  {item?.start_date && (
                    <p className="text-[1.25rem] leading-[0.9375rem] text-[#525252] mb-[0.325rem]">
                      {moment(item?.start_date).format("DD MMM YYYY")}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          {listLoader && (
            <div className="flex items-center justify-center my-8">
              <Loader className="w-8 h-8" />
            </div>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
