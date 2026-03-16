"use client";

import { Button } from "@/components/ui/button";
import { Plus, CalendarClock, Settings2 } from "lucide-react";

interface TaskEmptyStateProps {
  onCreateTask: () => void;
}

const EXAMPLES = [
  {
    title: "Create a Daily Stock Tracker",
    schedule: "Daily at 14:40",
    prompt: "Give me the latest updates on {{$TSLA, $BTC, $NVDA, $PLTR, $ETH}}, including current price, recent changes...",
  },
  {
    title: "Receive a Weekly Sports Update",
    schedule: "Thursdays at 19:00",
    prompt: "Tell me about upcoming {{must-watch soccer games}}, including location, schedule, and key highlights.",
  },
];

export default function TaskEmptyState({ onCreateTask }: TaskEmptyStateProps) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-black to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#0091ff]/[0.03] rounded-full blur-3xl" />
        <div className="relative flex flex-col items-center justify-center py-24 px-6">
          <div className="relative mb-8">
            <div className="absolute inset-0 scale-[2] rounded-full bg-[#0091ff]/5 blur-3xl" />
            <div className="relative rounded-2xl bg-zinc-900/90 p-7 border border-zinc-700/50 shadow-[0_0_40px_rgba(0,145,255,0.05)]">
              <CalendarClock className="size-14 text-zinc-600" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 text-center">
            Get started by adding a task
          </h2>
          <p className="text-sm text-zinc-300 mb-10 text-center max-w-md leading-relaxed">
            Schedule a task to automate actions and get reminders when they complete.
          </p>
          <Button
            variant="outline"
            onClick={onCreateTask}
            className="rounded-full border-zinc-700 bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-zinc-800 hover:border-zinc-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] active:scale-[0.97]"
          >
            <Plus className="size-4" />
            New task
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXAMPLES.map((example) => (
          <button
            key={example.title}
            onClick={onCreateTask}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 text-left transition-all hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0091ff]/[0.03] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-800 border border-zinc-700/50 group-hover:border-[#0091ff]/30 group-hover:bg-[#0091ff]/10 transition-colors">
                  <Settings2 className="size-3.5 text-zinc-300 group-hover:text-[#0091ff] transition-colors" />
                </div>
                <span className="font-bold text-white text-[15px]">{example.title}</span>
              </div>
              <p className="text-xs text-zinc-300 mb-3 pl-[34px]">{example.schedule}</p>
              <p className="text-sm text-zinc-300 leading-relaxed line-clamp-2 pl-[34px]">
                {example.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
