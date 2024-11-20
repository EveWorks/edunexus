import Link from "next/link"
import { Button, Input, Password } from "rizzui"
import { FaArrowRight } from "react-icons/fa6"
import AuthLayout from "@/components/layout/auth-layout"

const SignInView = () => {
    return (
        <AuthLayout>
            <div className="md:p-[3.125rem] py-[1.875rem] px-[1.25rem] rounded-[3.125rem] gradient-border max-w-[37.5rem] w-full text-center">
                <span className="text-[0.9375rem] leading-[1.875rem] px-[3.125rem] py-[0.9375rem] bg-[#FFFFFF15] rounded-[3.125rem] text-center">
                    #1 Learning App 🚀
                </span>
                <h2 className="text-[3.125rem] leading-[4.375rem] text-center font-extrabold mt-[3.125rem]">ALINDA</h2>
                <p className="text-[1.25rem] leading-[1.25rem] text-[#A0A0A0] mb-[3.1875rem]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a magna rutrum, ornare nunc non, laoreet enim. Sed mollis suscipit diam, quis.</p>
                <form className="md:px-[50px]">
                    <Input inputClassName="text-[1.25rem] leading-[1.875rem] mb-[0.625rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Username" type="email" />
                    <Password inputClassName="text-[1.25rem] leading-[1.875rem] mb-[1.875rem] w-full h-[3.75rem] rounded-[1.25rem] px-[1.25rem] border-2 border-[#525252]" placeholder="Enter Your Password" />
                    <Button className="w-full text-[1.25rem] leading-[1.875rem] h-[3.75rem] rounded-[1.25rem] mb-[1.25rem] group transition duration-300 ease-in-out" color="primary" variant="solid" type="submit">
                        Login
                        <FaArrowRight className="ml-[0.6769rem] w-[15px] h-[15px] transition-transform duration-300 ease-in-out group-hover:ml-[1rem] group-hover:translate-x-1" />
                    </Button>
                    <span className="text-[1.25rem] leading-[1.875rem] text-gray-400">Don't have an account? <Link href='/signup' className="text-[#FFFFFF]" >Signup</Link></span>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignInView

