"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

export interface ContactFormValues {
  first_name: string;
  last_name: string;
  email_address: string;
  phone: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormValues) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  successMessage?: string;
}

export function ContactForm({
  onSubmit,
  loading = false,
  error = null,
  success = false,
  successMessage = "Thanks for reaching out. We'll get back to you soon.",
}: ContactFormProps) {
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email_address, setEmailAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email_address: email_address.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center text-green-800">
        <p className="font-medium">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {error && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          {error}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="grid gap-2">
          <Label htmlFor="contact-first-name">First name</Label>
          <Input
            id="contact-first-name"
            type="text"
            placeholder="First name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
            disabled={loading}
            className="bg-white"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-last-name">Last name</Label>
          <Input
            id="contact-last-name"
            type="text"
            placeholder="Last name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
            disabled={loading}
            className="bg-white"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          value={email_address}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
          className="bg-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-phone">Phone (optional)</Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          disabled={loading}
          className="bg-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          disabled={loading}
          className="bg-white resize-none"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? (
          <>
            <Spinner className="size-4" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
