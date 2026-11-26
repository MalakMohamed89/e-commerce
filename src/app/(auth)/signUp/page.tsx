"use client"
import Image from "next/image";
import { ShieldCheck, Star, Truck, UserRoundPlus } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import InputField from "@/app/_components/InputField/InputField";
import { useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "@/Schema/auth/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPost } from "@/Actions/auth.actions";
import { useState } from "react";
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation";
import Link from "next/link";

const benefits = [
  {
    icon: Star,
    title: "Premium Quality",
    description: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your data and payments are completely secure",
  },
];



export default function SignUpPage() {
const [isAgreed, setIsAgreed] = useState(false);
const [agreeError, setAgreeError] = useState(false);
const route=useRouter()

const form=useForm<registerSchemaType>({
    defaultValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
    },
    resolver:zodResolver(registerSchema),
mode: "onChange",
})

const {handleSubmit,watch}=form
   
async function  handleRegister(values:registerSchemaType){
     if (!isAgreed){
      setAgreeError(true)
      return

     } ;

const res = await registerPost(values)
setAgreeError(false)
console.log("reggggggggg",res)

if(res?.ok){
  toast.add({
    title: "Account Created Successfully!",
    type: "success",
   
  });
route.push("/signIn")
}
else{
  toast.add({
   title: res?.message || "Something went wrong!",
    type: "error",

  });
}
}


const password = watch("password");

const hasMinLength = password.length >= 8;
const hasUppercase = /[A-Z]/.test(password);
const hasLowercase = /[a-z]/.test(password);
const hasNumber = /\d/.test(password);
const hasSpecialChar = /[@$!%*?&]/.test(password);

const strengthScore = [
  hasMinLength,
  hasUppercase,
  hasLowercase,
  hasNumber,
  hasSpecialChar,
].filter(Boolean).length;

const passwordStrength =
  strengthScore <= 2 ? "Weak" :
  strengthScore <= 4 ? "Medium" : "Strong";
const { isSubmitted } = form.formState;

const showStrength = password.length > 0 || isSubmitted;

  return (
    <main className="mx-auto mt-10 mb-10 w-full max-w-7xl px-4">
      <div className="grid grid-cols-1 gap-12 p-4 lg:grid-cols-2">
        <section aria-label="Welcome to FreshCart" className="flex flex-col gap-2 text-[#364153]">
          <h1 className="text-4xl font-bold leading-10">
            Welcome to <span className="text-[#16a34a]">FreshCart</span>
          </h1>

          <p className="text-xl leading-7">
            Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
          </p>

          <ul className="flex flex-col gap-6 py-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#bbf7d0] text-[#16a34a]">
                  <Icon aria-hidden="true" className="size-4.75" fill={title === "Premium Quality" ? "currentColor" : "none"} />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-lg font-semibold leading-7">{title}</span>
                  <span className="text-base leading-6 text-[#4a5565]">{description}</span>
                </span>
              </li>
            ))}
          </ul>

          <article className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <Image
                src="/signup-customer.png"
                alt="Sarah Johnson"
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <div>
                <p className="text-base leading-6">Sarah Johnson</p>
                <div aria-label="5 out of 5 stars" className="flex text-[#ffdf20]">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} aria-hidden="true" className="size-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-base italic leading-6 text-[#4a5565]">
              “FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!”
            </p>
          </article>
        </section>

        <section className="flex min-h-267.75 flex-col items-stretch overflow-hidden rounded-2xl bg-white px-6 py-10 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] lg:min-h-257.75">
          <h2 className="text-center text-[30px] font-semibold leading-9 text-[#364153]">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-base leading-6 text-[#364153]">
            Start your fresh journey with us today
          </p>

          <div className="mt-2 grid grid-cols-[1fr_1.07fr] gap-2 py-8">
            <button type="button" className="flex h-10.5 items-center justify-center gap-2 rounded-lg border border-[#d1d5dc] px-3 text-base font-semibold text-[#101828]">
              <FcGoogle aria-hidden="true" className="size-4 shrink-0" />
              <span>Google</span>
            </button>
            <button type="button" className="flex h-10.5 items-center justify-center gap-2 rounded-lg border border-[#d1d5dc] px-3 text-base font-semibold text-[#101828]">
              <FaFacebookF aria-hidden="true" className="size-4 shrink-0 text-[#1877f2]" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="mt-2 flex h-0.5 items-center gap-4 bg-[#d1d5dc]/30">
            <span className="h-full flex-1" />
            <span className="-mt-px bg-white px-1 text-base leading-6 text-[#364153]">or</span>
            <span className="h-full flex-1" />
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="mt-2 flex flex-col gap-7 py-2">
            <InputField id="name" label="Name*" placeholder="Ali" form={form} nameInput="name" />
            <InputField id="email" label="Email*" placeholder="ali@example.com" type="email" nameInput="email" form={form} />

            <div className="flex flex-col">
              <div className="flex flex-col gap-2">

                <InputField label="Password*" nameInput="password" id="password" type="password" placeholder="create a strong password" form={form} />
              </div>
{showStrength&&<>
<div className="mt-2 flex h-5 items-center gap-2">
  <div className="h-1 flex-1 rounded-md bg-[#e5e7eb]">
    <div
      className={`h-full rounded-md transition-all duration-500 ${
        strengthScore <= 2
          ? "w-1/3 bg-red-500"
          : strengthScore <= 4
          ? "w-2/3 bg-yellow-500"
          : "w-full bg-green-500"
      }`}
    />
  </div>

  <span className="min-w-12.5 text-sm leading-5 text-[#364153]">
    {passwordStrength}
  </span>
</div>
              <p className="text-xs leading-4 text-[#6a7282]">
                Must be at least 8 characters with numbers and symbols
              </p>
</>}
            </div>

            <InputField nameInput="rePassword" form={form} id="confirm-password" label="Confirm Password*" placeholder="confirm your password" type="password" />
            <InputField nameInput="phone" form={form} id="phone" label="Phone Number*" placeholder="+1 234 567 8900" type="tel" />

            <label className="flex items-start gap-2 text-base leading-6 text-[#364153]">
              <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="mt-1 size-4 shrink-0 accent-green-600" />
              <span>
                I agree to the <span className="text-[#16a34a]">Terms of Service</span> and{" "}
                <span className="text-[#16a34a]">Privacy Policy</span> *
              </span>
            </label>
{agreeError && (
  <p className="text-sm text-red-500">
    You must agree to the Terms of Service and Privacy Policy.
  </p>
)}
            <button type="submit" className="flex cursor-pointer h-10 w-full items-center justify-center gap-2 rounded-md bg-[#16a34a] text-sm font-semibold text-white hover:bg-green-700 transition-all duration-300">
              <UserRoundPlus aria-hidden="true" className="size-4" />
              <span>Create My Account</span>
            </button>
          </form>

          <p className="mt-2 border-t border-gray-100 pt-10 text-center text-sm leading-6 text-[#364153]">
            Already have an account? <Link href="/signIn" className="text-[#16a34a] hover:text-green-800 transition-all duration-300">Sign In</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
