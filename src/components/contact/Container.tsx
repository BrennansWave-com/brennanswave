"use client";

import { useState } from "react";
import axios from "axios";
import { ContactForm, type ContactFormValues } from "@/components/contact/Form";

const FORM_ID = 1;

function getSubmissionsUrl() {
  const base =
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_API_URL ?? window.location.origin
      : process.env.NEXT_PUBLIC_API_URL ?? "";
  return `${base.replace(/\/$/, "")}/wp-json/vires/v1/submissions`;
}

export default function ContactContainer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(data: ContactFormValues) {
    setError(null);
    setLoading(true);
    try {
      await axios.post(getSubmissionsUrl(), {
        form_id: FORM_ID,
        first_name: data.first_name,
        last_name: data.last_name,
        email_address: data.email_address,
        phone: data.phone || undefined,
        message: data.message,
      });
      setSuccess(true);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message as string) ?? err.message
        : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container mx-auto px-4 py-12 max-w-xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Get in touch</h2>
      <p className="text-gray-600 mb-8">
        Send us a message and we&apos;ll get back to you as soon as we can.
      </p>
      <ContactForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
        successMessage="Thanks for reaching out. We'll get back to you soon."
      />
    </section>
  );
}
