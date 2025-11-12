// components/ForgotPasswordForm.tsx
"use client";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    setSent(true);
  };

  if (sent) return <p className="text-green-600 text-center font-medium">Check your email for reset link!</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@example.com" required />
      <Button type="submit" className="w-full">
        Send Reset Link
      </Button>
    </form>
  );
}
