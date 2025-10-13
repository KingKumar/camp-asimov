import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isStaff = pathname.startsWith("/staff");
  const isLogin = pathname === "/staff/login";
  const isApi = pathname.startsWith("/api/staff");
  const authed = req.cookies.get("staff_auth")?.value === "1";

  if (isStaff && !isApi) {
    if (!authed && !isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/staff/login";
      return NextResponse.redirect(url);
    }
    if (authed && isLogin) {
      const url = req.nextUrl.clone();
      url.pathname = "/staff";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/staff/:path*", "/api/staff/:path*"] };
