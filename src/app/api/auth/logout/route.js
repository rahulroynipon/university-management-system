import { cookies } from "next/headers";
import { ApiError, AsyncHandler, ApiResponse } from "@/lib/apiHelpers";

export const GET = AsyncHandler(async (req) => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return ApiResponse(200, null, "Logout successfully");
  } catch (error) {
    return ApiError(500, error.message || "Failed to logout");
  }
});
