import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const role = (req.auth?.user as { role?: string } | undefined)?.role;
    if (!req.auth || (role !== "ADMIN" && role !== "TEACHER")) {
      const loginUrl = new URL("/admin/login", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname.startsWith("/admin/members") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
