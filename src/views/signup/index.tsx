"use client";

import Link from "next/link";
import { Button, Input, Password, Select } from "rizzui";
import { FaArrowRight } from "react-icons/fa6";
import AuthLayout from "@/components/layout/auth-layout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { routes } from "@/utils/routes";
import axios from "@/axios";
import countryList from "react-select-country-list";

const gender = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "others",
    label: "Others",
  },
];

const university = [
  {
    value: "hardvard",
    label: "Hardvard University",
  },
  {
    value: "cambridge",
    label: "Cambridge University",
  },
  {
    value: "stanford",
    label: "Stanford University",
  },
];

const degree = [
  {
    value: "Computer Science",
    label: "Computer Science",
  },
  {
    value: "Mathematics",
    label: "Mathematics",
  },
];

const ageGroup = Array.from({ length: 71 }, (_, i) => {
  const value = (18 + i).toString();
  return { value, label: value };
});

const yearGroup = generateYearObjects(1980);

function generateYearObjects(startYear: number) {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
    const year = (startYear + i).toString();
    return { value: year, label: year };
  });
}

type Inputs = {
  firstname: string;
  lastname: string;
  age: string;
  gender: string;
  university: string;
  degree: string;
  year: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpView = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const countries = useMemo(() => countryList().getData(), []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    setIsLoading(true);
    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      age: parseInt(data.age),
      gender: data.gender,
      university: data.university,
      degree: data.degree,
      country: data.country,
      year: parseInt(data.year),
      email: data.email,
      password: data.password,
    };
    const response: any = await axios.post("/users", payload);
    if (response?.user) {
      toast.success("Account created successfully");
      const payload2 = {
        email: data.email,
        password: data.password,
      };
      const responseSignIn: any = await signIn("credentials", {
        ...payload2,
        redirect: false,
      });
      if (responseSignIn?.ok) {
        router.push(routes.dashboard);
      } else {
        toast.error(responseSignIn?.error);
      }
    } else {
      toast.error(response?.message);
    }
    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
        <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
          Create Your Unique identity 🚀
        </span>
        <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mt-[3.125rem]">
          Sign Up Account
        </h2>
        <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
          Lorem ipsum dolor sit amet
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:px-[50px] flex flex-wrap gap-[[0.625rem] justify-between"
        >
          <Input
            className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]"
            inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
            placeholder="First Name"
            type="text"
            {...register("firstname", {
              required: { value: true, message: "First name is required" },
            })}
            error={errors?.firstname?.message}
          />
          <Input
            className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]"
            inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
            placeholder="Last Name"
            type="text"
            {...register("lastname", {
              required: { value: true, message: "Last name is required" },
            })}
            error={errors?.lastname?.message}
          />
          <Controller
            control={control}
            name="age"
            rules={{ required: { value: true, message: "Age is required" } }}
            render={({ field: { value } }) => (
              <Select
                className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]"
                selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                placeholder="Age"
                value={value}
                options={ageGroup}
                onChange={({ value }: any) => setValue("age", value)}
                displayValue={(selected: string) =>
                  ageGroup?.find((f) => f.value === selected)?.label ?? ""
                }
                error={errors?.age?.message}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: { value: true, message: "Gender is required" } }}
            name="gender"
            render={({ field: { value } }) => (
              <Select
                className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]"
                selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                placeholder="Gender"
                value={value}
                options={gender}
                onChange={({ value }: any) => setValue("gender", value)}
                displayValue={(selected: string) =>
                  gender?.find((f) => f.value === selected)?.label ?? ""
                }
                error={errors?.gender?.message}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: { value: true, message: "University is required" },
            }}
            name="university"
            render={({ field: { value } }) => (
              <Select
                className="w-full mb-[0.625rem]"
                selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                placeholder="University"
                value={value}
                options={university}
                onChange={({ value }: any) => setValue("university", value)}
                displayValue={(selected: string) =>
                  university?.find((f) => f.value === selected)?.label ?? ""
                }
                error={errors?.university?.message}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: { value: true, message: "Degree is required" } }}
            name="degree"
            render={({ field: { value } }) => (
              <Select
                className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]"
                selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                placeholder="Degree"
                value={value}
                options={degree}
                onChange={({ value }: any) => setValue("degree", value)}
                displayValue={(selected: string) =>
                  degree?.find((f) => f.value === selected)?.label ?? ""
                }
                error={errors?.degree?.message}
              />
            )}
          />
          <Controller
            control={control}
            rules={{ required: { value: true, message: "Year is required" } }}
            name="year"
            render={({ field: { value } }) => (
              <Select
                className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]"
                selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                placeholder="Year"
                value={value}
                options={yearGroup}
                onChange={({ value }: any) => setValue("year", value)}
                displayValue={(selected: string) =>
                  yearGroup?.find((f) => f.value === selected)?.label ?? ""
                }
                error={errors?.year?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            rules={{
              required: { value: true, message: "Country is required" },
            }}
            render={({ field: { value } }) => (
              <Select
                className="w-full mb-[0.625rem]"
                selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                placeholder="Country"
                value={value}
                options={countries}
                onChange={({ value }: any) => setValue("country", value)}
                displayValue={(selected: string) =>
                  countries?.find((f) => f.value === selected)?.label ?? ""
                }
                error={errors?.country?.message}
              />
            )}
          />
          <Input
            className="w-full mb-[0.625rem]"
            inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
            placeholder="Email Address"
            type="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
            })}
            error={errors?.email?.message}
          />
          <Password
            className="w-full mb-[0.625rem]"
            inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
            placeholder="Enter Your Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
            error={errors?.password?.message}
          />
          <Password
            className="w-full mb-[0.625rem]"
            inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
            placeholder="Re-enter Your Password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm password is required",
              },
            })}
            error={errors?.confirmPassword?.message}
          />
          <Button
            className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] my-[1.25rem] group transition duration-300 ease-in-out"
            color="primary"
            variant="solid"
            type="submit"
            isLoading={isLoading}
          >
            Sign Up
            <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
          </Button>
          <span className="text-center text-[1.25rem] leading-[1.875rem] text-gray-400 w-full">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#FFFFFF]">
              Login
            </Link>
          </span>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpView;
