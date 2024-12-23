"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { useRouter } from "next/navigation";

const HeaderTwo = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <header className="w-full py-[3.0625rem] px-[2rem] md:px-[3.25rem]">
      <div className="w-full flex items-center justify-between">
        <div
          onClick={() => router.back()}
          className="text-[15px] leading-[25px] md:text-[1.5625rem] md:leading-[1.5625rem] tracking-[-1px] font-medium w-[33.33%]"
          id="s1"
        >
          BACK
        </div>
        <Link
          href={"/"}
          id="s2"
          className="w-[33.33%] flex items-center justify-center"
        >
          <Image src={Logo} className="w-[2.5rem] h-[2.5rem]" alt="Alinda" />
        </Link>
        {children}
      </div>
    </header>
  );
};

export default HeaderTwo;
