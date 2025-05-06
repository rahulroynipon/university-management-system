// app/api/auth/login/route.js

import { ApiResponse, ApiError, AsyncHandler } from "@/lib/apiHelpers";
import User from "@/models/user.model";

export const POST = AsyncHandler(async (req) => {
  const { email, password, role } = await req.json();

  const errors = [];
  if (!email) errors.push({ field: "email", message: "Email is required" });
  if (!password)
    errors.push({ field: "password", message: "Password is required" });
  if (errors.length) {
    return ApiError(400, "Invalid credentials", errors);
  }

  const user = await User.findOne({ email, role });
  if (!user) {
    return ApiError(401, "Invalid credentials", [
      { field: "email", message: "User not found" },
    ]);
  }

  const isMatch = await user.isPasswordMatch(password);
  if (!isMatch) {
    return ApiError(401, "Invalid credentials", [
      { field: "password", message: "Invalid password" },
    ]);
  }

  const token = user.generateAuthToken();

  const userObj = user.toObject();
  delete userObj.password;

  return ApiResponse(200, { user: userObj, token: token }, "Login successful");
});
