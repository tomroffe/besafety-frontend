"use client";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { EmailIcon, PasswordIcon } from "./Icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/v1/login/access-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!res.ok) throw new Error("Login failed");

      const { access_token, refresh_token } = await res.json();

      // THIS NOW WORKS
      await fetch("/api/auth/set-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token, refresh_token }),
      });

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mx-3">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div>
        <Label>Email</Label>
        <div className="flex mt-1">
          <TextInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-row w-full"
            required
          />
        </div>
      </div>
      <div>
        <Label>Password</Label>
        <div className="flex mt-1">
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-row w-full"
            required
          />

        </div>
      </div>
      <Button type="submit" className="w-full mt-4">
        Sign In
      </Button>
    </form>
  );
}
