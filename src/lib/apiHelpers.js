import dbConnect from "./dbConnect";

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

export { ApiResponse, ApiError, AsyncHandler };
