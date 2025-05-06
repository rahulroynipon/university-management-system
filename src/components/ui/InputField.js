import { cn } from "@/lib/cn";
import { Field, ErrorMessage } from "formik";

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  className,
}) {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-medium mb-1 text-sm text-gray-700"
        >
          {label}
        </label>
      )}

      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        id={name}
        className={cn(
          "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 w-full",
          className
        )}
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-700 text-sm mt-1.5"
      />
    </div>
  );
}
