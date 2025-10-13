import { NextResponse } from "next/server";

const normalize = (s: string) => s.normalize("NFKC").trim();

export async function POST(req: Request) {
  const body = await req.text();
  const params = new URLSearchParams(body);
  const input = normalize(params.get("password") || "");
  const expectedRaw = process.env.STAFF_PORTAL_PASSWORD;

  if (!expectedRaw) {
    return NextResponse.json({ ok: false, message: "Server missing STAFF_PORTAL_PASSWORD" }, { status: 500 });
  }
  const expected = normalize(expectedRaw);

  if (input !== expected) {
    return NextResponse.json({ ok: false, message: "Invalid password" }, { status: 401 });
  }

  // Set cookie, but DO NOT redirect here. Let the client navigate.
  const res = NextResponse.json({ ok: true });
  res.cookies.set("staff_auth", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
