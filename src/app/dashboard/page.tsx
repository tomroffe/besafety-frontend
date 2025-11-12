// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { Button } from 'flowbite-react'
import { getCookieStore } from "../lib/cookies";
// `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me` ||
const API_URL = "http://localhost:8000/api/v1/users/me";

export default async function Dashboard() {
  // Use our helper — clean + safe
  const cookieStore = await getCookieStore();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  // Optional: fetch user info
  let user = null;
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store", // always fresh
    });

    if (res.ok) {
      user = await res.json();
    }
    console.log(user)
  } catch (error) {
    console.error("Failed to fetch user:", error);
    // Still show dashboard — token is valid
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Welcome back,{" "}
                <span className="text-blue-600">
                  {user?.name || user?.email || "User"}
                </span>
              </h1>
              <p className="text-gray-600 mt-2">
                You are successfully logged in. Your session is secure.
              </p>
            </div>
            <div className="bg-indigo-100 rounded-full p-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {user?.is_superuser ? "Admin" : "User"}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {user?.created ? new Date(user.created).toLocaleDateString() : "Today"}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Last Login</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {user?.last_login ? new Date(user.last_login).toLocaleDateString() : "Never"}
            </p>
            <p className="text-xs font-bold text-gray-900 mt-2 ">
              via <span className="capitalize">{user?.current_provider ? user.current_provider : "Unknown"}</span>
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">Active</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-12 text-center">
          <form action="/api/auth/logout" method="post">
            <Button
              type="submit"
              className="w-full"
            >
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
