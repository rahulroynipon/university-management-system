import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
  {
    _id: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Department icon is required"],
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
    _id: true,
    timestamps: true,
  }
);

const Department =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default Department;
