"use client";

import { useUser } from "@/contexts/User";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function ReportContainer() {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Create an account
        </h2>
        <RegisterForm />
      </div>
    );
  }

  return (
    <div>
      <h1>Report</h1>
    </div>
  );
}