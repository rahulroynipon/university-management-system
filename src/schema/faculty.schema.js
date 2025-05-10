import * as Yup from "yup";

export const facultySchema = Yup.object().shape({
  name: Yup.string().required("Faculty name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  department: Yup.string().required("Department is required"),
  role: Yup.string().default("faculty"),
  description: Yup.string().required("Description is required"),
  rank: Yup.string()
    .oneOf(
      ["lecturer", "associate professor", "professor", "head of department"],
      "Invalid rank"
    )
    .required("Rank is required"),
});
