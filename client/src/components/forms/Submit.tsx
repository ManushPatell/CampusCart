export default function Submit({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={`${className} w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200`}
    >
      {label}
    </button>
  );
}
