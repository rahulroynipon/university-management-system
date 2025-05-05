import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Department description is required"],
    },
    head: {
      type: String,
      required: [true, "Department head is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Department =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default Department;
