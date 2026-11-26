
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import StepProgress from "../_components/StepProgress/StepProgress";
import PasswordInput from "../_components/PasswordInput/PasswordInput";
import RecoveryArtwork from "../_components/RecoveryArtwork/RecoveryArtwork";
import { useRouter } from "next/navigation";
import {
  forgotPasswordSchema,
  forgotPasswordSchemaType,
  resetPasswordSchema,
  resetPasswordSchemaType,
  verifyResetCodeSchema,
  verifyResetCodeSchemaType,
} from "@/Schema/password/password.schema";

import {
  ForgotPasswordPost,
  resetPassword,
  verifyResetCode,
} from "@/Actions/password.actions";
import { toast } from "@/components/ui/toast";


type ResetStep = "forgetPass" | "verifycode" | "reset";

export default function ForgetPasswordPage() {
  const [currentState, setCurrentState] =
    useState<ResetStep>("forgetPass");

  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const router=useRouter()

  // Forgot Password Form
  const formOfForgotPass = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Verify Code Form
  const formOfVerifyCode = useForm<verifyResetCodeSchemaType>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  // Reset Password Form
  const formOfResetPssword = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  // Step 1: Forgot Password
  async function handleForgetPassword(
    values: forgotPasswordSchemaType
  ) {
    const res = await ForgotPasswordPost(values);
console.log("resOfForgot",res)
    if (res?.ok) {
      setEmail(values.email);

      formOfResetPssword.setValue("email", values.email);

      setCurrentState("verifycode");
             toast.add({
        title: res.message,
        type: "success",
      });
    } else {
      toast.add({
        title: res?.message || "Something went wrong",
        type: "error",
      });
    }
  }

  // Step 2: Verify Reset Code
  async function handleVerifyCode(
    values: verifyResetCodeSchemaType
  ) {
    const res = await verifyResetCode(values);

    if (res?.ok) {
      setCurrentState("reset");
      console.log("resOfVerify",res)
            toast.add({
        title: "Email verified successfully !",
        type: "success",
      });
    } else {
    toast.add({
        title: res?.message || "Something went wrong",
        type: "error",
      });
    }
  }

  // Step 3: Reset Password
  async function handleResetPassword(
    values: resetPasswordSchemaType
  ) {
    if (values.newPassword !== confirmPassword) {
        toast.add({
        title: "Passwords do not match!",
        type: "error",
      });
      return;
    }

    const res = await resetPassword(values);

    if (res?.ok) {
        console.log("resOfReset",res)
            toast.add({
        title: "Password Reseted successfully !",
        type: "success",
      });

      setCurrentState("forgetPass");
      setEmail("");
      setConfirmPassword("");

      formOfForgotPass.reset();
      formOfVerifyCode.reset();
      formOfResetPssword.reset();
      router.push("/signIn")
    } else {
      toast.add({
        title: res?.message || "Something went wrong",
        type: "error",
      });
    }
  }

  let title = "Forgot Password?";
  let subtitle = "No worries, we'll send you a reset code";

  if (currentState === "verifycode") {
    title = "Check Your Email";
    subtitle = `Enter the 6-digit code sent to ${email}`;
  } else if (currentState === "reset") {
    title = "Create New Password";
    subtitle =
      "Your new password must be different from previous passwords";
  }

  return (
    <main className="flex-1 bg-white text-[#101828]">
      <div className="mx-auto grid min-h-165 w-full max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-2 xl:px-0">

        <section className="mx-auto w-full max-w-154">
          <RecoveryArtwork />

          <h2 className="mt-5 text-center text-3xl font-bold">
            Reset Your Password
          </h2>

          <p className="mt-3 text-center text-sm leading-6 text-[#4a5565]">
            Don't worry, it happens to the best of us.
            We'll help you get back into your account in no time.
          </p>
        </section>

        <section className="mx-auto w-full max-w-154 rounded-2xl bg-white px-7 py-8 shadow-xl sm:px-10 sm:py-10">

          <div className="text-center">
            <p className="text-2xl font-bold">
              <span className="text-[#16a34a]">Fresh</span>
              Cart
            </p>

            <h1 className="mt-3 text-xl font-bold">{title}</h1>

            <p className="mt-1 text-sm text-[#6a7282]">
              {subtitle}
            </p>
          </div>

          <div className="mb-8 mt-8">
            <StepProgress current={currentState} />
          </div>

          <form
            onSubmit={
              currentState === "forgetPass"
                ? formOfForgotPass.handleSubmit(handleForgetPassword)
                : currentState === "verifycode"
                ? formOfVerifyCode.handleSubmit(handleVerifyCode)
                : formOfResetPssword.handleSubmit(handleResetPassword)
            }
            className="grid gap-5"
          >
            {/* Forgot Password */}
            {currentState === "forgetPass" && (
              <div className="grid gap-2">
                <label className="text-xs font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...formOfForgotPass.register("email")}
                  className="h-13 rounded-lg border border-[#d1d5dc] px-4 outline-none focus:border-[#16a34a]"
                />

                {formOfForgotPass.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {formOfForgotPass.formState.errors.email.message}
                  </p>
                )}
              </div>
            )}

            {/* Verify Code */}
            {currentState === "verifycode" && (
              <div className="grid gap-2">
                <label className="text-xs font-medium">
                  Verification Code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="• • • • • •"
                  {...formOfVerifyCode.register("resetCode")}
                  onChange={(e) =>
                    formOfVerifyCode.setValue(
                      "resetCode",
                      e.target.value.replace(/\D/g, "").slice(0, 6),
                      { shouldValidate: true }
                    )
                  }
                  className="h-15 rounded-lg border border-[#d1d5dc] text-center text-lg tracking-[0.55em] outline-none focus:border-[#16a34a]"
                />

                {formOfVerifyCode.formState.errors.resetCode && (
                  <p className="text-sm text-red-500">
                    {formOfVerifyCode.formState.errors.resetCode.message}
                  </p>
                )}

                <p className="text-center text-xs text-[#6a7282]">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    className="font-semibold text-[#16a34a]"
                  >
                    Resend Code
                  </button>
                </p>
              </div>
            )}

            {/* Reset Password */}
            {currentState === "reset" && (
              <>
                <div className="grid gap-2">
                  <label className="text-xs font-medium">
                    New Password
                  </label>

                  <PasswordInput
                    id="new-password"
                    placeholder="Enter new password"
                    value={formOfResetPssword.watch("newPassword")}
                    onChange={(value) =>
                      formOfResetPssword.setValue(
                        "newPassword",
                        value,
                        { shouldValidate: true }
                      )
                    }
                  />

                  {formOfResetPssword.formState.errors.newPassword && (
                    <p className="text-sm text-red-500">
                      {formOfResetPssword.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-medium">
                    Confirm Password
                  </label>

                  <PasswordInput
                    id="confirm-password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={
                formOfForgotPass.formState.isSubmitting ||
                formOfVerifyCode.formState.isSubmitting ||
                formOfResetPssword.formState.isSubmitting
              }
              className="min-h-13 cursor-pointer  rounded-lg bg-[#16a34a] px-5 text-sm font-semibold text-white transition hover:bg-[#15803d] disabled:opacity-60"
            >
              {currentState === "forgetPass"
                ? formOfForgotPass.formState.isSubmitting
                  ? "Sending..."
                  : "Send Reset Code"
                : currentState === "verifycode"
                ? formOfVerifyCode.formState.isSubmitting
                  ? "Verifying..."
                  : "Verify Code"
                : formOfResetPssword.formState.isSubmitting
                ? "Resetting..."
                : "Reset Password"}
            </button>

            {currentState === "forgetPass" && (
              <div className="text-center">
                <Link
                  href="/signIn"
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#16a34a]"
                >
                  <ArrowLeft size={14} />
                  Back to Sign In
                </Link>
              </div>
            )}

            {currentState === "verifycode" && (
              <button
                type="button"
                onClick={() => setCurrentState("forgetPass")}
                className="text-xs text-[#6a7282] hover:text-[#16a34a]"
              >
                Change email address
              </button>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
