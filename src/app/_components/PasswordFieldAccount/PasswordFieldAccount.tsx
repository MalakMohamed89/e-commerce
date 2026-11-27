
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function PasswordFieldAccount({
  label,
  error,
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="grid gap-2 text-xs font-medium text-[#364153]">
      {label}

      <span className="relative block">
        <input
          {...props}
          type={visible ? "text" : "password"}
          className="h-12 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 pr-11 text-sm font-normal text-[#364153] outline-none placeholder:text-[#99a1af] transition focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10"
        />

        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((value) => !value)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 text-[#99a1af] transition hover:text-[#4a5565]"
        >
          {visible ? (
            <EyeOff className="size-4 cursor-pointer" />
          ) : (
            <Eye className="size-4 cursor-pointer" />
          )}
        </button>
      </span>



      {error && (
        <span className="text-[11px] font-normal text-red-500">
          {error}
        </span>
      )}
    </label>
  );
}
