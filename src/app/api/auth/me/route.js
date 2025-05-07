import {
  AsyncHandler,
  ApiResponse,
  verifyToken,
  ApiError,
} from "@/lib/apiHelpers";

export const GET = AsyncHandler(async (req) => {
  try {
    await verifyToken(req);
    return ApiResponse(200, req.user, "User fetched successfully");
  } catch (error) {
    return ApiError(500, error.message || "Something went wrong");
  }
});
