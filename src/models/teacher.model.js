import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const teacherSchema = new Schema(
  {
    rank: {
      type: String,
      enum: [
        "lecturer",
        "associate professor",
        "professor",
        "head of department",
      ],
      default: "lecturer",
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department ID is required"],
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
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
