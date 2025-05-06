import { cn } from "@/lib/cn";

export default function Button({
  type = "button",
  children,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-red-700  text-white font-semibold px-4 py-2 rounded-md shadow-sm transition duration-200 hover:bg-red-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
