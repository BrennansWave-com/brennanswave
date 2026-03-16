"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLoginForm } from "@/components/auth/LoginForm";
import { login, setAuth } from "@/lib/auth-api";

interface LoginFormCardProps {
  /** Path to redirect to on successful login. Default: /report */
  redirectTo?: string;
}

export function LoginFormCard({ redirectTo = "/report" }: LoginFormCardProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        setAuth(result.token, result.user);
        router.push(redirectTo);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email and password to sign in.
        </p>
        <AuthLoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitLabel="Log in"
        />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/" className="text-primary underline hover:no-underline">
            Go home
          </Link>
        </p>
      </div>
    </div>
  );
}
