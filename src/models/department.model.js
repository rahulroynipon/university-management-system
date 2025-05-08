import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const departmentSchema = new Schema(
  {
    slug: {
      type: String,
      unique: true,
    },
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

departmentSchema.pre("validate", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Department =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default Department;
