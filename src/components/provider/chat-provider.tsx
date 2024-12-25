"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { MicrophoneContextProvider } from "@/context/MicrophoneContextProvider";
import { DeepgramContextProvider } from "@/context/DeepgramContextProvider";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/use-user";

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useUser();

  if (user && (pathname.includes("chat") || pathname.includes("dashboard"))) {
    return (
      <DashboardLayout>
        <MicrophoneContextProvider>
          <DeepgramContextProvider>{children}</DeepgramContextProvider>
        </MicrophoneContextProvider>
      </DashboardLayout>
    );
  }

  return <>{children}</>;
};

export default ChatProvider;
