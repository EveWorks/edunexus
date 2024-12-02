"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { MicrophoneContextProvider } from "@/context/MicrophoneContextProvider";
import { DeepgramContextProvider } from "@/context/DeepgramContextProvider";

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <MicrophoneContextProvider>
        <DeepgramContextProvider>{children}</DeepgramContextProvider>
      </MicrophoneContextProvider>
    </DashboardLayout>
  );
};

export default ChatProvider;
