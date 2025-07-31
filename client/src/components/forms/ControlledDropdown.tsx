import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, Path, type FieldValues } from "react-hook-form";

interface ControlledInputProps<T extends FieldValues> {
  control: Control<T, unknown>;
  name: Path<T>;
  optionsLabel: string;
  options: readonly string[] | string[];
  inputClassName?: string;
  placeholder?: string;
}

export default function ControlledInput<T extends FieldValues>({
  name,
  control,
  options,
  placeholder,
  optionsLabel,
}: ControlledInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            className={`w-[200px] px-4 transition-all duration-200 py-2 text-[1rem] ${value === placeholder ? "text-gray-400" : "text-primary-fg"} border-gray-300 focus:ring-primary-fg/50 border-2 focus:border-primary-fg/50 rounded-xl focus:outline-none focus:ring-2 `}
            onBlur={onBlur}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{optionsLabel}</SelectLabel>
              {options.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
