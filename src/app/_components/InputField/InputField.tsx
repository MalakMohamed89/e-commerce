"use client";

import { useState, type HTMLInputTypeAttribute, type ReactNode } from "react";
import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type InputFieldProps<TValues extends FieldValues> = {
  id: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  nameInput: FieldPath<TValues>;
  form: UseFormReturn<TValues>;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  labelAction?: ReactNode;
  fieldClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  autoComplete?: string;
  multiline?: boolean;
};

export default function InputField<TValues extends FieldValues>({
  id,
  label,
  placeholder,
  type = "text",
  nameInput,
  form,
  leadingIcon,
  trailingIcon,
  labelAction,
  fieldClassName,
  labelClassName,
  inputWrapperClassName,
  inputClassName,
  autoComplete = "off",
  multiline = false,
}: InputFieldProps<TValues>) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <Field className={fieldClassName}>
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor={id} className={labelClassName}>{label}</FieldLabel>
        {labelAction}
      </div>

      <div className={inputWrapperClassName}>
        <Controller
          name={nameInput}
          control={form.control}
          render={({ field, fieldState }) => (
            <>
           
              <div className="relative">
                {leadingIcon && (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-4 z-10 text-[#99a1af] ${
                      multiline ? "top-4" : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    {leadingIcon}
                  </span>
                )}

                {multiline ? (
                  <textarea
                    {...field}
                    id={id}
                    aria-invalid={fieldState.invalid}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    rows={3}
                    className={`min-h-26 w-full resize-y rounded-md border bg-white px-3 py-3 text-base leading-6 text-[#364153] outline-none placeholder:text-[#364153]/50 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${inputClassName ?? ""} ${leadingIcon ? "pl-12" : ""} ${
                      fieldState.invalid
                        ? "border-2 border-red-500 focus-visible:border-red-500"
                        : "focus-visible:border-2 focus-visible:border-green-500"
                    }`}
                  />
                ) : (
                  <Input
                    {...field}
                    type={inputType}
                    id={id}
                    aria-invalid={fieldState.invalid}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`h-10.5 w-full rounded-md border bg-white px-3 text-base leading-6 text-[#364153] outline-none placeholder:text-[#364153]/50 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${inputClassName ?? ""} ${leadingIcon ? "pl-12" : ""} ${
                      trailingIcon || type === "password" ? "pr-12" : ""
                    } ${
                      fieldState.invalid
                        ? "border-2 border-red-500 focus-visible:border-red-500"
                        : "focus-visible:border-2 focus-visible:border-green-500"
                    }`}
                  />
                )}

                {type === "password" ? (
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded p-1 text-[#99a1af] hover:text-[#4a5565] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                      <Eye aria-hidden="true" className="size-4" />
                    )}
                  </button>
                ) : trailingIcon ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-[#99a1af]"
                  >
                    {trailingIcon}
                  </span>
                ) : null}
              </div>

             
              {fieldState.invalid && (
                <FieldError className="mt-1 text-red-600" errors={[fieldState.error]} />
              )}
            </>
          )}
        />
      </div>
    </Field>
  );
}