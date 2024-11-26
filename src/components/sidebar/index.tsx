import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";
import { Button } from "rizzui";
// import { signOut } from "next-auth/react";
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenu } from "@/store/features/settings";
import { IoClose } from "react-icons/io5";
import useDevice from "@/hooks/use-device";

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const menu = [
    {
      name: "Conversation 8",
      detail: "Neque porro quisquam est qui dolorem ipsum quia.",
      id: "87b76das32d23ddd",
    },
    {
      name: "Conversation 7",
      detail: "Neque porro quisquam est qui dolorem ipsum quia.",
      id: "87b76das32d23ddd",
    },
    {
      name: "Conversation 6",
      detail: "Neque porro quisquam est qui dolorem ipsum quia.",
      id: "87b76das32d23ddd",
    },
    {
      name: "Conversation 5",
      detail: "Neque porro quisquam est qui dolorem ipsum quia.",
      id: "87b76das32d23ddd",
    },
    {
      name: "Conversation 4",
      detail: "Neque porro quisquam est qui dolorem ipsum quia.",
      id: "87b76das32d23ddd",
    },
    {
      name: "Conversation 3",
      detail: "Neque porro quisquam est qui dolorem ipsum quia.",
      id: "87b76das32d23ddd",
    },
    {
      name: "Conversation 2",
      detail: "Neque porro quisquam est qui dolorem ipsum quia.",
      id: "87b76das32d23ddd",
    },
    {
      name: "Conversation 1",
      detail: "Neque porro quisquam est qui dolorem ipsum quia.",
      id: "87b76das32d23ddd",
    },
  ];

  const pathname = usePathname();
  const { isMobile } = useDevice()
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: any) => state.Settings);

  const selected = menu.find((item) => item?.id === pathname);

  const logoutUser = async () => {
    // const payload = {
    //   refreshToken: tokens.refresh.token,
    // };
    // await axios.post("/auth/logout", payload);
    // await signOut();
  };

  const CloseMenu = () => {
    dispatch(updateMenu(false))
  }


  return (
    <aside
      className={`h-screen md:h-[calc(100vh-40px)] py-[1.875rem] fixed top-0 md:top-[1.25rem] ${settings?.menu ? "left-0" : "left-[-100%]"} md:left-[1.25rem] z-20 transition-all duration-300 overflow-hidden w-screen md:w-[calc(30%-1.25rem)] bg-[#0C0C0C] md:bg-transparent`}
    >
      <div className="px-[1.25rem] flex items-center justify-between mb-[1.0219rem]">
        <Image className="w-[2.5rem]" src={Logo} alt="logo" />
        <span
          className={`text-[3.125rem] leading-[3.3781rem] font-medium transition-all duration-400 pl-[0.625r`}
        >
          Alinda

          {isMobile && (
            <Button className="bg-[#ffffff] w-[30px] h-[30px] rounded-[30px] p-0 ml-3 mb-3" variant="text" color="primary" onClick={CloseMenu}>
              <IoClose className="w-[20px] h-[20px] text-[#0c0c0c]" />
            </Button>
          )}
        </span>
      </div>

      <div className="mb-[0.625rem] bg-[#141414] rounded-[3.125rem] ps-[1.875rem] pt-[2rem] pb-[1.75rem] pe-[4.75rem] relative">
        <p className="text-[1.25rem] leading-[1.3313rem] mb-[1.4375rem] text-[#525252]">Profile</p>
        <p className="text-[1.875rem] leading-[2.0269rem] mb-[0.9375rem] font-medium">Good Morning, Shubham</p>
        <div className="flex flex-wrap items-center">
          <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#525252] border border-[#525252] rounded-[0.625rem] p-[0.5rem] me-[0.625rem] mb-[0.9rem]">B-Tech</span>
          <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#525252] border border-[#525252] rounded-[0.625rem] p-[0.5rem] me-[0.625rem] mb-[0.9rem]">S.R.M Institute of Science & Commerce</span>
        </div>
        <div className="flex flex-wrap items-center">
          <span className="text-[1.25rem] leading-[0.9375rem] font-medium text-primary border border-primary mb-0 rounded-[0.625rem] p-[0.5rem]">Free Plan (7 days left in your free trial)</span>
        </div>
        <Button
          variant="text"
          className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] absolute right-[1.25rem] top-[1.25rem] z-2 p-0"
        >
          <GoArrowUpRight className="w-[1.25rem] h-[1.25rem]" />
        </Button>
      </div>

      <nav className="mb-[0.625rem] bg-[#141414] rounded-[3.125rem] py-[2rem] px-[0.625rem] relative">
        <p className="pl-[1.25rem] text-[1.25rem] leading-[1.3313rem] mb-[1.4375rem] text-[#525252]">Notification</p>
        <Button
          variant="text"
          className="bg-[#0C0C0C] w-[2.375rem] h-[2.375rem] rounded-[3.125rem] hover:bg-primary hover:text-[#0C0C0C] absolute right-[1.25rem] top-[1.25rem] z-2 p-0"
        >
          <HiOutlineMenuAlt3 className="w-[1.125rem] h-[1.125rem]" />
        </Button>
        <ul className="h-[calc(100vh-440px)] overflow-y-auto custom-scrollbar">
          {menu.map((item) => (
            <li
              key={item.name}
              className={`mb-[0.625rem] bg-[#0C0C0C] py-[1.25rem] px-[1.875rem] rounded-[1.5625rem] mx-auto ${selected?.id === item.id && 'bg-primary text-[#0C0C0C]'}`}
            >
              <Link
                href={`/${item.id}`}
                className={``}
              >
                <p className="text-[1.875rem] leading-[2.0269rem] mb-[0.625rem]">
                  {item.name}
                </p>
                <p className="text-[1.25rem] leading-[0.9375rem] text-[#525252] mb-[0.325rem]">
                  {item.detail}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
