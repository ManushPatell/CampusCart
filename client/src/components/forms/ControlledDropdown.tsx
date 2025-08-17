import {
  Control,
  Controller,
  FieldErrors,
  Path,
  RegisterOptions,
  type FieldValues,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ControlledInputProps<T extends FieldValues> {
  control: Control<T, unknown>;
  name: Path<T>;
  optionsLabel: string;
  options: string[] | number[];
  inputClassName?: string;
  placeholder?: string;
  errors: FieldErrors<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function ControlledInput<T extends FieldValues>({
  name,
  control,
  options,
  placeholder,
  optionsLabel,
  rules,
  errors,
}: ControlledInputProps<T>) {
  const hasError = errors[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <span>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger
              className={`w-[200px] px-4 transition-all duration-200 py-2 text-[1rem] ${value === placeholder ? "text-gray-400" : "text-primary-fg"} ${hasError ? "focus:ring-red-400 border-red-400 border-2" : "border-gray-300 focus:ring-primary-fg/50 border-2 focus:border-primary-fg/50"} border-2 rounded-xl focus:outline-none focus:ring-2 `}
              onBlur={onBlur}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{optionsLabel}</SelectLabel>
                {options.map((option) => (
                  <SelectItem value={option.toString()} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
