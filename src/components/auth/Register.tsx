"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";

export { RegisterForm };

export function Register() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Create an account</h2>
      <p className="text-sm text-gray-600 mb-6">
        We&apos;ll send you a link to set your password.
      </p>
      <RegisterForm />
    </div>
  );
}
