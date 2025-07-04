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
  type?: "password" | "text" | "number" | "email";
  errors: FieldErrors<T>;
}

export default function ControlledInput<T extends FieldValues>({
  name,
  control,
  rules,
  errors,
  inputClassName,
  type,
  placeholder,
  label,
}: ControlledInputProps<T>) {
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
            <input
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              type={type}
              className={`w-full px-4 transition-all duration-200 py-2 placeholder-gray-400 border ${hasError ? "focus:ring-red-400 border-red-400 border-2" : "border-gray-300 focus:ring-blue-400"}  rounded-xl focus:outline-none focus:ring-2  ${inputClassName}`}
              placeholder={placeholder}
            />
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
