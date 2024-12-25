"use client";

import Link from "next/link";
import { Button, Input, Password, Select } from "rizzui";
import { FaArrowRight } from "react-icons/fa6";
import AuthLayout from "@/components/layout/auth-layout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { routes } from "@/utils/routes";
import axios from "@/axios";
import countryList from "react-select-country-list";
import getUniversities from "@/utils/getUniversities";
import { ageGroup, degree, gender, yearGroup } from "@/utils/constants";
import ReCAPTCHA from "react-google-recaptcha";
import useMixpanel from "@/hooks/use-mixpanel";

//two console errors from the university search selection, doesn't affect functionality

const dropdownStyles = {
  dropdownClassName: "bg-secondary opacity-90 z-10",
};

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
  const [universities, setUniversities] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [isLoadingUniversities, setIsLoadingUniversities] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const mixpanel = useMixpanel();

  useEffect(() => {
    const loadUniversities = async () => {
      try {
        const data = await getUniversities();
        if (data) {
          setUniversities(data);
        }
      } catch (error) {
        console.error("Failed to load universities:", error);
      } finally {
        setIsLoadingUniversities(false);
      }
    };

    loadUniversities();
  }, []);

  const filteredUniversities = useMemo(() => {
    if (!searchTerm) return universities.slice(0, 50); // Show first 50 if no search term
    return universities
      .filter((uni) =>
        uni.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 50); // Limit to 50 results
  }, [universities, searchTerm]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA!");
      return;
    }

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
        mixpanel.track("user_signup", {
          name: response?.user.firstname + " " + response?.user.lastname,
          email: response?.user.email,
        });
        mixpanel.track("user_signup_country", {
          email: response?.user.email,
          country: response?.user.country,
        });
        mixpanel.people.set({
          name: response?.user.firstname + " " + response?.user.lastname,
          email: response?.user.email,
          country: response?.user.country,
          university: response?.user.university,
          degree: response?.user.degree,
          year: response?.user.year,
          age: response?.user.age,
          gender: response?.user.gender,
        });
        router.push(routes.dashboard);
      } else {
        toast.error(responseSignIn?.error);
      }
    } else {
      toast.error(response?.message);
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
          Start Speaking With Alinda 🚀
        </span>
        <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mt-[3.125rem]">
          Sign Up Account
        </h2>
        <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
          Tell Alinda about yourself 😉
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
                dropdownClassName={dropdownStyles.dropdownClassName}
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
                dropdownClassName={dropdownStyles.dropdownClassName}
                error={errors?.gender?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="university"
            rules={{
              required: { value: true, message: "University is required" },
            }}
            render={({ field: { value } }) => (
              <Select
                className="w-full mb-[0.625rem]"
                selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                value={value}
                placeholder={
                  isLoadingUniversities
                    ? "Finding Universities..."
                    : "University"
                }
                options={filteredUniversities}
                onChange={({ value }: any) => setValue("university", value)}
                displayValue={(selected: string) =>
                  universities?.find((f) => f.value === selected)?.label ?? ""
                }
                error={errors?.university?.message}
                searchable={true}
                dropdownClassName={`${dropdownStyles.dropdownClassName} max-h-[200px] overflow-y-auto`}
                onSearchChange={(value: string) => setSearchTerm(value)}
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
                dropdownClassName={dropdownStyles.dropdownClassName}
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
                dropdownClassName={dropdownStyles.dropdownClassName}
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
                dropdownClassName={dropdownStyles.dropdownClassName}
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
          <div className="mb-[0.625rem]">
            <ReCAPTCHA
              sitekey="6LeekqUqAAAAAPLTKTIC9C2fF4a1PRkXzLkSA-ff" // Replace with your actual reCAPTCHA site key
              onChange={handleCaptchaChange}
            />
          </div>
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
