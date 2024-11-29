"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.from("#s1, #s2, #s3", {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 2.5,
    });
  });

  return (
    <header className="w-full py-[3.0625rem] px-[3.25rem]">
      <div className="w-full flex items-center justify-between">
        <Link
          href={"#"}
          className="text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] font-medium"
          id="s1"
        >
          ABOUT
        </Link>
        <Link href={"/"} id="s2">
          <Image src={Logo} className="w-[2.5rem] h-[2.5rem]" alt="Alinda" />
        </Link>
        <Link
          href={"#"}
          className="text-[1.5625rem] leading-[1.5625rem] tracking-[-1px] font-medium"
          id="s3"
        >
          PRICING
        </Link>
      </div>
    </header>
  );
};

export default Header;
