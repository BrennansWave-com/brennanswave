"use client";

import { useUser } from "@/contexts/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Clock, AlertTriangle, Calendar, CheckCircle2 } from "lucide-react";
import {
  type FormState,
  FREQUENCIES,
  DAYS_OF_WEEK,
} from "@/components/tasks/task-utils";

const AGENT_AVATAR = "/images/Brennan-Ruth-2D-Pixel-Kayaker.jpg";
const AGENT_NAME = "Brennan";

const dayNumbers = Array.from({ length: 31 }, (_, i) => i + 1);

export interface ReportSchedulerProps {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: () => void;
  submitting: boolean;
  formError: string | null;
  success?: boolean;
}

export default function ReportScheduler({
  form,
  setForm,
  onSubmit,
  submitting,
  formError,
  success = false,
}: ReportSchedulerProps) {
  const { user } = useUser();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  if (success) {
    return (
      <Alert variant="success" className="rounded-xl border-gray-200 bg-white shadow-sm">
        <CheckCircle2 className="size-5 text-green-600" />
        <div>
          <AlertTitle>Report scheduled</AlertTitle>
          <AlertDescription>
            Your Brennan&apos;s Wave surf report has been scheduled and will be delivered to{" "}
            <span className="font-medium">{user?.user_email ?? user?.email ?? "your email"}</span> at the
            specified time and frequency.
          </AlertDescription>
        </div>
      </Alert>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="text-center px-6 pt-6 pb-1">
        <h3 className="text-xl font-semibold text-gray-900">Schedule a Brennan&apos;s Wave Surf Report</h3>
      </div>
      <div className="px-6 py-5 space-y-6">
        <div className="flex items-center gap-6">
          <Label className="text-sm text-gray-600 font-medium w-24 shrink-0">Frequency</Label>
          <div className="flex items-center rounded-lg bg-gray-100 border border-gray-200 p-1 flex-1">
            {FREQUENCIES.map((freq) => (
              <Button
                key={freq}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setForm((prev) => ({ ...prev, frequency: freq }))}
                className={`flex-1 rounded-md px-3 py-2 text-[13px] font-semibold transition-all hover:bg-gray-200/80 ${
                  form.frequency === freq
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200 hover:bg-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Label className="text-sm text-gray-600 font-medium w-24 shrink-0">On</Label>
          <div className="flex items-center gap-2 flex-1 flex-wrap">
            <div className="flex items-center rounded-lg bg-gray-100 border border-gray-200 px-3 py-2 min-w-0">
              <Clock className="size-3.5 text-gray-500 mr-2 shrink-0" />
              <input
                type="time"
                value={form.time || "12:00"}
                onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                className="bg-transparent text-sm font-medium text-gray-900 cursor-pointer outline-none border-0"
              />
            </div>
            {(form.frequency === "once" || form.frequency === "yearly") && (
              <div className="flex items-center rounded-lg bg-gray-100 border border-gray-200 px-2 py-0.5 min-w-0">
                <Input
                  type="date"
                  value={form.date}
                  min={todayStr}
                  onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                  className="border-0 bg-transparent text-sm text-gray-900 shadow-none focus-visible:ring-0"
                />
              </div>
            )}
            {form.frequency === "weekly" && (
              <select
                value={form.dayOfWeek}
                onChange={(e) => setForm((prev) => ({ ...prev, dayOfWeek: Number(e.target.value) }))}
                className="h-9 rounded-lg bg-gray-100 border border-gray-200 text-sm font-medium text-gray-900 px-4 cursor-pointer outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
              >
                {DAYS_OF_WEEK.map((day, idx) => (
                  <option key={day} value={idx}>
                    {day}
                  </option>
                ))}
              </select>
            )}
            {form.frequency === "monthly" && (
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 border border-gray-200 px-3 py-2">
                <Calendar className="size-3.5 text-gray-500 shrink-0" />
                <select
                  value={form.dayOfMonth}
                  onChange={(e) => setForm((prev) => ({ ...prev, dayOfMonth: Number(e.target.value) }))}
                  className="bg-transparent text-sm font-medium text-gray-900 cursor-pointer outline-none border-0 min-w-[4rem]"
                >
                  {dayNumbers.map((d) => (
                    <option key={d} value={d}>
                      Day {d}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Label className="text-sm text-gray-600 font-medium w-24 shrink-0">Agent</Label>
          <div className="flex items-center gap-3 rounded-lg bg-gray-100 border border-gray-200 px-4 py-2.5">
            <Avatar className="h-8 w-8 border border-gray-200 shrink-0">
              <AvatarImage src={AGENT_AVATAR} alt={AGENT_NAME} className="object-cover" />
            </Avatar>
            <span className="text-sm font-medium text-gray-900">AI Agent: {AGENT_NAME}</span>
          </div>
        </div>
      </div>
      <div className="px-6 py-5">
        <p className="text-sm text-gray-600">
          This report will be delivered to{" "}
          <span className="font-medium text-gray-900">{user?.user_email ?? user?.email ?? "your email"}</span>
          {" "}at the specified time and frequency.
        </p>
      </div>
      {formError && (
        <div className="px-6 pb-3">
          <div className="flex items-center gap-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
            <AlertTriangle className="size-4 shrink-0" />
            <span className="font-medium">{formError}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl">
        <Button
          onClick={onSubmit}
          disabled={submitting}
          className="rounded-lg px-5 py-2 text-sm font-semibold w-full bg-blue-500 hover:bg-blue-600"
        >
          {submitting ? (
            <>
              <Spinner className="size-4" />
              Scheduling...
            </>
          ) : (
            "Schedule report"
          )}
        </Button>
      </div>
    </section>
  );
}
