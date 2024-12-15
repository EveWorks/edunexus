"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import { Button, Input, Password, Select } from "rizzui";
import { BiChevronLeft } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/use-user";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";
import axios from "@/axios";
import countryList from "react-select-country-list";
import toast from "react-hot-toast";
import getUniversities from "@/utils/getUniversities";

//two console errors from the university search selection, doesn't affect functionality

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
    value: "Others",
    label: "Others",
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
  email: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
};

const SettingView = () => {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [universities, setUniversities] = useState<Array<{value: string, label: string, country: string}>>([]);
  const [isLoadingUniversities, setIsLoadingUniversities] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("GB");
  const [searchTerm, setSearchTerm] = useState("");

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

  const countries = useMemo(() => countryList().getData(), []);

  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age.toString(),
      gender: user.gender,
      university: user.university,
      degree: user.degree,
      year: user.year.toString(),
      email: user.email,
      country: user.country,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data?.password !== data?.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    setIsLoading(true);
    const payload: any = {
      firstname: data.firstname,
      lastname: data.lastname,
      age: parseInt(data.age),
      gender: data.gender,
      university: data.university,
      degree: data.degree,
      year: parseInt(data.year),
      email: data.email,
      country: data.country,
    };

    if (data?.password) {
      payload.password = data.password;
    }

    const response: any = await axios.patch(`/users/${user.id}`, payload);

    if (response && Object.keys(response)?.length > 0) {
      toast.success("Profile updated successfully");
      await updateUser(response);
    }
    setIsLoading(false);
  };

  //crucial for allowing search functionality of universities (if removed page will crash due to too many options being loaded)
  const filteredUniversities = useMemo(() => {
    if (!searchTerm) return universities.slice(0, 50); // Show first 50 if no search term
    return universities
      .filter((uni) =>
        uni.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 50); // Limit to 50 results
  }, [universities, searchTerm]);


  return (
    <div className="md:p-[3.125rem]">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="mb-[0.625rem] md:bg-[#141414] rounded-[3.125rem] p-[1.25rem] md:p-[3.125rem] relative mb-[3.4375rem]">
          <div className="flex items-start">
            <div className="w-[33.33%]">
              <Button
                onClick={() => router.back()}
                variant="text"
                className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] h-fit p-[0.5rem] me-[0.625rem] mb-[0.9rem]"
              >
                <BiChevronLeft className="w-[1.25rem] h-[1.25rem] me-1" /> Back
              </Button>
            </div>
            <div className="w-[33.33%] flex justify-center">
              <div className="md:px-[3.75rem] md:py-[2.875rem] rounded-[1.5625rem] bg-[#080808]">
                <Image
                  className="w-[2.5rem] h-[2.5rem]"
                  src={Logo}
                  alt="logo"
                />
              </div>
            </div>
            <div className="w-[33.33%] flex justify-end">
              <Button
                color="primary"
                className="hidden md:flex text-[1.25rem] leading-[0.9375rem] font-medium rounded-[0.625rem] h-fit p-[0.5rem] me-[0.625rem] mb-[0.9rem]"
              >
                Edit Profile
              </Button>
              <Button
                variant="text"
                type="submit"
                isLoading={isLoading}
                className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] h-fit p-[0.5rem] me-[0.625rem] mb-[0.9rem]"
              >
                {" "}
                Save
              </Button>
            </div>
          </div>
          <div className="mt-[1.8125rem] flex flex-wrap gap-[0.625rem] justify-between">
            <Input
              className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]"
              inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
              placeholder="First Name"
              type="text"
              {...register("firstname", {
                required: { value: true, message: "First name is required" },
              })}
              error={errors?.firstname?.message}
            />
            <Input
              className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]"
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
                  className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]"
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
              name="gender"
              rules={{
                required: { value: true, message: "Gender is required" },
              }}
              render={({ field: { value } }) => (
                <Select
                  className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]"
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
              name="country"
              rules={{
                required: { value: true, message: "Country is required" },
              }}
              render={({ field: { value } }) => (
                <Select
                  className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]"
                  selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                  placeholder="Country"
                  value={value}
                  options={countries}
                  onChange={({ value }: any) => setValue("country", value)}
                  displayValue={(selected: string) => {
                    if (selected) {
                      return (
                        countries?.find((f) => f.value === selected)?.label ??
                        ""
                      );
                    } else {
                      return (
                        countries?.find((f) => f.value === value)?.label ?? ""
                      );
                    }
                  }}
                  error={errors?.country?.message}
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
                  className="w-[calc(50%-1rem/2)] md:w-[calc(50%-1rem/2)] mb-[0.625rem]"
                  selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                  value={value}
                  placeholder={isLoadingUniversities ? "Finding Universities..." : "University"}
                  options={filteredUniversities}
                  onChange={({ value }: any) => setValue("university", value)}
                  displayValue={(selected: string) =>
                    universities?.find((f) => f.value === selected)?.label ?? ""
                  }
                  error={errors?.university?.message}
                  searchable={true}
                  dropdownClassName="max-h-[200px] overflow-y-auto bg-secondary"
                  onSearchChange={(value: string) => setSearchTerm(value)}
                />
              )}
            />
            <Controller
              control={control}
              name="degree"
              rules={{
                required: { value: true, message: "Degree is required" },
              }}
              render={({ field: { value } }) => (
                <Select
                  className="w-[calc(50%-1rem/2)] md:w-[calc(25%-1rem/2)] mb-[0.625rem]"
                  selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                  placeholder="Degree"
                  options={degree}
                  value={value}
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
              name="year"
              rules={{ required: { value: true, message: "Year is required" } }}
              render={({ field: { value } }) => (
                <Select
                  className="w-full md:w-[calc(25%-1rem/2)] mb-[0.625rem]"
                  selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
                  placeholder="Year"
                  options={yearGroup}
                  value={value}
                  onChange={({ value }: any) => setValue("year", value)}
                  displayValue={(selected: string) =>
                    yearGroup?.find((f) => f.value === selected)?.label ?? ""
                  }
                  error={errors?.year?.message}
                />
              )}
            />
            <Input
              className="w-full md:w-[calc(33.33%-1rem/2)] mb-[0.625rem]"
              inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
              error={errors?.email?.message}
            />
            <Password
              className="w-full md:w-[calc(33.33%-1rem/2)] mb-[0.625rem]"
              inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
              placeholder="Enter Your Password"
              {...register("password")}
            />
            <Password
              className="w-full md:w-[calc(33.33%-1rem/2)] mb-[0.625rem]"
              inputClassName="text-[1.25rem] leading-[1.875rem] mb-[1.25rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]"
              placeholder="Re-enter Your Password"
              {...register("confirmPassword")}
            />
          </div>
        </div>
        <div className="mb-[0.625rem] bg-[#141414] rounded-[3.125rem] p-[1.25rem] md:p-[3.125rem] relative md:flex items-center">
          <div className="md:w-1/2 md:px-3 flex justify-center md:mb-0 mb-[0.625rem]">
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
                Limited usage{" "}
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
                type="submit"
              >
                7 days left for your trial
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:px-3 flex justify-center">
            <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
              <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
                #Paid Plan
              </span>
              <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mt-[3.125rem]">
                Pro Plan - £9.99
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
                type="submit"
              >
                Choose this Package
                <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingView;
