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
import Logo from "@/public/logo.svg";

const Header = () => {
  return (
    // <header className="w-full absolute left-0 right-0 top-0 py-[3.0625rem] px-[3.25rem]">
    <header className="w-full py-[3.0625rem] px-[3.25rem]">
      <div className="w-full flex items-center justify-between">
        <Link
          href={"#"}
          className="text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] font-medium"
        >
          ABOUT
        </Link>
        <Link href={"/"}>
          <Image src={Logo} className="w-[2.5rem] h-[2.5rem]" alt="Alinda" />
        </Link>
        <Link
          href={"#"}
          className="text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] font-medium"
        >
          PRICING
        </Link>
      </div>
    </header>
  );
};

export default Header;
