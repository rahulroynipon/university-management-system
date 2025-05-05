import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const teacherSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true,
    },
    departmentId: {
      type: String,
      ref: "Department",
      required: [true, "Department ID is required"],
    },
    courses: [
      {
        type: String,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Teacher =
  mongoose.models.Teacher || User.discriminator("Teacher", teacherSchema);

export default Teacher;
