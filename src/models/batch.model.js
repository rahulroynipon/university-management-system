import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Batch name is required"],
      trim: true,
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department ID is required"],
    },
    number: {
      type: Number,
    },
    public: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

batchSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const count = await mongoose.models.Batch.countDocuments({
    department: this.department,
  });

  this.number = count + 1;

  next();
});

const Batch = mongoose.models.Batch || mongoose.model("Batch", batchSchema);
export default Batch;
