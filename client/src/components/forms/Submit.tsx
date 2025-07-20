import { LoaderCircle } from "lucide-react";

export default function Submit({
  label,
  className,
  isLoading = false,
}: {
  label: string;
  className?: string;
  isLoading?: boolean;
}) {
  return (
    <button
      type="submit"
      className={`${className} w-full ${!isLoading ? "bg-primary-fg  hover:bg-primary-fg/75" : "bg-gray-500"}  text-white py-2 rounded-xl transition duration-200 flex gap-[1rem] justify-center items-center`}
    >
      {isLoading && (
        <span className="animate-spin duration-200 flex items-center justify-center origin-center">
          <LoaderCircle />
        </span>
      )}
      {!isLoading ? label : "Loading"}
    </button>
  );
}
