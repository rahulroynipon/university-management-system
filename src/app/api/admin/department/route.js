import {
  AsyncHandler,
  ApiError,
  ApiResponse,
  authorizeRole,
} from "@/lib/apiHelpers";
import Department from "@/models/department.model";
import { UploadToCloudinary } from "@/lib/Cloudinary";

export const POST = AsyncHandler(async (req) => {
  await authorizeRole(req, ["admin"]);

  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const file = formData.get("icon");

  const errors = [];
  if (!name) errors.push({ field: "name", message: "Name is required" });
  if (!description)
    errors.push({ field: "description", message: "Description is required" });

  if (!file || typeof file === "string") {
    errors.push({ field: "icon", message: "Icon is required" });
  }

  if (errors.length) {
    return ApiError(400, "All fields are required", errors);
  }

  const existingDepartment = await Department.findOne({ name });
  if (existingDepartment) {
    return ApiError(400, "Department already exists");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimetype = file.type;

  const { url, publicId } = await UploadToCloudinary(
    { buffer, mimetype },
    "departments"
  );

  const department = await Department.create({
    name,
    description,
    icon: { url, publicId },
  });

  return ApiResponse(201, department, "Department created successfully");
});
