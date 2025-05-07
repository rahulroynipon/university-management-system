import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const redirectToDashboard = ({ role, _id }, req) => {
  if (role === "admin")
    return NextResponse.redirect(new URL("/dashboard/admin", req.url));
  if (role === "teacher")
    return NextResponse.redirect(new URL(`/dashboard/teacher/${_id}`, req.url));
  if (role === "student")
    return NextResponse.redirect(new URL(`/dashboard/student/${_id}`, req.url));
};

const handleRedirect = async (req) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  if (!token) {
    if (pathname === "/login") return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );

    if (pathname === "/login") {
      return redirectToDashboard(payload, req);
    }

    const { role } = payload;

    if (
      pathname.startsWith("/dashboard") &&
      !pathname.startsWith(`/dashboard/${role}`)
    ) {
      return redirectToDashboard(payload, req);
    }

    return NextResponse.next();
  } catch (error) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }
};

export async function middleware(req) {
  return handleRedirect(req);
}

export const config = {
  matcher: ["/login", "/dashboard", "/dashboard/:path*"],
};
