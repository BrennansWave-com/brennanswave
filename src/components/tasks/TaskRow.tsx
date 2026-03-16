"use client";

import type { ScheduledTask } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, RotateCcw, StopCircle } from "lucide-react";
import { parseTaskPrompt, formatScheduleLabel } from "./task-utils";
import { STATUS_CONFIG } from "./task-status";

export interface TaskRowProps {
  task: ScheduledTask;
  variant: "upcoming" | "past";
  onEdit: (task: ScheduledTask) => void;
  onStop?: (task: ScheduledTask) => void;
  onDelete: (task: ScheduledTask) => void;
}

export default function TaskRow({ task, variant, onEdit, onStop, onDelete }: TaskRowProps) {
  const parsed = parseTaskPrompt(task.prompt ?? "");
  const status = STATUS_CONFIG[task.status];
  const isFailed = task.status === "failed";
  const isPast = variant === "past";

  const getFrequencyLabel = (freq?: string | null) => {
    if (!freq) return "";
    const labels: Record<string, string> = {
      daily: "Every day",
      weekly: "Every week",
      monthly: "Every month",
      yearly: "Every year",
      once: "Once",
    };
    return labels[freq] || "";
  };

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border px-5 py-3.5 transition-all ${
        isFailed
          ? "border-red-900/30 bg-red-950/10 hover:border-red-800/40"
          : isPast
            ? "border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50"
            : "border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/80"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`size-2 shrink-0 rounded-full ${status?.dot ?? "bg-zinc-500"}`} />
        <div className="flex flex-col min-w-0">
          <span className={`font-semibold text-sm truncate ${
            isFailed ? "text-red-300/80" : isPast ? "text-zinc-400" : "text-white"
          }`}>
            {parsed.name}
          </span>
          {task.frequency && (
            <span className="text-xs text-zinc-300 flex items-center gap-1.5">
              {getFrequencyLabel(task.frequency)}
              {task.frequency !== "once" && (
                <RotateCcw className="size-3 opacity-50" />
              )}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {(variant === "upcoming" ? task.status === "pending" : task.status !== "processing" && task.status !== "completed") && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onEdit(task)}
              title="Edit"
              className="rounded-full text-zinc-600 hover:text-white hover:bg-white/10"
            >
              <Pencil className="size-3" />
            </Button>
          )}
          {variant === "upcoming" && onStop && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onStop(task)}
              title="Stop (moves to Past)"
              className="rounded-full text-zinc-600 hover:text-amber-400 hover:bg-amber-500/10"
            >
              <StopCircle className="size-3" />
            </Button>
          )}
          {task.status !== "processing" && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onDelete(task)}
              title="Delete"
              className="rounded-full text-zinc-600 hover:text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="size-3" />
            </Button>
          )}
        </div>
        <span className={`text-sm flex items-center gap-1.5 ${isPast ? "text-zinc-300" : "text-zinc-400"}`}>
          {formatScheduleLabel(task.scheduled_for)}
          {status?.icon}
        </span>
      </div>
    </div>
  );
}
