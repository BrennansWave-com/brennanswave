"use client";

import type { ScheduledTask } from "@/types/task";
import TaskRow from "./TaskRow";

interface TaskListProps {
  upcomingTasks: ScheduledTask[];
  pastTasks: ScheduledTask[];
  onEdit: (task: ScheduledTask) => void;
  onStop?: (task: ScheduledTask) => void;
  onDelete: (task: ScheduledTask) => void;
}

export default function TaskList({ upcomingTasks, pastTasks, onEdit, onStop, onDelete }: TaskListProps) {
  return (
    <div className="space-y-8">
      {upcomingTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
              <div className="size-1.5 rounded-full bg-green-500" />
            </div>
            <h2 className="text-xs font-semibold text-green-500/90 uppercase tracking-[0.15em]">Upcoming</h2>
            <span className="text-xs text-zinc-600">{upcomingTasks.length}</span>
          </div>
          <div className="space-y-2">
            {upcomingTasks.map((task) => (
              <TaskRow key={task.id} task={task} variant="upcoming" onEdit={onEdit} onStop={onStop} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
      {pastTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800">
              <div className="size-1.5 rounded-full bg-zinc-500" />
            </div>
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em]">Past</h2>
            <span className="text-xs text-zinc-600">{pastTasks.length}</span>
          </div>
          <div className="space-y-2">
            {pastTasks.map((task) => (
              <TaskRow key={task.id} task={task} variant="past" onEdit={onEdit} onStop={onStop} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
