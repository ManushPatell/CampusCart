import {
  Control,
  Controller,
  FieldErrors,
  Path,
  RegisterOptions,
  type FieldValues,
} from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns/format";

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

export default function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  rules,
  errors,
  label,
  inputClassName,
}: ControlledInputProps<T>) {
  const hasError = errors[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!value}
                className={`data-[empty=true]:text-muted-foreground w-full justify-start rounded-xl text-left text-[1rem] px-4 transition-all duration-200 py-[1.25rem] placeholder-gray-400  ${hasError ? "focus:ring-red-400 border-red-400 border-2" : "border-gray-300 focus:ring-primary-fg/50 border-2 focus:border-primary-fg/50"}  focus:outline-none focus:ring-2  ${inputClassName}`}
                onBlur={onBlur}
              >
                <CalendarIcon
                  className={`${value ? "text-primary-fg" : "text-gray-400"}`}
                />
                {value ? (
                  format(value, "PPP")
                ) : (
                  <span
                    className={`${value ? "text-primary-fg" : "text-gray-400"}`}
                  >
                    {label ?? "Pick a date"}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={value} onSelect={onChange} />
            </PopoverContent>
          </Popover>
          {hasError && (
            <p className="text-red-500 font-light text-sm mt-[.3rem]">
              {String(errors[name]!.message)}
            </p>
          )}
        </>
      )}
    />
  );
}
