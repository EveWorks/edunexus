import type { Metadata } from "next";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Alinda",
  description: "The Alinda Experience",
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
        {children}
        <SpeedInsights /> {/* if buggy remove */}
        </>
    );
};

export default DashboardLayout;


