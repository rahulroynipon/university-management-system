import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";
import Department from "./department.model.js";

const facultySchema = new Schema(
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
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    department: {
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

const Faculty =
  mongoose.models.Faculty || User.discriminator("Faculty", facultySchema);

export default Faculty;
