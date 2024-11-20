import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { TiFlowMerge } from "react-icons/ti";
import { PiGear } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { Avatar } from "rizzui";

const Footer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const menu = [
    {
      name: "Dashboard",
      icon: <TiFlowMerge className="w-[1.875rem] h-[1.25rem]" />,
      path: "/",
    },
    {
      name: "Dashboard",
      icon: <TiFlowMerge className="w-[1.875rem] h-[1.25rem]" />,
      path: "/as",
    },
    {
      name: "Dashboard",
      icon: <Image className="w-[2.5rem]" src={Logo} alt="logo" />,
      path: "/dasd",
    },
    {
      name: "Dashboard",
      icon: <TiFlowMerge className="w-[1.875rem] h-[1.25rem]" />,
      path: "/dasd",
    },
  ];

  const menu2 = [
    {
      name: "Settings",
      icon: <PiGear className="w-[1.875rem] h-[1.25rem]" />,
      path: "/settings",
    },
    {
      name: "Logout",
      icon: <TbLogout className="w-[1.875rem] h-[1.25rem]" />,
      path: "/logout",
    },
  ];

  const pathname = usePathname();

  const selected = [...menu, ...menu2].find((item) => item?.path === pathname);

  return (
    <footer
      className={`w-[calc(100%-2.5rem)] p-[1.25rem] bg-[#000000] rounded-[3.125rem] fixed bottom-[1.25rem] left-[1.25rem] z-20 transition-all duration-300 overflow-hidden`}
    >
      <nav className="h-full">
        <ul className="flex overflow-y-auto overflow-x-hidden">
          {menu.map((item) => (
            <li key={item.name} className={`w-[20%]`}>
              <Link
                href={item.path}
                className={`flex items-center rounded-tl-[3.125rem] rounded-bl-[3.125rem]`}
              >
                <div
                  className={`w-[3.31rem] h-[3.31rem] mx-auto rounded-[3.125rem] flex justify-center items-center ${
                    selected?.path === item.path
                      ? "bg-[#FFFFFF] text-[#0B0B0B]"
                      : " bg-[#0B0B0B]  text-[#FFFFFF]"
                  }`}
                >
                  {item.icon}
                </div>
              </Link>
            </li>
          ))}
          <li
            className={`w-[20%] flex justify-center`}
            onClick={() => setOpen(!open)}
          >
            <Avatar
              name="John Doe"
              src="https://randomuser.me/api/portraits/women/40.jpg"
              className="cursor-pointer w-[2.5rem] h-[2.5rem] mx-auto"
            />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
