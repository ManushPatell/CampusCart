import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  RegisterOptions,
  type FieldValues,
} from "react-hook-form";

interface ControlledInputProps<T extends FieldValues> {
  control: Control<T, unknown>;
  name: Path<T>;
  label?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  inputClassName?: string;
  placeholder?: string;
  type?: "password" | "text" | "number" | "email" | "tel";
  errors: FieldErrors<T>;
  hideToggle?: boolean;
}

export default function ControlledInput<T extends FieldValues>({
  name,
  control,
  rules,
  errors,
  inputClassName,
  type = "text",
  placeholder,
  label,
  hideToggle = false,
}: ControlledInputProps<T>) {
  const [hideText, setHideText] = useState<boolean>(true);

  const hasError = errors[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <span>
          <label>
            {label}
            <span className="relative">
              <input
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                type={hideText && hideToggle ? "password" : type}
                className={`w-full px-4 transition-all duration-200 py-2 placeholder-gray-400 border ${hasError ? "focus:ring-red-400 border-red-400 border-2" : "border-gray-300 focus:ring-blue-400"}  rounded-xl focus:outline-none focus:ring-2  ${inputClassName}`}
                placeholder={placeholder}
              />
              {hideToggle && (
                <button
                  className="absolute -translate-x-3/2 hover:text-gray-500 top-1/2 -translate-y-1/2 "
                  onClick={() => setHideText((prev) => !prev)}
                >
                  {hideText ? "Show" : "Hide"}
                </button>
              )}
            </span>
          </label>
          {hasError && (
            <p className="text-red-500 font-light text-sm mt-[.3rem]">
              {String(errors[name]!.message)}
            </p>
          )}
        </span>
      )}
    />
  );
}
