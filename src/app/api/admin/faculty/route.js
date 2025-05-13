import {
  AsyncHandler,
  authorizeRole,
  ApiError,
  ApiResponse,
} from "@/lib/apiHelpers";
import GenerateAvatarUrl from "@/lib/GenerateAvatarUrl";
import Faculty from "@/models/faculty.model";

export const POST = AsyncHandler(async (req) => {
  await authorizeRole(req, ["admin"]);
  const { name, email, department, description, role, rank } = await req.json();

  const errors = [];
  if (!name) errors.push({ field: "name", message: "Name is required" });
  if (!email) errors.push({ field: "email", message: "Email is required" });
  if (!department)
    errors.push({ field: "department", message: "Department is required" });
  if (!description)
    errors.push({ field: "description", message: "Description is required" });
  if (!role) errors.push({ field: "role", message: "Role is required" });
  if (!rank) errors.push({ field: "rank", message: "Rank is required" });

  if (errors.length) {
    return ApiError(400, "All fields are required", errors);
  }

  const faculty = await Faculty.findOne({ email });
  if (faculty) {
    return ApiError(400, "Faculty already exists");
  }

  if (rank == "head of department") {
    const headOfDepartment = await Faculty.findOne({
      rank: "head of department",
    });
    if (headOfDepartment) {
      return ApiError(400, "Head of department already exists");
    }
  }

  const avatar = await GenerateAvatarUrl(name);
  const password = Math.floor(100000 + Math.random() * 900000).toString();

  const newFaculty = new Faculty({
    name,
    email,
    password,
    department,
    description,
    role,
    rank,
    avatar: { url: avatar },
  });
  await newFaculty.save();

  await newFaculty.populate("department", "name _id");

  return ApiResponse(200, newFaculty, "Faculty created successfully");
});

export const GET = AsyncHandler(async (req) => {
  authorizeRole(req, ["admin"]);

  const faculties = await Faculty.find({})
    .select("-courses")
    .populate("department", "name _id")
    .sort({ createdAt: -1 });
  return ApiResponse(200, faculties, "Faculties fetched successfully");
});
