"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerWithSetPassEmail } from "@/lib/auth-api";

export interface RegisterFormProps {
  onSuccess?: () => void;
  successMessage?: React.ReactNode;
}

export function RegisterForm({ onSuccess, successMessage }: RegisterFormProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const baseUrl =
        typeof window !== "undefined" ? window.location.origin : undefined;
      const result = await registerWithSetPassEmail(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        baseUrl
      );
      if (result.success) {
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        onSuccess?.();
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-md bg-green-50 dark:bg-green-950/30 p-4 text-sm text-green-800 dark:text-green-200">
        {successMessage ?? "Check your email for the password setup link."}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      <div className="grid gap-2">
        <Label htmlFor="register-first-name">First Name</Label>
        <Input
          id="register-first-name"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoComplete="given-name"
          disabled={loading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-last-name">Last Name</Label>
        <Input
          id="register-last-name"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          autoComplete="family-name"
          disabled={loading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email">Email Address</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Password set link will be emailed to you.
      </p>
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting…" : "Submit"}
      </Button>
    </form>
  );
}
