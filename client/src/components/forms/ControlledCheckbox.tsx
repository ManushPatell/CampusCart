import {
  Control,
  Controller,
  FieldErrors,
  Path,
  RegisterOptions,
  type FieldValues,
} from "react-hook-form";

interface ControlledCheckboxProps<T extends FieldValues> {
  control: Control<T, unknown>;
  name: Path<T>;
  label?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  inputClassName?: string;
  errors: FieldErrors<T>;
}

export default function ControlledCheckbox<T extends FieldValues>({
  name,
  control,
  rules,
  errors,
  inputClassName,
  label,
}: ControlledCheckboxProps<T>) {
  const hasError = errors[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <span>
          <label className="flex items-center gap-[.5rem]">
            <input
              onChange={onChange}
              onBlur={onBlur}
              checked={value}
              type="checkbox"
              className={`transition-all duration-200  accent-accent  ${hasError ? "focus:ring-red-400 border-red-400 border-2" : "border-gray-300 focus:ring-primary-fg/50 border-2 focus:border-primary-fg/50"}  rounded-xl focus:outline-none focus:ring-2  ${inputClassName}`}
            />
            <span className="inline">{label}</span>
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
