// app/api/auth/[provider]/route.ts
import { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;

  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirect_to") || "/dashboard";

  const redirectUrl = `${API_URL}/api/v1/auth/login/${provider}?redirect_to=${redirectTo}`;

  return Response.redirect(redirectUrl);
}
