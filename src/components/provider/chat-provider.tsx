"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { MicrophoneContextProvider } from "@/context/MicrophoneContextProvider";
import { DeepgramContextProvider } from "@/context/DeepgramContextProvider";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/use-user";

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useUser();

  if (
    !user ||
    pathname.includes("signin") ||
    pathname.includes("signup") ||
    pathname.includes("settings")
  ) {
    return <>{children}</>;
  }

  // if (pathname === "/") {
  //   return <>{children}</>;
  // }

  return (
    <DashboardLayout>
      <MicrophoneContextProvider>
        <DeepgramContextProvider>{children}</DeepgramContextProvider>
      </MicrophoneContextProvider>
    </DashboardLayout>
  );
};

export default ChatProvider;
