"use client";

import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "rizzui";
import AuthLayout from "@/components/layout/auth-layout";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import useUser from "@/hooks/use-user";

const PlanView = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (type: any) => {
    setLoading(true);
    const stripe: any = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY || ""
    );
    const response = await axios.post("/api/payment/subscription/create", {
      priceId: "price_1QbpAqE0xQQIJDSe8TmcnUyC",
      freeTrial: type === "free",
      email: user?.email,
      name: user?.firstname + " " + user?.lastname,
    });
    setLoading(false);
    await stripe.redirectToCheckout({ sessionId: response.data.id });
  };

  return (
    <AuthLayout>
      <div className="w-full p-[1.25rem] md:p-[3.125rem] relative md:flex items-center justify-center">
        {/* Free Plan */}
        <div className="md:min-w-[400px] w-full md:max-w-[400px] md:px-3 flex justify-center md:mb-0 mb-[0.625rem]">
          <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
            <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
              #Free Plan
            </span>
            <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mt-[3.125rem]">
              Free Plan
            </h2>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              1 Week Trial
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Limited usage
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Hyper-personalised experience
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
              Full Access
            </p>
            <Button
              className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out border border-primary"
              color="primary"
              variant="text"
              onClick={() => handleSubmit("free")}
            >
              7 days left for your trial
            </Button>
          </div>
        </div>

        {/* Paid Plan */}
        <div className="md:min-w-[400px] w-full md:max-w-[400px] md:px-3 flex justify-center">
          <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
            <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
              #Paid Plan
            </span>
            <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mt-[3.125rem]">
              Pro Plan - £12.99
            </h2>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Monthly access
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Unlimited usage
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
              Hyper-personalised experience
            </p>
            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
              No limits
            </p>
            <Button
              className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out"
              color="primary"
              variant="solid"
              onClick={() => handleSubmit("paid")}
            >
              Choose this Package
              <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PlanView;
