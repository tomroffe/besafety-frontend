import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { Card } from "flowbite-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Reset Password</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">Enter your email to receive a reset link</p>
        <div className="mt-8">
          <ForgotPasswordForm />
        </div>
      </Card>
    </div>
  );
}
