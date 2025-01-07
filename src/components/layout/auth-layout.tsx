import Image from "next/image";
import Logo from "@/public/logo.svg";
import BgVector from "@/public/bg.png";
import BgVectorShadow from "@/public/vector.svg";
import { Button } from "rizzui";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-[1.25rem] md:p-[2.8531rem] auth-bg">
      <div className="flex items-center justify-between w-full">
        <div className="md:w-[33.333%] md:block hidden"></div>
        <div className="w-full md:w-[33.333%]">
          <Image
            src={Logo}
            alt="Alinda"
            className="w-[2.5rem] h-[2.5rem] mb-[3.125rem] mx-auto"
          />
        </div>
        <div
          className={`md:w-[33.333%] ${
            pathname === "/plan" ? "block" : "hidden"
          }`}
        >
          {pathname === "/plan" && (
            <Button
              color="primary"
              onClick={signOut}
              className="text-[1.25rem] mb-[3.125rem] float-right"
            >
              Signout
            </Button>
          )}
        </div>
      </div>
      <div>{children}</div>
      <div></div>
      <div className="fixed md:left-0 md:bottom-0 md:h-[40dvh] md:w-full z-[1] opacity-[0.1] left-[-50%] bottom-[-30%] h-[60dvh] w-[200vw]">
        <Image
          src={BgVector}
          alt="vector"
          className="w-full h-auto rotate-center"
          priority
        />
      </div>
      <div className="fixed md:left-0 md:bottom-0 md:h-[40dvh] md:w-full z-[2] left-[-50%] bottom-[-30%] h-[60dvh] w-[200dvw]">
        <Image
          src={BgVectorShadow}
          alt="vector"
          className="w-full h-auto rotate-center-reverse"
          priority
        />
      </div>
    </div>
  );
};

export default AuthLayout;
