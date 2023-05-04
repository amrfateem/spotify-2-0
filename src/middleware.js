import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // will exists if you're logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  //   Allow requests if
  //   Token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //   No token and protected route
  if (!token && !req.nextUrl.pathname.includes("/login")) {
    {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

}

export const config = {
  matcher: "/",
};