"use client";

import { useRef, useMemo } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import TaskManager from "@/components/tasks/Manager";
import { useUser } from "@/contexts/User";

export default function ReportContainer() {
  const onCreateTaskRef = useRef<(() => void) | null>(null);
  const { isAuthenticated, user, token } = useUser();

  const authToken = useMemo(() => {
    if (!isAuthenticated || !user?.user_login || !token) return "";
    return btoa(`${user.user_login}:${token}`);
  }, [isAuthenticated, user?.user_login, token]);

  if (!isAuthenticated) {
    return (
      <section className="py-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Create an account
          </h2>
          <RegisterForm />
        </div>
      </section>
    );
  }

  return (
    <div>
      <TaskManager
        authToken={authToken}
        onCreateTaskRef={onCreateTaskRef}
      />
    </div>
  );
}