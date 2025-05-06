import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(
      ["admin", "student", "teacher"],
      "Role must be one of 'admin', 'student', or 'teacher'"
    )
    .default("student"),
});
