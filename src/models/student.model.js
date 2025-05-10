import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";
import Department from "./department.model.js";

const studentSchema = new Schema(
  {
    departmentId: {
      type: Schema.Types.ObjectId,
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
