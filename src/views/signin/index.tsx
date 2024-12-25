"use client";
import Link from "next/link";
import { Button, Input, Password } from "rizzui";
import { FaArrowRight } from "react-icons/fa6";
import AuthLayout from "@/components/layout/auth-layout";
import { routes } from "@/utils/routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Mixpanel } from "@/utils/mixpanel";
import ReCAPTCHA from "react-google-recaptcha";

type Inputs = {
  email: string;
  password: string;
};

const SignInView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA!");
      return;
    }
    
    setIsLoading(true);
    try {
      const response: any = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (response?.ok) {
        const session: any = await getSession();
        const user = session?.user?.data?.user;
        // Mixpanel.identify(user.id);
        // Mixpanel.track("Successful login");
        // Mixpanel.people.set({
        //   $first_name: user.first_name,
        //   $last_name: user.last_name,
        // });
        router.push(routes.dashboard);
      } else {
        toast.error(response?.error);
      }
    } catch (error) {
      // Mixpanel.track("Unsuccessful login");
      console.log("Error sign in:", error);
    }
    setIsLoading(false);
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <AuthLayout>
      <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
        <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
          #1 AI Educator 🚀
        </span>
        <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-extrabold mt-[3.125rem]">
          ALINDA
        </h2>
        <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
          Need a personalised experience? Are your lecturers not doing enough? Start with Alinda.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="md:px-[50px]">
          <Input
            inputClassName="text-[1.25rem] leading-[1.875rem] mb-[0.625rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
            placeholder="Email Address"
            type="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
            })}
            error={errors?.email?.message}
          />
          <Password
            inputClassName="text-[1.25rem] leading-[1.875rem] mb-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
            placeholder="Enter Your Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
            error={errors?.password?.message}
          />
          <div className="mb-[1.25rem]">
            <ReCAPTCHA
              sitekey="6LeekqUqAAAAAPLTKTIC9C2fF4a1PRkXzLkSA-ff" // Replace with your actual reCAPTCHA site key
              onChange={handleCaptchaChange}
            />
          </div>
          <Button
            className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out"
            color="primary"
            variant="solid"
            type="submit"
            isLoading={isLoading}
          >
            Login
            <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
          </Button>
          <span className="text-[1.25rem] leading-[1.875rem] text-gray-400">
            Don't have an account?{" "}
            <Link href={routes.signUp} className="text-[#FFFFFF]">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignInView;
