"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Avatar, Button, Drawer, Dropdown, Input } from "rizzui";
import useDevice from "@/hooks/use-device";
import { BiChevronDown } from "react-icons/bi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiBellSimple, PiGear } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
// import { signOut } from "next-auth/react";

const Header = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { isMobile } = useDevice();

  const menu2 = [
    {
      name: "Settings",
      icon: <PiGear className="w-[2rem] h-[2rem]" />,
      path: "/settings",
    },
    {
      name: "Logout",
      icon: <TbLogout className="w-[2rem] h-[2rem]" />,
      path: "/logout",
    },
  ];

  return (
    <header className="flex items-center md:pt-[1.25rem] pb-[1.6875rem]">
      <h2 className="bg-[#FFFFFF] text-[#0A0A0A] rounded-[3.125rem] text-[1.25rem] leading-[1.25rem] font-regular px-[1.25rem] py-[1.125rem]">
        Dashboard
      </h2>
      <div className="w-full flex items-center justify-end">
        {!isMobile && (
          <Input
            inputClassName="h-[3.125rem] bg-[#000000] text-[#FFFFFF] text-[0.9375rem] leading-[1.25rem] p-[0.625rem] rounded-[3.125rem]"
            variant="text"
            type="text"
            placeholder="Search..."
            prefix={
              <HiMiniMagnifyingGlass className="w-[1.875rem] h-[1.875rem]" />
            }
          />
        )}

        <Dropdown className="ml-[0.625rem]" placement="bottom-end">
          <Dropdown.Trigger>
            <Button
              variant="text"
              className="rounded-[3.125rem] flex items-center justifty-center w-[3.125rem] h-[3.125rem] bg-[#000000] p-[0.8125rem] relative"
            >
              <PiBellSimple className="w-[1.875rem] h-[1.875rem] text-[#FFFFFF]" />
              <div className="w-[0.625rem] h-[0.625rem] rounded-[0.625rem] bg-primary absolute right-[13px] top-[10px]"></div>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu className="bg-[#000000]">
            <Dropdown.Item>New notification</Dropdown.Item>
            <Dropdown.Item>New notification</Dropdown.Item>
            <Dropdown.Item>New notification</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {!isMobile && (
          <>
            <Dropdown className="ml-[0.625rem]" placement="bottom-end">
              <Dropdown.Trigger>
                <Avatar
                  name="John Doe"
                  src="https://randomuser.me/api/portraits/women/40.jpg"
                  className="cursor-pointer w-[3.125rem] h-[3.125rem]"
                />
              </Dropdown.Trigger>
              <Dropdown.Menu className="w-56 divide-y">
                <div className="mb-2 pt-2">
                  <Dropdown.Item>Account Settings</Dropdown.Item>
                  <Dropdown.Item>Support</Dropdown.Item>
                  <Dropdown.Item>License</Dropdown.Item>
                </div>
                <div className="mt-2 pt-2" onClick={() => signOut()}>
                  <Dropdown.Item>Sign Out</Dropdown.Item>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}

        {isMobile && (
          <Drawer isOpen={open} onClose={() => setOpen(false)}>
            <div className="p-[1.25rem] h-full w-full bg-background">
              <Input
                inputClassName="h-[3.125rem] bg-[#000000] text-[#FFFFFF] text-[0.9375rem] leading-[1.25rem] p-[0.625rem] rounded-[3.125rem]"
                variant="text"
                type="text"
                placeholder="Search..."
                prefix={
                  <HiMiniMagnifyingGlass className="w-[1.875rem] h-[1.875rem]" />
                }
              />
              <ul className="mt-[1.25rem]">
                {menu2.map((item) => (
                  <li
                    key={item.name}
                    className="pt-[1.25rem] mb-[1.25rem] px-[0.75rem]"
                  >
                    {item?.name === "Logout" ? (
                      <Button
                        variant="text"
                        onClick={() => signOut()}
                        className="flex items-center p-0"
                      >
                        {item.icon}
                        <span className="text-[1.5rem] leading-[1.5rem] pl-[0.75rem]">
                          {item.name}
                        </span>
                      </Button>
                    ) : (
                      <Link href={item.path} className="flex items-center">
                        {item.icon}
                        <span className="text-[1.5rem] leading-[1.5rem] pl-[0.75rem]">
                          {item.name}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Header;
