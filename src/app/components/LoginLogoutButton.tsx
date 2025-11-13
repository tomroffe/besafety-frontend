"use client";

import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

export default function LoginLogoutButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    // Check if access_token exists in httpOnly cookies
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", { credentials: "include" });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  // Loading state (optional shimmer)
  if (isLoggedIn === null) {
    return (
      <Button disabled className="h-11 opacity-50">
        Loading...
      </Button>
    );
  }

  return isLoggedIn ? (
    <form action="/api/auth/logout" method="post">
      <Button type="submit" className="h-11">
        Sign Out
      </Button>
    </form>
  ) : (
    <Button href="/login" type="button" className="h-11">
      Login
    </Button>
  );
}
