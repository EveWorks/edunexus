import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./index.module.css";
import { Button, Loader } from "rizzui";
// import { signOut } from "next-auth/react"; miles was here
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenu } from "@/store/features/settings";
import { IoClose, IoCreateOutline } from "react-icons/io5";
import useDevice from "@/hooks/use-device";
import { useEffect, useState } from "react";
import {
  clearconversationList,
  deleteConversation,
  getConversationList,
  updateChatDetail,
} from "@/store/features/chat";
import useUser from "@/hooks/use-user";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import moment from "moment";
import { BiTrash } from "react-icons/bi";
import useMixpanel from "@/hooks/use-mixpanel";
import { getRemainingDays } from "@/utils/date";
import axios from "axios";

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
  const { user, subscription } = useUser();
  const mixpanel = useMixpanel();
  const [currentSubscription, setCurrentSubscription] = useState<any>({});
  const [subscriptionLoading, setSubscriptionLoading] =
    useState<boolean>(false);

  const CloseMenu = () => {
    dispatch(updateMenu(false));
  };

  const getCurrentSubscription = async () => {
    setSubscriptionLoading(true);
    const response: any = await axios.post(
      "/api/payment/subscription/current",
      {
        id: subscription?.subscriptionId,
      }
    );
    if (response?.data?.status) {
      setCurrentSubscription(response.data.data);
    }
    setSubscriptionLoading(false);
  };

  const openConversation = async (item: any) => {
    CloseMenu();
    router.refresh();
    window.location.href = `/chat/${item?.id}`;
    // router.push(`/chat/${item?.id}`);
  };

  const deleteChat = (conversationId: string) => {
    const payload: any = {
      id: conversationId,
    };

    if (id === conversationId) {
      payload.callback = () => {
        router.replace(`/dashboard`);
      };
    }

    dispatch(deleteConversation(payload));
    CloseMenu();
  };

  useEffect(() => {
    return () => {
      dispatch(clearconversationList({}));
    };
  }, []);

  useEffect(() => {
    dispatch(getConversationList({ userId: user.id }));

    if (subscription?.subscriptionId) {
      getCurrentSubscription();
    }
  }, []);

  return (
    <aside
      className={`h-screen md:h-[calc(100vh-2.5rem)] pt-[1.875rem] fixed top-0 md:top-[1.25rem] flex flex-col px-4 md:px-0 ${
        settings?.menu ? "left-0" : "left-[-100%]"
      } md:left-[1.25rem] z-20 transition-all duration-300 overflow-hidden w-screen md:w-[calc(30rem-1.25rem)] bg-[#0C0C0C] md:bg-transparent`}
    >
      <div className="md:px-[1.25rem] flex items-center justify-between mb-[1.0219rem]">
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
          {/* User Greeting and converting the first letter to Uppercase and rest to lowercase */}
          Good Morning,{" "}
          {user.firstname.charAt(0).toUpperCase() +
            user.firstname.slice(1).toLowerCase()}
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
            {currentSubscription?.type === "trialing" ? (
              <>
                Free Plan ({getRemainingDays(currentSubscription?.renewDate)}{" "}
                days left in your free trial) {/* this needs to be dynamic */}
              </>
            ) : (
              <>Pro Plan</>
            )}
          </span>
        </div>
        <div className="absolute right-[1.25rem] top-[1.25rem] z-2">
          <Button
            variant="text"
            onClick={() => {
              CloseMenu();
              router.push(`/settings`);
            }}
            className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] p-0 mr-2"
          >
            <GoArrowUpRight className="w-[1.25rem] h-[1.25rem]" />
          </Button>
          <Button
            variant="text"
            onClick={() => {
              mixpanel.track("session_end", {
                session_end: new Date().toISOString(),
                email: user.email,
              });
              signOut();
            }}
            className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] p-0"
          >
            <FiLogOut className="w-[1.25rem] h-[1.25rem]" />
          </Button>
        </div>
      </div>

      <nav className="bg-[#141414] rounded-[3.125rem] py-[2rem] px-[0.625rem] relative grow">
        <p className="pl-[1.25rem] text-[1.25rem] leading-[1.3313rem] mb-[1.4375rem] text-[#525252]">
          History
        </p>

        <div className="absolute right-[1.25rem] top-[1.25rem] z-2">
          <Button
            variant="text"
            onClick={() => {
              CloseMenu();
              router.push(`/dashboard`);
            }}
            className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] p-0"
          >
            <IoCreateOutline className="w-[1.25rem] h-[1.25rem]" />
          </Button>
          {/* <Button
            variant="text"
            className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] ml-2 p-0"
          >

            <HiOutlineMenuAlt3 className="w-[1.125rem] h-[1.125rem]" />
          </Button> */}
        </div>

        {/* .slice().reverse() -> slice creates a copy of the list and reverse changes the order - allowing for top to bottom viewing of the conversation history */}
        <ul className="h-full max-h-[calc(100dvh-410px)] overflow-y-auto custom-scrollbar">
          {conversationListCount > 0 &&
            conversationList?.map((item: any) => (
              <li
                key={item?.id}
                className={`mb-[0.625rem] bg-[#0C0C0C] rounded-[1.5625rem] mx-auto relative group ${
                  id === item.id && "bg-primary text-[#0C0C0C]"
                }`}
              >
                <Button
                  variant="text"
                  onClick={() => openConversation(item)}
                  className={`h-fit flex-col items-start text-left p-0 py-[1.25rem] pl-[1.875rem] pe-[2.75rem] w-full`}
                >
                  <p
                    className={`text-[1.675rem] leading-[2.0269rem] mb-[0.625rem] ${
                      id === item.id && "text-[#0C0C0C]"
                    }`}
                  >
                    {item?.conversation_title}
                  </p>
                  {item?.updatedAt ? (
                    <p className="text-[1.25rem] leading-[0.9375rem] text-[#525252] mb-[0.325rem]">
                      {moment(item?.updatedAt).format("DD MMM YYYY")}
                    </p>
                  ) : (
                    <p className="text-[1.25rem] leading-[0.9375rem] text-[#525252] mb-[0.325rem]">
                      {moment(item?.start_date).format("DD MMM YYYY")}
                    </p>
                  )}
                </Button>
                <Button
                  variant="text"
                  onClick={() => deleteChat(item?.id)}
                  className={`bg-transparent p-0 absolute right-[10px] top-[13px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    id === item.id && "hover:text-[#0C0C0C]"
                  }`}
                >
                  <BiTrash className="w-[1.25rem] h-[1.25rem]" />
                </Button>
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
