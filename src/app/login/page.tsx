import { Card } from "flowbite-react";
import LoginForm from "../components/LoginForm";
import SocialButtons from "../components/SocialButtons";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">Welcome Back</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">Sign in to your account</p>

        <div className="mt-8">
          <SocialButtons />
        </div>

        <div className="my-6 flex items-center mx-2">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        <LoginForm />

        <div className="mt-6 text-center space-y-2 mx-2">
          <a href="/register" className="text-blue-600 hover:underline text-sm">
            Don't have an account? Sign up
          </a>
          <br />
          <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">
            Forgot your password?
          </a>
        </div>
      </Card>
    </div>
  );
}
