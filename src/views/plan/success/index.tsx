"use client";
import AuthLayout from "@/components/layout/auth-layout";
import useUser from "@/hooks/use-user";
import { routes } from "@/utils/routes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Button } from "rizzui";

const PaymentSuccess = () => {
  const sessionId = useSearchParams().get("session_id");
  const { user, updateSubscription } = useUser();
  const router = useRouter();

  const getSubscription = async (id: string) => {
    const response = await axios.post("/api/payment/subscription/get", {
      id,
      userId: user.id,
    });
    if (response?.status) {
      await updateSubscription(response?.data?.data);
      setTimeout(() => {
        router.replace(routes.dashboard)
      }, 5000);
    }
  };

  useEffect(() => {
    sessionId && getSubscription(sessionId);
  }, [sessionId]);

  return (
    <AuthLayout>
      <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
        <IoCheckmarkDoneCircleOutline className="w-[100px] h-[100px] text-primary mx-auto" />
        <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium">
          Payment Successfull
        </h2>
        <Button
          className="text-[1.25rem] leading-[1.25rem] my-[3.125rem]"
          onClick={() => router.replace(routes.dashboard)}
          color="primary"
          size="xl"
        >
          Go to Dashboard
        </Button>
      </div>
    </AuthLayout>
  );
};

export default PaymentSuccess;
