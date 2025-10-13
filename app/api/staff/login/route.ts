import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const params = new URLSearchParams(body);
  const password = params.get("password") || "";

  const expected = process.env.STAFF_PORTAL_PASSWORD;
  if (!expected) {
    return NextResponse.json({ message: "Server missing STAFF_PORTAL_PASSWORD" }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.redirect(new URL("/staff", req.url));
  res.cookies.set("staff_auth", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
