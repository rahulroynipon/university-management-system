import { Field, ErrorMessage } from "formik";
import { cn } from "@/lib/cn";

export default function DropdownField({
  label,
  name,
  options = [],
  placeholder = "Select an option",
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
        as="select"
        name={name}
        id={name}
        className={cn(
          "p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-300 w-full",
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-700 text-sm mt-1.5"
      />
    </div>
  );
}
