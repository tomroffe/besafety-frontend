"use client";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { UserIcon, EmailIcon, PasswordIcon } from "./Icons";

export default function RegisterForm() {
  const [form, setForm] = useState({ email: "", password: "", full_name: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      window.location.href = "/login?registered=true";
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Full Name</Label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-3 text-gray-400" />
          <TextInput
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>
      <div>
        <Label>Email</Label>
        <div className="relative">
          <EmailIcon className="absolute left-3 top-3 text-gray-400" />
          <TextInput
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div>
        <Label>Password</Label>
        <div className="relative">
          <PasswordIcon className="absolute left-3 top-3 text-gray-400" />
          <TextInput
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
}
