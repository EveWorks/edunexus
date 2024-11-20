"use client";
import { useState } from "react";
import Header from "../header";
import Sidebar from "../sidebar";
import Footer from "../footer";
import useDevice from "@/hooks/use-device";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const { isMobile } = useDevice();

    return (
        <div className="p-[1.25rem]">
            <Sidebar open={open} setOpen={setOpen} />
            <main
                className={`relative ml-auto h-full transition-all duration-300 w-[70%] h-[calc(100dvh-2.0625rem)]`}
            >
                <div className="content h-full md:pb-0 pb-[8.25rem] bg-[#141414] rounded-[3.125rem]">
                    {/* <Header open={openDrawer} setOpen={setOpenDrawer} /> */}
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
