import type { TaskStatus, TaskFrequency } from "@/types/task";

export type Frequency = TaskFrequency;

export type NotifyVia = "push" | "email" | "both" | "none";

export type FormState = {
  name: string;
  instructions: string;
  time: string;
  date: string;
  dayOfWeek: number;
  dayOfMonth: number;
  frequency: Frequency;
  agentUserId: string;
  notifyVia: NotifyVia;
};

export type { TaskFrequency };

const getApiBase = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? window.location.origin;
  }
  return process.env.NEXT_PUBLIC_API_URL ?? "";
};

export const API_BASE = getApiBase();
export const TASKS_URL = `${API_BASE.replace(/\/$/, "")}/wp-json/vireschat/v1/tasks`;
export const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const FREQUENCIES: Frequency[] = ["once", "daily", "weekly", "monthly", "yearly"];
export const NOTIFY_OPTIONS: { value: NotifyVia; label: string; description: string }[] = [
  { value: "email", label: "Email", description: "Email to your account" },
];

function getTomorrow(): { date: string; dayOfWeek: number; dayOfMonth: number } {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const yyyy = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return { date: `${yyyy}-${mo}-${dd}`, dayOfWeek: d.getDay(), dayOfMonth: d.getDate() };
}

export const DEFAULT_FORM: FormState = {
  name: "",
  instructions: "",
  time: "12:00",
  ...getTomorrow(),
  frequency: "once" as TaskFrequency,
  agentUserId: "3",
  notifyVia: "email",
};

export const FREQUENCY_HINT: Record<Frequency, string> = {
  once: "Task will run once at the scheduled time",
  hourly: "Task will repeat every hour starting 1 hour from now",
  daily: "Task will repeat every day at the scheduled time",
  weekly: "Task will repeat every week on the scheduled day",
  monthly: "Task will repeat every month on the scheduled date",
  yearly: "Task will repeat every year on the scheduled date",
};

export function parseDateTimeToFields(value?: string | null): {
  time: string;
  date: string;
  dayOfWeek: number;
  dayOfMonth: number;
} {
  if (!value) return { time: "", date: "", dayOfWeek: new Date().getDay(), dayOfMonth: new Date().getDate() };
  const d = new Date(value);
  if (isNaN(d.getTime())) return { time: "", date: "", dayOfWeek: new Date().getDay(), dayOfMonth: new Date().getDate() };
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return {
    time: `${hh}:${mm}`,
    date: `${yyyy}-${mo}-${dd}`,
    dayOfWeek: d.getDay(),
    dayOfMonth: d.getDate(),
  };
}

export function buildScheduledDate(form: FormState): Date | null {
  const now = new Date();
  if (!form.time) return null;
  const [hh, mm] = form.time.split(":").map(Number);
  if (form.frequency === "daily") {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0);
    if (d <= now) d.setDate(d.getDate() + 1);
    return d;
  }
  if (form.frequency === "weekly") {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0);
    const diff = (form.dayOfWeek - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + diff);
    return d;
  }
  if (form.frequency === "monthly") {
    let d = new Date(now.getFullYear(), now.getMonth(), form.dayOfMonth, hh, mm, 0);
    if (d <= now) d = new Date(now.getFullYear(), now.getMonth() + 1, form.dayOfMonth, hh, mm, 0);
    return d;
  }
  if (!form.date) return null;
  const [y, m, day] = form.date.split("-").map(Number);
  return new Date(y, m - 1, day, hh, mm, 0);
}

export function formatTimeDisplay(time: string): string {
  if (!time) return "";
  const [hh, mm] = time.split(":").map(Number);
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${String(mm).padStart(2, "0")} ${ampm}`;
}

export function formatDateDisplay(date: string): string {
  if (!date) return "";
  const d = new Date(date + "T00:00:00");
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

export function parseTaskPrompt(prompt: string): { name: string; instructions: string } {
  const idx = prompt.indexOf("\n\n");
  if (idx > 0 && idx < 100) {
    return { name: prompt.slice(0, idx), instructions: prompt.slice(idx + 2) };
  }
  if (prompt.length <= 60) {
    return { name: prompt, instructions: "" };
  }
  const spaceIdx = prompt.indexOf(" ", 40);
  const cutoff = spaceIdx > 0 && spaceIdx < 60 ? spaceIdx : 50;
  return { name: prompt.slice(0, cutoff), instructions: prompt };
}

export function formatScheduleLabel(scheduledFor: string | null): string {
  if (!scheduledFor) return "";
  const date = new Date(scheduledFor);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  if (isToday) return `Today at ${time}`;
  if (isTomorrow) return `Tomorrow at ${time}`;
  return (
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    }) + ` at ${time}`
  );
}
