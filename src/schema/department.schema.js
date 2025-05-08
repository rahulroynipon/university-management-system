import * as Yup from "yup";

export const departmentSchema = Yup.object().shape({
  name: Yup.string()
    .required("Department name is required")
    .min(2, "Name must be at least 2 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),

  icon: Yup.mixed()
    .required("Icon is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return value && value.type?.startsWith("image/");
    })
    .test("fileSize", "File must be less than 1MB", (value) => {
      return value && value.size <= 1024 * 1024;
    }),
});
