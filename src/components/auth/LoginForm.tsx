"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AuthLoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string | null;
  submitLabel?: string;
  /** Optional wrapper for the submit button (e.g. DialogFooter) */
  submitWrapper?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
}

export function AuthLoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  loading,
  error,
  submitLabel = "Log In",
  submitWrapper: SubmitWrapper,
}: AuthLoginFormProps) {
  const submitButton = (
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? "Signing in…" : submitLabel}
    </Button>
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-4 py-2">
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      <div className="grid gap-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          autoComplete="current-password"
          disabled={loading}
        />
      </div>
      {SubmitWrapper ? (
        <SubmitWrapper className="pt-2">{submitButton}</SubmitWrapper>
      ) : (
        submitButton
      )}
    </form>
  );
}
