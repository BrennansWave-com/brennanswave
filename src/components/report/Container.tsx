"use client";

import { useRef } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import TaskManager from "@/components/tasks/Manager";
import type { User, UserProps } from "@/types/user";

export default function ReportContainer({ user, userAuthToken }: { user: User | UserProps | null; userAuthToken: string }) {
  const onCreateTaskRef = useRef<(() => void) | null>(null);

  if (!user || !userAuthToken) {
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
      <TaskManager
        authToken={userAuthToken}
        onCreateTaskRef={onCreateTaskRef}
      />
    </div>
  );
}