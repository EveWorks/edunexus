import Link from "next/link"
import { Button, Input, Password, Select } from "rizzui"
import { FaArrowRight } from "react-icons/fa6"
import AuthLayout from "@/components/layout/auth-layout"

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

const SignUpView = () => {
    return (
        <AuthLayout>
            <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
                <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
                    Create Your Unique identity 🚀
                </span>
                <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-medium mt-[3.125rem]">Sign Up Account</h2>
                <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">Lorem ipsum dolor sit amet</p>
                <form className="md:px-[50px] flex flex-wrap gap-[[0.625rem] justify-between">
                    <Input className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="First Name" type="text" />
                    <Input className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Last Name" type="text" />
                    <Select className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Age Group" options={ageGroup} />
                    <Select className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Gender" options={gender} />
                    <Select className="w-full mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="University" options={ageGroup} />
                    <Select className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Degree" options={gender} />
                    <Select className="w-[calc(50%-0.625rem/2)] mb-[0.625rem]" selectClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Year" options={ageGroup} />
                    <Input className="w-full mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Email Address" type="email" />
                    <Password className="w-full mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Enter Your Password" />
                    <Password className="w-full mb-[0.625rem]" inputClassName="text-[1.25rem] leading-[1.875rem] mb-[1.25rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Re-enter Your Password" />
                    <Button className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out" color="primary" variant="solid" type="submit">
                        Sign Up
                        <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
                    </Button>
                    <span className="text-center text-[1.25rem] leading-[1.875rem] text-gray-400 w-full">Already have an account? <Link href='/signin' className="text-[#FFFFFF]" >Login</Link></span>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUpView