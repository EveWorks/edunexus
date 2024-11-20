import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";
import { Button } from "rizzui";
import { signOut } from "next-auth/react";
import { GoArrowUpRight } from "react-icons/go";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

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

  const selected = menu.find((item) => item?.id === pathname);

  const logoutUser = async () => {
    // const payload = {
    //   refreshToken: tokens.refresh.token,
    // };
    // await axios.post("/auth/logout", payload);
    await signOut();
  };

  return (
    <aside
      className={`h-[calc(100dvh-2.5rem)] py-[1.875rem] fixed top-[1.25rem] left-[1.25rem] z-20 transition-all duration-300 overflow-hidden w-full md:w-[calc(30%-1.25rem)]`}
    >
      <div className="px-[1.25rem] flex items-center justify-between mb-[1.0219rem]">
        <Image className="w-[2.5rem]" src={Logo} alt="logo" />
        <span
          className={`transition-all duration-400 pl-[0.625rem] text-[1.25rem] leading-[1.25rem]`}
        >
          Alinda
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
        <ul className="h-[calc(100dvh-30.0625rem)] overflow-y-auto custom-scrollbar">
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
