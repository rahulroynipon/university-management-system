import * as Yup from "yup";

export const courseSchema = Yup.object().shape({
  name: Yup.string().required("Course name is required"),
  code: Yup.string().required("Course code is required"),
  credits: Yup.number().required("Course credits are required"),
  department: Yup.string().required("Department is required"),
});
