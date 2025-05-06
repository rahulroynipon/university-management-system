import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: [true, "Course credits are required"],
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department ID is required"],
    },
    description: {
      type: String,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
