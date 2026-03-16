"use client";

import { useRef, useMemo, useState } from "react";
import axios from "axios";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useUser } from "@/contexts/User";
import ReportScheduler from "@/components/report/Scheduler";
import {
  type FormState,
  TASKS_URL,
  DEFAULT_FORM,
  buildScheduledDate,
} from "@/components/tasks/task-utils";

export default function ReportContainer() {
  const { isAuthenticated, user, token } = useUser();
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const authToken = useMemo(() => {
    if (!isAuthenticated || !user?.user_login || !token) return "";
    return btoa(`${user.user_login}:${token}`);
  }, [isAuthenticated, user?.user_login, token]);

  const headers = useMemo(
    () => (authToken ? { Authorization: `Basic ${authToken}` } : {}),
    [authToken]
  );

  const SCHEDULE_NAME = "Brennans Wave Surf Report";
  const SCHEDULE_INSTRUCTIONS =
    "Send me a surf report of Missoula Montana Clark Fork Brennan's River Wave.";

  const handleScheduleSubmit = () => {
    setFormError(null);
    if (!form.time) {
      setFormError("Pick a time.");
      return;
    }
    if ((form.frequency === "once" || form.frequency === "yearly") && !form.date) {
      setFormError("Pick a date.");
      return;
    }
    const scheduledDate = buildScheduledDate(form);
    if (!scheduledDate || isNaN(scheduledDate.getTime())) {
      setFormError("Invalid schedule time.");
      return;
    }
    const prompt = `${SCHEDULE_NAME}\n\n${SCHEDULE_INSTRUCTIONS}`;
    const payload: Record<string, unknown> = {
      prompt,
      scheduled_for: scheduledDate.toISOString(),
      frequency: form.frequency,
      notify_via: "email",
    };
    if (form.frequency === "weekly") (payload as Record<string, number>).day_of_week = form.dayOfWeek;
    if (form.frequency === "monthly") (payload as Record<string, number>).day_of_month = form.dayOfMonth;
    if (form.agentUserId) (payload as Record<string, number>).agent_user_id = Number(form.agentUserId);
    setSubmitting(true);
    axios
      .post(TASKS_URL, payload, { headers })
      .then(() => {
        setForm(DEFAULT_FORM);
        setScheduledSuccess(true);
      })
      .catch((err) => {
        setFormError(
          axios.isAxiosError(err) ? err.response?.data?.message ?? err.message : "Failed to schedule"
        );
      })
      .finally(() => setSubmitting(false));
  };

  if (!isAuthenticated) {
    return (
      <section className="py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Create an account
            </h2>
            <p>Sign up and schedule your surf report that will get delivered to your email inbox.</p>
          </div>
          <RegisterForm />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Surf Report
          </h2>
          <p>Schedule your surf report that will get delivered to your email inbox.</p>
        </div> */}
        <ReportScheduler
          form={form}
          setForm={setForm}
          onSubmit={handleScheduleSubmit}
          submitting={submitting}
          formError={formError}
          success={scheduledSuccess}
        />
      </div>
    </section>
  );
}