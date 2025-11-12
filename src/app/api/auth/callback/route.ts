// app/api/auth/callback/route.ts
import { NextRequest } from "next/server";
import { getCookieStore } from "../../../lib/cookies";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const access_token = url.searchParams.get("access_token");
  const refresh_token = url.searchParams.get("refresh_token");
  const redirectTo = url.searchParams.get("redirect_to") || "/dashboard";

  if (!access_token) {
    return Response.redirect("/login?error=auth_failed");
  }

  // Use the helper!
  const cookieStore = await getCookieStore();

  cookieStore.set("access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  if (refresh_token) {
    cookieStore.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }

  return Response.redirect(new URL(redirectTo, request.url));
}
