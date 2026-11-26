"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Headphones,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Star,
  Truck,
  UsersRound,
    Loader2,
} from "lucide-react";
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import InputField from "@/app/_components/InputField/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/Schema/auth/login.schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast"


const highlights = [
  { label: "Free Delivery", icon: Truck },
  { label: "Secure Payment", icon: ShieldCheck },
  { label: "24/7 Support", icon: Headphones },
];

const trustPoints = [
  { label: "SSL Secured", icon: LockKeyhole },
  { label: "50K+ Users", icon: UsersRound },
  { label: "4.9 Rating", icon: Star },
];

export default function SignInPage() {
const route=useRouter()

const form=useForm<loginSchemaType>({
    defaultValues:{
    email:"",
    password:"",
    },
    resolver:zodResolver(loginSchema),
mode: "onChange",
})

const {handleSubmit,formState: { isSubmitting }}=form
   
async function  handleLogin(values:loginSchemaType){

const res=await signIn("credentials",{...values,redirect:false})
console.log("looooogin",res)
if(res?.ok){
    toast.add({
    title: "Login Successfully!",
    type: "success",
   
  });
  route.push("/")
}
else{
  toast.add({
   title: res?.error|| "Something went wrong!",
    type: "error",
  });
}
}


  return (
    <main data-page="sign-in" className="mx-auto w-full max-w-7xl px-4 py-16 text-[#1e2939] sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <section aria-labelledby="login-promo-title" className="hidden flex-col gap-6 text-center lg:flex">
          <div className="relative h-72 overflow-hidden rounded-2xl bg-white shadow-lg sm:h-80 lg:h-96">
            <Image
              src="/login-grocery-cart.png"
              alt="Shopping cart filled with fresh vegetables"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h1 id="login-promo-title" className="text-2xl font-bold leading-8 sm:text-3xl sm:leading-9">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h1>
            <p className="text-base leading-7 text-[#4a5565] sm:text-lg">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#6a7282]">
              {highlights.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-4 text-[#16a34a]" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="welcome-title" className="rounded-2xl bg-white px-8 py-8 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] sm:px-10 lg:min-h-213.25 lg:px-12 lg:py-12">
          <header className="text-center">
            <p className="text-3xl font-bold leading-9">
              <span className="text-[#16a34a]">Fresh</span>Cart
            </p>
            <h2 id="welcome-title" className="mt-4 text-2xl font-semibold leading-8">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#4a5565]">
              Sign in to continue your fresh shopping experience
            </p>
          </header>

          <div className="mt-8 flex flex-col gap-3">
            <button type="button" className="flex h-13 items-center justify-center gap-3 rounded-lg border border-[#d1d5dc] text-sm text-[#364153] transition-colors hover:bg-gray-50">
              <FcGoogle aria-hidden="true" className="size-4.5" />
              Continue with Google
            </button>
            <button type="button" className="flex h-13 items-center justify-center gap-3 rounded-lg border border-[#d1d5dc] text-sm text-[#364153] transition-colors hover:bg-gray-50">
              <FaFacebookF aria-hidden="true" className="size-4.5 text-[#1877f2]" />
              Continue with Facebook
            </button>
          </div>

          <div className="relative my-6 flex h-5 items-center justify-center">
            <span className="absolute inset-x-0 h-px bg-[#e5e7eb]" />
            <span className="relative bg-white px-4 text-[10px] font-medium uppercase leading-5 text-[#6a7282]">
              Or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-6">
            <InputField
              id="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              form={form}
              nameInput="email"
              autoComplete="email"
              fieldClassName="flex flex-col"
              labelClassName="text-sm font-medium leading-5 text-[#1e2939]"
              inputWrapperClassName="mt-2"
              inputClassName="h-13 w-full rounded-lg border border-[#d1d5dc] bg-white px-4 text-sm text-[#364153] outline-none placeholder:text-[#99a1af] focus-visible:border-[#16a34a]"
              leadingIcon={<Mail className="size-4" />}
            />

            <InputField
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              form={form}
              nameInput="password"
              autoComplete="current-password"
              fieldClassName="flex flex-col"
              labelClassName="text-sm font-medium leading-5 text-[#1e2939]"
              inputWrapperClassName="mt-2"
              labelAction={<Link href="/forgetPassword" className="text-sm font-medium leading-5 text-[#16a34a] hover:text-green-700">Forgot Password?</Link>}
              inputClassName="h-13 w-full rounded-lg border border-[#d1d5dc] bg-white px-4 text-sm text-[#364153] outline-none placeholder:text-[#99a1af] focus-visible:border-[#16a34a]"
              leadingIcon={<LockKeyhole className="size-4" />}
            />

            <label className="flex items-center gap-3 text-sm leading-5 text-[#364153]">
              <input type="checkbox" className="size-4 rounded border-[#d1d5dc] accent-[#16a34a]" />
              Keep me signed in
            </label>

<button
  type="submit"
  disabled={isSubmitting}
  className="flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#16a34a] text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {isSubmitting ? (
    <>
      <Loader2 aria-hidden="true" className="size-4 animate-spin" />
      Signing in...
    </>
  ) : (
    "Sign In"
  )}
</button>
          </form>

          <div className="mt-8 border-t border-[#f3f4f6] pt-6 text-center text-sm leading-6 text-[#4a5565]">
            New to FreshCart?{" "}
            <Link href="/signUp" className="font-semibold text-[#16a34a] hover:text-green-700">
              Create an account
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] leading-4 text-[#6a7282]">
            {trustPoints.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon aria-hidden="true" className={`size-3 ${label === "4.9 Rating" ? "fill-current" : ""}`} />
                {label}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
