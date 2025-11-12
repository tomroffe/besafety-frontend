// lib/api.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Universal API fetcher with automatic token refresh
 * Works in Server Components, API Routes, and Client Components
 */
export async function apiFetch(
  input: RequestInfo | URL,
  options: RequestInit = {},
  retryCount = 0
): Promise<Response> {
  // Get token — works in server components
  let token: string | undefined;
  try {
    const cookieStore = await cookies();
    token = cookieStore.get("access_token")?.value;
  } catch {
    // In client components, cookies() throws — that's okay
    token = undefined;
  }

  const res = await fetch(input, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // Auto-refresh on 401
  if (res.status === 401 && retryCount === 0) {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      // Retry original request with new token
      return apiFetch(input, options, 1);
    } else {
      // Force logout
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      } else {
        redirect("/login");
      }
    }
  }

  return res;
}
