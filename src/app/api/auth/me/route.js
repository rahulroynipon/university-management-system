import {
  AsyncHandler,
  ApiResponse,
  verifyToken,
  ApiError,
} from "@/lib/apiHelpers";
import User from "@/models/user.model";

export const GET = AsyncHandler(async (req) => {
  try {
    await verifyToken(req);
    const user = await User.findById(req.userId).select("-password");
    return ApiResponse(200, user, "User fetched successfully");
  } catch (error) {
    return ApiError(500, error.message || "Something went wrong");
  }
});
