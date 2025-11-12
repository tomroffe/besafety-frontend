import { NextRequest } from "next/server";
import { getCookieStore } from "../../../lib/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST() {
  const cookieStore = await getCookieStore();
  const refresh_token = cookieStore.get("refresh_token")?.value;

  if (!refresh_token) {
    return Response.json({ error: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token }),
  });

  if (!res.ok) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return Response.json({ error: "Refresh failed" }, { status: 401 });
  }

  const { access_token, refresh_token: new_refresh } = await res.json();

  cookieStore.set("access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  if (new_refresh) {
    cookieStore.set("refresh_token", new_refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }

  return Response.json({ success: true });
}
