"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import Chat from "@/components/chats";
import { MicrophoneContextProvider } from "@/context/MicrophoneContextProvider";
import { DeepgramContextProvider } from "@/context/DeepgramContextProvider";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <MicrophoneContextProvider>
        <DeepgramContextProvider>
          <Chat />
        </DeepgramContextProvider>
      </MicrophoneContextProvider>
    </DashboardLayout>
  );
};

export default Dashboard;
