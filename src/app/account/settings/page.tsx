
"use client";

import {
  LockKeyhole,
  Save,
  UserRound,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordFieldAccount from "@/app/_components/PasswordFieldAccount/PasswordFieldAccount";

import {
  updateData,
  updatePassword,
  type updateDataType,
  type updatePasswordType,
} from "@/Schema/settings/setting.schema";

import {
  updateDataForLoggedUser,
  updatePasswordForLoggedUser,
} from "@/Actions/setting.actions";

import { toast } from "@/components/ui/toast";

export default function SettingsPage() {
  // Profile Form
  const {
    register: registerData,
    handleSubmit: handleDataSubmit,
    formState: { errors: dataErrors, isSubmitting: dataSubmitting },
  } = useForm<updateDataType>({
    resolver: zodResolver(updateData),
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: {
      errors: passwordErrors,
      isSubmitting: passwordSubmitting,
    },
  } = useForm<updatePasswordType>({
    resolver: zodResolver(updatePassword),
  });

  // Update Profile
  async function handleUpdateData(values: updateDataType) {
    try {
      const response = await updateDataForLoggedUser(values);
console.log("updateprofile",response)
      if (!response.ok) {
        throw new Error(response.message);
      }

      toast.add({
        title: response.message || "Profile Updated Successfully!",
        type: "success",
      });
    } catch (err) {
      toast.add({
        title:
          err instanceof Error
            ? err.message
            : "Failed to update profile",
        type: "error",
      });
    }
  }

  // Update Password
  async function handleUpdatePassword(values: updatePasswordType) {
    try {
      const response = await updatePasswordForLoggedUser(values);
console.log("updatePass",response)
      if (!response.ok) {
        throw new Error(response.message);
      }

      toast.add({
        title: response.message || "Password Changed Successfully!",
        type: "success",
      });

      resetPasswordForm();
    } catch (err) {
      toast.add({
        title:
          err instanceof Error
            ? err.message
            : "Failed to change password",
        type: "error",
      });
    }
  }

  return (
    <section aria-labelledby="settings-title" className="min-w-0">
      <div className="mb-5">
        <h2 id="settings-title" className="text-lg font-bold">
          Account Settings
        </h2>
        <p className="mt-1 text-xs text-[#6a7282]">
          Update your profile information and change your password
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
        <form
          onSubmit={handleDataSubmit(handleUpdateData)}
          className="p-6 sm:p-8"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-[#dcfce7] text-[#16a34a]">
              <UserRound className="size-5 fill-[#16a34a]" />
            </span>

            <div>
              <h3 className="text-sm font-semibold">
                Profile Information
              </h3>
              <p className="mt-0.5 text-xs text-[#6a7282]">
                Update your personal details
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2 text-xs font-medium text-[#364153]">
              Full Name
              <input
                {...registerData("name")}
                placeholder="Enter your name"
                autoComplete="name"
                className="h-12 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm font-normal text-[#364153] outline-none placeholder:text-[#99a1af] transition focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10"
              />
              {dataErrors.name && (
                <span className="text-[11px] font-normal text-red-500">
                  {dataErrors.name.message}
                </span>
              )}
            </label>

            <label className="grid gap-2 text-xs font-medium text-[#364153]">
              Email Address
              <input
                {...registerData("email")}
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="h-12 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm font-normal text-[#364153] outline-none placeholder:text-[#99a1af] transition focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10"
              />
              {dataErrors.email && (
                <span className="text-[11px] font-normal text-red-500">
                  {dataErrors.email.message}
                </span>
              )}
            </label>

            <label className="grid gap-2 text-xs font-medium text-[#364153]">
              Phone Number
              <input
                {...registerData("phone")}
                type="tel"
                placeholder="01xxxxxxxxx"
                autoComplete="tel"
                className="h-12 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm font-normal text-[#364153] outline-none placeholder:text-[#99a1af] transition focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10"
              />
              {dataErrors.phone && (
                <span className="text-[11px] font-normal text-red-500">
                  {dataErrors.phone.message}
                </span>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={dataSubmitting}
            className="mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-5 text-xs font-semibold text-white shadow-md shadow-green-700/15 transition hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="size-3.5" />
            {dataSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="border-t border-[#f3f4f6] bg-[#f9fafb] px-6 py-6 sm:px-8">
          <h3 className="text-xs font-semibold">
            Account Information
          </h3>

          <div className="mt-3 grid gap-2 text-xs text-[#6a7282]">
            <div className="flex justify-between gap-3">
              <span>User ID</span>
              <span className="text-[#99a1af]">—</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span>Role</span>
              <span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-medium text-[#008236]">
                User
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-[#fef3c7] text-[#f59e0b]">
            <LockKeyhole className="size-5 fill-[#f59e0b]" />
          </span>

          <div>
            <h3 className="text-sm font-semibold">
              Change Password
            </h3>
            <p className="mt-0.5 text-xs text-[#6a7282]">
              Update your account password
            </p>
          </div>
        </div>

        <form
          onSubmit={handlePasswordSubmit(handleUpdatePassword)}
          className="grid gap-4"
        >
          <PasswordFieldAccount
            {...registerPassword("currentPassword")}
            label="Current Password"
            placeholder="Enter your current password"
            error={passwordErrors.currentPassword?.message}
          />

          <PasswordFieldAccount
            {...registerPassword("password")}
            label="New Password"
            placeholder="Enter your new password"
            helper="Must be at least 8 characters, with uppercase, lowercase, number and special character"
            error={passwordErrors.password?.message}
          />

          <PasswordFieldAccount
            {...registerPassword("rePassword")}
            label="Confirm New Password"
            placeholder="Confirm your new password"
            error={passwordErrors.rePassword?.message}
          />

          <button
            type="submit"
            disabled={passwordSubmitting}
            className="mt-1 inline-flex min-h-12 w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#f97300] px-5 text-xs font-semibold text-white shadow-md shadow-orange-700/15 transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LockKeyhole className="size-3.5" />
            {passwordSubmitting ? "Updating..." : "Change Password"}
          </button>
        </form>
      </section>
    </section>
  );
}
