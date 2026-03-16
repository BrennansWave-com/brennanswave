"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPasswordWithToken, setAuth } from "@/lib/auth-api";

function SetPassForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Invalid or expired link
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          This set-password link is missing or no longer valid. Request a new one
          from the register page.
        </p>
        <Button asChild variant="outline">
          <Link href="/login">Go to Log in</Link>
        </Button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tokenValue = token;
    if (!tokenValue) return;
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 1) {
      setError("Please enter a password.");
      return;
    }
    setLoading(true);
    try {
      const result = await setPasswordWithToken(tokenValue, password);
      if (result.success) {
        setAuth(result.token, result.user);
        router.push("/report");
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
    <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Set your password</h1>
      <p className="text-sm text-gray-600 mb-6">
        Enter a new password for your account.
      </p>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
            {error}
          </p>
        )}
        <div className="grid gap-2">
          <Label htmlFor="set-pass-password">New password</Label>
          <Input
            id="set-pass-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            disabled={loading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="set-pass-confirm">Confirm password</Label>
          <Input
            id="set-pass-confirm"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            disabled={loading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Setting password…" : "Set password"}
        </Button>
      </form>
    </div>
  );
}

export default function SetPassPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <Suspense
          fallback={
            <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm text-center text-gray-500">
              Loading…
            </div>
          }
        >
          <SetPassForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
