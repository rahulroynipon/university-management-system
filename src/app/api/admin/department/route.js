import {
  AsyncHandler,
  ApiError,
  ApiResponse,
  authorizeRole,
} from "@/lib/apiHelpers";
import Department from "@/models/department.model";
import { UploadToCloudinary } from "@/lib/Cloudinary";
import Batch from "@/models/batch.model";

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

export const GET = AsyncHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type == "options") {
    const departments = await Department.find({}).select("name _id public");
    const options = departments.map((dept) => ({
      label: dept.name,
      value: dept._id,
      public: dept.public,
    }));
    return ApiResponse(200, options, "Departments fetched successfully");
  }

  const departments = await Department.find({}).sort({
    createdAt: -1,
  });
  return ApiResponse(200, departments, "Departments fetched successfully");
});

export const DELETE = AsyncHandler(async (req) => {
  await authorizeRole(req, ["admin"]);

  const { id } = await req.json();
  if (!id) return ApiError(400, "Id is required");

  const department = await Department.findById(id);
  if (!department) return ApiError(404, "Department not found");
  const newStatus = !department.public;
  department.public = newStatus;
  await department.save();

  if (!newStatus) {
    await Batch.updateMany({ department: id, public: true }, { public: false });
  }

  return ApiResponse(200, department, "Department status updated successfully");
});
