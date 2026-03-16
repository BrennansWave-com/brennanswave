export type TaskStatus = "pending" | "processing" | "completed" | "failed" | "cancelled";
export type TaskFrequency = "once" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";

export interface ScheduledTask {
  id: number;
  user_id: number;
  agent_user_id: number;
  prompt: string;
  status: TaskStatus;
  scheduled_for: string | null;
  scheduled_for_gmt?: string | null;
  executed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  conversation_id?: number | null;
  last_error?: string | null;
  frequency?: TaskFrequency;
  day_of_week?: number;
  day_of_month?: number;
  notify_via?: "push" | "email" | "both" | "none";
}
