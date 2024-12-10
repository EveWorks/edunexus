"use client";
import { useState } from "react";
import Sidebar from "../sidebar";
import useDevice from "@/hooks/use-device";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isMobile } = useDevice();

  return (
    <div className="md:p-[1.25rem]">
      <Sidebar open={open} setOpen={setOpen} />
      <main
        className={`relative ml-auto transition-all duration-300 md:w-[calc(100%-30rem)] h-screen md:h-[calc(100dvh-2.5rem)]`}
      >
        <div className="content h-full pb-0 bg-[#0C0C0C] md:bg-[#141414] md:rounded-[3.125rem]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
