"use client";

import React, { useEffect, useState } from "react";
import { Button, PinCode, Text, Title } from "rizzui";
import AuthLayout from "@/components/layout/auth-layout";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "@/axios";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { routes } from "@/utils/routes";
import { FaArrowRight } from "react-icons/fa6";

type FormValues = {
  otp: string;
};
const initialValues = {
  otp: "",
};

const VerifyView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOtpValid, setIsOtpValid] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(48);

  const { user, updateUser } = useUser();
  const {
    reset,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues,
  });
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sentOtp = async () => {
    await axios.post("/api/verify-email-otp", { userId: user.id });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    setIsLoading(true);
    const payload = {
      email: user?.email,
      verificationCode: Number(data.otp),
    };
    try {
      const response: any = await axios.post("/users/verify-otp", payload);
      if (response?.status) {
        toast.success(<Text>{response?.message}</Text>);
        await updateUser({
          ...user,
          emailVerified: true,
        });
        router.push(routes.plan);
      } else {
        setError("otp", {
          type: "custom",
          message: response?.message || "Invalid OTP",
        });
      }
    } catch (error: any) {
      toast.error(
        <Text>
          {error?.response?.data?.message ?? "Failed to create account."}
        </Text>
      );
    } finally {
      setIsLoading(false);
    }
  };

  console.log("value123", errors);

  return (
    <AuthLayout>
      <div className="w-full p-[1.25rem] md:p-[3.125rem] relative md:flex items-center justify-center">
        <div className="md:min-w-[500px] w-full md:max-w-[500px] md:px-3 flex justify-center md:mb-0 mb-[0.625rem]">
          <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="mt-[1.5rem] sm:mt-[3.75rem] space-y-7 sm:space-y-10">
                  <div className="min-w-full w-full !overflow-hidden">
                    <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mb-[3.125rem]">
                      Email Verification
                    </h2>
                    <PinCode
                      placeholder=""
                      inputClassName="text-[2rem] sm:text-5xl font-bold sm:font-extrabold text-[#FDF3DA] h-[3.625rem] sm:h-[6.625rem] w-full  rounded-[0.688rem]"
                      variant="outline"
                      length={6}
                      setValue={(value: any) => {
                        clearErrors("otp");
                        setValue("otp", String(value)); // Update form value
                        if (typeof value === "string") {
                          setIsOtpValid(value.length === 6);
                        } else {
                          setIsOtpValid(false);
                        }
                      }}
                      size="lg"
                      className="lg:justify-between   text-primary w-full min-w-full"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      error={errors?.otp?.message}
                    />
                  </div>
                  <Button
                    disabled={timer > 0}
                    className={`mt-[1.625rem] w-full p-0 text-base font-medium text-center h-auto ${
                      timer > 0 ? "text-[#918D81]" : "text-[#FDF3DA]"
                    }`}
                    variant="text"
                    onClick={() => timer <= 0 && sentOtp()}
                  >
                    Send again {timer > 0 ? `(${timer})` : ""}
                  </Button>
                  <Button
                    className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] my-[1.25rem] group transition duration-300 ease-in-out"
                    color="primary"
                    variant="solid"
                    isLoading={isLoading}
                    disabled={!isOtpValid}
                    type="submit"
                  >
                    Next
                    <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyView;
