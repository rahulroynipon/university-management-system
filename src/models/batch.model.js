import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Batch name is required"],
      unique: true,
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Batch year is required"],
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department ID is required"],
    },
    number: {
      type: Number,
      required: [true, "Batch number is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.models.Batch || mongoose.model("Batch", batchSchema);
export default Batch;
