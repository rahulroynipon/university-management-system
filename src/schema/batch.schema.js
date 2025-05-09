import * as Yup from "yup";

export const batchSchema = Yup.object().shape({
  name: Yup.string().required("Batch name is required"),
  department: Yup.string().required("Department is required"),
});
