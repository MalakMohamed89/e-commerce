
"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

type Props = {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">

      <LockKeyhole className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#99a1af]" />

      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="new-password"
        required
        className="h-13 w-full rounded-lg border border-[#d1d5dc] bg-white pl-12 pr-12 text-sm text-[#364153] outline-none placeholder:text-[#99a1af] transition focus:border-2 focus:border-[#16a34a]"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-[#99a1af] hover:text-[#4a5565]"
      >
        {showPassword ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </button>

    </div>
  );
}
