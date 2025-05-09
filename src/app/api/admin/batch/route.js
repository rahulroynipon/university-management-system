import { AsyncHandler, ApiError, ApiResponse } from "@/lib/apiHelpers";
import Batch from "@/models/batch.model";

export const POST = AsyncHandler(async (req) => {
  const { name, department } = await req.json();

  const errors = [];
  if (!name) errors.push({ field: "name", message: "Name is required" });
  if (!department)
    errors.push({ field: "department", message: "Department is required" });

  if (errors.length) {
    return ApiError(400, "All fields are required", errors);
  }

  const batch = await Batch.findOne({ name, department });
  if (batch) {
    return ApiError(400, "Batch already exists");
  }

  const newBatch = new Batch({ name, department });
  await newBatch.save();

  await newBatch.populate("department", "name _id");

  return ApiResponse(201, newBatch, "Batch created successfully");
});

export const GET = AsyncHandler(async (req) => {
  const batches = await Batch.find({})
    .populate("department", "name _id")
    .sort({ createdAt: -1 });
  return ApiResponse(200, batches, "Batches fetched successfully");
});

export const DELETE = AsyncHandler(async (req) => {
  const { id } = await req.json();
  if (!id) return ApiError(400, "Id is required");

  const batch = await Batch.findById(id);
  if (!batch) return ApiError(404, "Batch not found");

  batch.public = !batch.public;
  await batch.save();

  return ApiResponse(200, batch, "Batch status updated successfully");
});
