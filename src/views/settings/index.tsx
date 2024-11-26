'use client';

import Image from "next/image"
import Logo from "@/public/logo.svg"
import { Button, Input, Password, Select } from "rizzui"
import { BiChevronLeft } from "react-icons/bi"
import { FaArrowRight } from "react-icons/fa6"
import { useRouter } from "next/navigation"

const ageGroup = [
    {
        value: "15-25",
        label: "15-25"
    },
    {
        value: "25-35",
        label: "25-35"
    },
]

const gender = [
    {
        value: "male",
        label: "15-25"
    },
    {
        value: "25-35",
        label: "25-35"
    },
]

const SettingView = () => {

    const router = useRouter();

    return (
        <div className="md:p-[3.125rem]">
            <form className="">
                <div className="mb-[0.625rem] md:bg-[#141414] rounded-[3.125rem] p-[1.25rem] md:p-[3.125rem] relative mb-[3.4375rem]">
                    <div className="flex items-start" >
                        <div className="w-[33.33%]">
                            <Button onClick={() => router.push('/')} variant="text" className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] h-fit p-[0.5rem] me-[0.625rem] mb-[0.9rem]"><BiChevronLeft className="w-[1.25rem] h-[1.25rem] me-1" /> Back</Button>
                        </div>
                        <div className="w-[33.33%] flex justify-center">
                            <div className="px-[3.75rem] py-[2.875rem] rounded-[1.5625rem] bg-[#080808]">
                                <Image className="w-[2.5rem] h-[2.5rem]" src={Logo} alt="logo" />
                            </div>
                        </div>
                        <div className="w-[33.33%] flex justify-end">
                            <Button color="primary" className="text-[1.25rem] leading-[0.9375rem] font-medium rounded-[0.625rem] h-fit p-[0.5rem] me-[0.625rem] mb-[0.9rem]">Edit Profile</Button>
                            <Button variant="text" className="text-[1.25rem] leading-[0.9375rem] font-medium text-[#FFFFFF] border border-[#525252] rounded-[0.625rem] h-fit p-[0.5rem] me-[0.625rem] mb-[0.9rem]"> Save</Button>
                        </div>
                    </div>
                    <div className="mt-[1.8125rem] flex flex-wrap gap-[0.625rem] justify-between">
                        <Input className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="First Name" type="text" />
                        <Input className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Last Name" type="text" />
                        <Select className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Age Group" options={ageGroup} />
                        <Select className="w-[calc(50%-1rem/2)] md:w-[calc(20%-1rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Gender" options={gender} />
                        <Select className="w-full md:w-[calc(20%-1rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Country" options={gender} />
                        <Select className="w-[calc(50%-1rem/2)] md:w-[calc(50%-1rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="University" options={ageGroup} />
                        <Select className="w-[calc(50%-1rem/2)] md:w-[calc(25%-1rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Degree" options={gender} />
                        <Select className="w-full md:w-[calc(25%-1rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Year" options={ageGroup} />
                        <Input className="w-full md:w-[calc(33.33%-1rem/2)] mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Email Address" type="email" />
                        <Password className="w-full md:w-[calc(33.33%-1rem/2)] mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Enter Your Password" />
                        <Password className="w-full md:w-[calc(33.33%-1rem/2)] mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] mb-[1.25rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Re-enter Your Password" />
                    </div>
                </div>
                <div className="mb-[0.625rem] bg-[#141414] rounded-[3.125rem] p-[1.25rem] md:p-[3.125rem] relative md:flex items-center">
                    <div className="md:w-1/2 md:px-3 flex justify-center md:mb-0 mb-[0.625rem]">
                        <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
                            <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
                                #Free Plan
                            </span>
                            <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mt-[3.125rem]">Free Plan</h2>
                            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">1 Week Trial</p>
                            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">Limited usage </p>
                            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
                                Hyper-personalised experience
                            </p>
                            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
                                Full Access
                            </p>
                            <Button className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out border border-primary" color="primary" variant="text" type="submit">
                                7 days left for your trial
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:px-3 flex justify-center">
                        <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
                            <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
                                #Paid Plan
                            </span>
                            <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mt-[3.125rem]">Pro Plan - £5.99</h2>
                            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">Monthly access</p>
                            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">Unlimited usage</p>
                            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-0">
                                Hyper-personalised experience
                            </p>
                            <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">
                                No limits
                            </p>
                            <Button className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out" color="primary" variant="solid" type="submit">
                                Choose this Package
                                <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SettingView