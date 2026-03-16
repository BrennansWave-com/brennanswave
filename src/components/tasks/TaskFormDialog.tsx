"use client";

// import { useState } from "react";
import type { ScheduledTask } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Clock, AlertTriangle, CalendarClock, Calendar } from "lucide-react";

const AGENT_AVATAR = "/images/Brennan-Ruth-2D-Pixel-Kayaker.jpg";
const AGENT_NAME = "Brennan";
import {
  type FormState,
  FREQUENCIES,
  DAYS_OF_WEEK,
  FREQUENCY_HINT,
  NOTIFY_OPTIONS,
} from "./task-utils";

interface TaskFormDialogProps {
  open: boolean;
  onClose: () => void;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: () => void;
  submitting: boolean;
  formError: string | null;
  editingTask: ScheduledTask | null;
}

const dayNumbers = Array.from({ length: 31 }, (_, i) => i + 1);

export default function TaskFormDialog({
  open,
  onClose,
  form,
  setForm,
  onSubmit,
  submitting,
  formError,
  editingTask,
}: TaskFormDialogProps) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-[#0c0c0c] text-white border border-zinc-800/80 sm:max-w-[640px] p-0 gap-0 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
        <div className="px-7 pt-7 pb-1">
          <Input
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Name of task"
            className="border-0 bg-transparent text-[22px] font-bold text-white placeholder:text-zinc-700 shadow-none focus-visible:ring-0 caret-[#0091ff] px-0 h-auto"
            autoFocus
          />
        </div>
        <div className="px-7 py-5 space-y-6">
          <div className="flex items-center gap-6">
            <Label className="text-sm text-zinc-300 font-normal w-24 shrink-0">Frequency</Label>
            <div className="flex items-center rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-1 flex-1">
              {FREQUENCIES.map((freq) => (
                <Button
                  key={freq}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setForm((prev) => ({ ...prev, frequency: freq }))}
                  className={`flex-1 rounded-lg px-3 py-2 text-[13px] font-semibold transition-all hover:bg-transparent ${
                    form.frequency === freq
                      ? "bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.15)] hover:bg-white hover:text-black"
                      : "text-zinc-300 hover:text-zinc-300"
                  }`}
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Label className="text-sm text-zinc-300 font-normal w-24 shrink-0">On</Label>
            <div className="flex items-center gap-2 flex-1 flex-wrap">
              <div className="flex items-center rounded-full bg-zinc-900/80 border border-zinc-800/80 px-2 py-0.5 min-w-0">
                <Clock className="size-3.5 text-[#0091ff] mr-2 shrink-0" />
                <input
                  type="time"
                  value={form.time || "12:00"}
                  onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                  className="bg-transparent text-sm font-semibold text-white cursor-pointer outline-none [color-scheme:dark] border-0"
                />
              </div>
              {(form.frequency === "once" || form.frequency === "yearly") && (
                <div className="flex items-center rounded-full bg-zinc-900/80 border border-zinc-800/80 px-2 py-0.5 min-w-0">
                  <Input
                    type="date"
                    value={form.date}
                    min={todayStr}
                    onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                    className="border-0 bg-transparent text-sm text-white shadow-none focus-visible:ring-0 [color-scheme:dark]"
                  />
                </div>
              )}
              {form.frequency === "weekly" && (
                <select
                  value={form.dayOfWeek}
                  onChange={(e) => setForm((prev) => ({ ...prev, dayOfWeek: Number(e.target.value) }))}
                  className="h-9 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-sm font-semibold text-white px-4 cursor-pointer outline-none focus:border-zinc-700 [color-scheme:dark]"
                >
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <option key={day} value={idx} className="bg-zinc-900 text-white">
                      {day}
                    </option>
                  ))}
                </select>
              )}
              {form.frequency === "monthly" && (
                <div className="flex items-center gap-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80 px-2 py-0.5">
                  <Calendar className="size-3.5 text-[#0091ff] shrink-0" />
                  <select
                    value={form.dayOfMonth}
                    onChange={(e) => setForm((prev) => ({ ...prev, dayOfMonth: Number(e.target.value) }))}
                    className="bg-transparent text-sm font-semibold text-white cursor-pointer outline-none border-0 min-w-[4rem] [color-scheme:dark]"
                  >
                    {dayNumbers.map((d) => (
                      <option key={d} value={d} className="bg-zinc-900 text-white">
                        Day {d}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-6">
            <Label className="text-sm text-zinc-300 font-normal w-24 shrink-0 pt-3">Instructions</Label>
            <div className="flex-1 relative">
              <Textarea
                value={form.instructions}
                onChange={(e) => setForm((prev) => ({ ...prev, instructions: e.target.value }))}
                rows={6}
                placeholder="Enter prompt here."
                className="border-zinc-800/80 bg-zinc-900/80 text-white placeholder:text-zinc-700 resize-none text-sm rounded-xl focus-visible:border-[#0091ff]/30 focus-visible:ring-[#0091ff]/10"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Label className="text-sm text-zinc-300 font-normal w-24 shrink-0">Agent</Label>
            <div className="flex items-center gap-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 px-4 py-2.5">
              <Avatar className="h-8 w-8 border border-zinc-700 shrink-0">
                <AvatarImage src={AGENT_AVATAR} alt={AGENT_NAME} className="object-cover" />
              </Avatar>
              <span className="text-sm font-medium text-white">AI Agent: {AGENT_NAME}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Label className="text-sm text-zinc-300 font-normal w-24 shrink-0">Notify via</Label>
            <div className="flex items-center rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-1 flex-1 max-w-[128px]">
              {NOTIFY_OPTIONS.map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  variant="ghost"
                  size="sm"
                  title={opt.description}
                  onClick={() => setForm((prev) => ({ ...prev, notifyVia: opt.value }))}
                  className={`flex-1 rounded-lg px-3 py-2 text-[13px] font-semibold transition-all hover:bg-transparent ${
                    form.notifyVia === opt.value
                      ? "bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.15)] hover:bg-white hover:text-black"
                      : "text-zinc-300 hover:text-zinc-300"
                  }`}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {formError && (
          <div className="px-7 pb-3">
            <div className="flex items-center gap-2.5 text-sm text-red-400 bg-red-500/5 border border-red-500/10 rounded-xl px-4 py-2.5">
              <AlertTriangle className="size-4 shrink-0" />
              <span className="font-medium">{formError}</span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-zinc-800/60 px-7 py-4 bg-zinc-950/50">
          <div className="flex items-center gap-2.5 text-xs text-zinc-600">
            <div className="size-5 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50">
              <CalendarClock className="size-3" />
            </div>
            <span>{FREQUENCY_HINT[form.frequency]}</span>
          </div>
          <Button
            onClick={onSubmit}
            disabled={submitting}
            className="rounded-full bg-white px-6 py-2 text-sm font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {submitting ? (
              <>
                <Spinner className="size-4" />
                {editingTask ? "Updating..." : "Creating..."}
              </>
            ) : (
              editingTask ? "Update Task" : "Create Task"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
