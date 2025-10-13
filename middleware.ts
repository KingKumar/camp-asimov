import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isStaff = pathname.startsWith("/staff");
  const isLogin = pathname === "/staff/login";
  const isApi = pathname.startsWith("/api/staff");

  if (isStaff && !isLogin && !isApi) {
    const hasAuth = req.cookies.get("staff_auth")?.value === "1";
    if (!hasAuth) {
      const url = req.nextUrl.clone();
      url.pathname = "/staff/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/staff/:path*", "/api/staff/:path*"],
};
