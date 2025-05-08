import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
    },
    icon: {
      url: String,
      publicId: String,
    },
    description: {
      type: String,
      required: [true, "Department description is required"],
    },
  },
  {
    timestamps: true,
  }
);

batchSchema.pre("validate", function (next) {
  if (!this._id || this.isModified("name")) {
    this._id = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Department =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default Department;
