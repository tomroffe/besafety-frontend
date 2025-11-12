// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCookieStore } from "../../../lib/cookies";

export async function POST(request: NextRequest) {
  const cookieStore = await getCookieStore();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_URL || "http://localhost:3000"));
}

