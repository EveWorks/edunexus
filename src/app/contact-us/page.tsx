"use client";
import Footer from "@/components/footer";
import HeaderTwo from "@/components/header-two";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Textarea } from "rizzui";

type Inputs = {
  email: string;
  name: string;
  message: string;
  subject: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
    } catch (error) {
      // Mixpanel.track("Unsuccessful login");
      console.log("Error contact form:", error);
    }
    setIsLoading(false);
  };
  return (
    <div className="bg-[#030303]">
      <HeaderTwo>
        <Link
          href={routes.gdpr}
          className="text-[15px] leading-[25px] md:text-[1.5625rem] md:leading-[1.5625rem] tracking-[-1px] font-medium w-[33.33%] text-right"
          id="s3"
        >
          CONTACT US
        </Link>
      </HeaderTwo>
      <h2 className="text-center text-[#FFC425] md:text-[10rem] leading-[10rem] text-[60px] font-druk-super md:mb-[6.25rem] mb-[1.5625rem] mt-[3.125rem] md:mt-[9.375rem]">
        CONTACT US
      </h2>
      <div className="max-w-[1128px] mx-auto px-[2rem] mb-[150px] text-[20px] leading-[20px] md:text-[2.5rem] md:leading-[2.5rem]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:px-[50px] flex flex-wrap justify-between"
        >
          <div className="md:w-[calc(50%-3.5px)] w-full">
            <Input
              inputClassName="text-[1.25rem] leading-[1.875rem] mb-[0.625rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
              placeholder="Name"
              {...register("name", {
                required: { value: true, message: "Name is required" },
              })}
              error={errors?.name?.message}
            />
          </div>
          <div className="md:w-[calc(50%-3.5px)] w-full">
            <Input
              inputClassName="text-[1.25rem] leading-[1.875rem] mb-[0.625rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
              error={errors?.email?.message}
            />
          </div>
          <div className="w-full">
            <Input
              inputClassName="text-[1.25rem] w-full leading-[1.875rem] mb-[0.625rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
              placeholder="Subject"
              {...register("subject", {
                required: { value: true, message: "Subject is required" },
              })}
              error={errors?.subject?.message}
            />
          </div>
          <div className="w-full">
            <Textarea
              textareaClassName="text-[1.25rem] min-h-[200px] leading-[1.875rem] mb-[0.625rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
              placeholder="Message"
              {...register("message", {
                required: { value: true, message: "Message is required" },
              })}
              error={errors?.message?.message}
            />
          </div>
          <Button
            className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] mb-[1.25rem] group transition duration-300 ease-in-out"
            color="primary"
            variant="solid"
            type="submit"
            isLoading={isLoading}
          >
            SEND MESSAGE
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
