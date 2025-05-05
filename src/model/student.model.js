import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const studentSchema = new Schema(
  {
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },
    departmentId: {
      type: String,
      ref: "Department",
      required: [true, "Department ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student || User.discriminator("Student", studentSchema);

export default Student;
