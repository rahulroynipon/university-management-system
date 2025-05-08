import dbConnect from "./dbConnect";
import { jwtVerify } from "jose";
import User from "@/models/user.model";

const ApiResponse = (status = 200, data = null, message = "") => {
  return new Response(
    JSON.stringify({ success: true, message, payload: data }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
};

const ApiError = (
  status = 500,
  message = "Something went wrong",
  errors = []
) => {
  return new Response(JSON.stringify({ success: false, message, errors }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

const AsyncHandler = (fn) => async (req, res) => {
  try {
    await dbConnect();
    return await fn(req, res);
  } catch (error) {
    return ApiError(500, error.message || "Something went wrong");
  }
};

const verifyToken = async (req) => {
  const token = req.cookies.get("token");

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );

    if (payload && payload._id) {
      const user = await User.findById(payload._id).select("_id role");

      if (!user) {
        throw new Error("Invalid token: User not found");
      }

      req.userId = user._id;
      req.userRole = user.role;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

const authorizeRole = async (req, allowedRoles) => {
  try {
    await verifyToken(req);
    if (!allowedRoles.includes(req.userRole)) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

export { ApiResponse, ApiError, AsyncHandler, verifyToken, authorizeRole };
