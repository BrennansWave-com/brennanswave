"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import type { ScheduledTask } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Plus, AlertTriangle, RotateCcw } from "lucide-react";
import { type FormState, TASKS_URL, DEFAULT_FORM, parseDateTimeToFields, parseTaskPrompt, buildScheduledDate } from "./task-utils";
import TaskEmptyState from "./TaskEmptyState";
import TaskList from "./TaskList";
import TaskFormDialog from "./TaskFormDialog";
import TaskDeleteDialog from "./TaskDeleteDialog";

interface Props {
  authToken: string;
  onCreateTaskRef?: React.MutableRefObject<(() => void) | null>;
}

export default function Manager({ authToken, onCreateTaskRef }: Props) {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [editingTask, setEditingTask] = useState<ScheduledTask | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ScheduledTask | null>(null);

  const headers = useMemo(() => ({
    Authorization: `Basic ${authToken}`,
  }), [authToken]);

  const fetchTasks = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .get(TASKS_URL, { headers })
      .then((res) => setTasks(Array.isArray(res.data?.tasks) ? res.data.tasks : []))
      .catch((err) => {
        setError(axios.isAxiosError(err) ? err.response?.data?.message ?? err.message : "Failed to load tasks");
      })
      .finally(() => setLoading(false));
  }, [headers]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const openCreateDialog = useCallback(() => {
    setForm(DEFAULT_FORM);
    setEditingTask(null);
    setFormError(null);
    setDialogOpen(true);
  }, []);

  useEffect(() => {
    if (onCreateTaskRef) {
      onCreateTaskRef.current = openCreateDialog;
    }
  }, [onCreateTaskRef, openCreateDialog]);

  const openEditDialog = (task: ScheduledTask) => {
    const parsed = parseTaskPrompt(task.prompt ?? "");
    const fields = parseDateTimeToFields(task.scheduled_for);
    setEditingTask(task);
    setForm({
      name: parsed.name,
      instructions: parsed.instructions,
      time: fields.time,
      date: fields.date,
      dayOfWeek: fields.dayOfWeek,
      dayOfMonth: fields.dayOfMonth,
      frequency: task.frequency ?? "once",
      agentUserId: task.agent_user_id ? String(task.agent_user_id) : "3",
      notifyVia: "email",
    });
    setFormError(null);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
    setForm(DEFAULT_FORM);
    setFormError(null);
  };

  const handleSubmit = () => {
    setFormError(null);
    const name = form.name.trim();
    const instructions = form.instructions.trim();
    if (!name && !instructions) { setFormError("Enter a task name or instructions."); return; }
    if (!form.time) { setFormError("Pick a time."); return; }
    if ((form.frequency === "once" || form.frequency === "yearly") && !form.date) { setFormError("Pick a date."); return; }
    const scheduledDate = buildScheduledDate(form);
    if (!scheduledDate || isNaN(scheduledDate.getTime())) { setFormError("Invalid schedule time."); return; }
    const prompt = instructions ? `${name}\n\n${instructions}` : name;
    const payload: Record<string, unknown> = {
      prompt,
      scheduled_for: scheduledDate.toISOString(),
      frequency: form.frequency,
    };
    if (form.frequency === "weekly") (payload as Record<string, number>).day_of_week = form.dayOfWeek;
    if (form.frequency === "monthly") (payload as Record<string, number>).day_of_month = form.dayOfMonth;
    if (form.agentUserId) (payload as Record<string, number>).agent_user_id = Number(form.agentUserId);
    (payload as Record<string, string>).notify_via = form.notifyVia;
    setSubmitting(true);
    const request = editingTask
      ? axios.put(`${TASKS_URL}/${editingTask.id}`, payload, { headers })
      : axios.post(TASKS_URL, payload, { headers });
    request
      .then(() => { closeDialog(); fetchTasks(); })
      .catch((err) => {
        setFormError(axios.isAxiosError(err) ? err.response?.data?.message ?? err.message : "Failed to save task");
      })
      .finally(() => setSubmitting(false));
  };

  const confirmStop = (task: ScheduledTask) => {
    const name = parseTaskPrompt(task.prompt ?? "").name;
    if (!window.confirm(`Stop "${name}"? It will no longer run and will appear in Past.`)) return;
    setSubmitting(true);
    axios
      .put(`${TASKS_URL}/${task.id}`, { status: "cancelled" }, { headers })
      .then((res) => {
        const updated = res.data?.task;
        if (updated) setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
      })
      .catch((err) => {
        setError(axios.isAxiosError(err) ? err.response?.data?.message ?? err.message : "Failed to stop task");
      })
      .finally(() => setSubmitting(false));
  };

  const confirmDelete = (task: ScheduledTask) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!taskToDelete) return;
    setSubmitting(true);
    axios
      .delete(`${TASKS_URL}/${taskToDelete.id}`, { headers })
      .then(() => { setDeleteDialogOpen(false); setTaskToDelete(null); fetchTasks(); })
      .catch((err) => {
        setError(axios.isAxiosError(err) ? err.response?.data?.message ?? err.message : "Failed to delete task");
      })
      .finally(() => setSubmitting(false));
  };

  const upcomingTasks = useMemo(() =>
    tasks
      .filter((t) => t.status === "pending" || t.status === "processing")
      .sort((a, b) => new Date(a.scheduled_for ?? "").getTime() - new Date(b.scheduled_for ?? "").getTime()),
    [tasks]
  );

  const pastTasks = useMemo(() =>
    tasks
      .filter((t) => t.status !== "pending" && t.status !== "processing")
      .sort((a, b) => new Date(b.scheduled_for ?? "").getTime() - new Date(a.scheduled_for ?? "").getTime()),
    [tasks]
  );

  return (
    <>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-white tracking-tight">Tasks</h1>
          <Button
            type="button"
            onClick={openCreateDialog}
            className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] hover:bg-white"
          >
            <Plus className="size-4 transition-transform group-hover:rotate-90" />
            Create task
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#0091ff]/20 blur-xl animate-pulse" />
              <Spinner className="relative size-8 text-[#0091ff]" />
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500/10 blur-2xl" />
              <div className="relative rounded-2xl bg-zinc-900/80 p-5 border border-red-500/20">
                <AlertTriangle className="size-10 text-red-400" />
              </div>
            </div>
            <p className="text-sm text-red-400 font-medium">{error}</p>
            <button
              onClick={fetchTasks}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <RotateCcw className="size-4" />
              Retry
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <TaskEmptyState onCreateTask={openCreateDialog} />
        ) : (
          <TaskList
            upcomingTasks={upcomingTasks}
            pastTasks={pastTasks}
            onEdit={openEditDialog}
            onStop={confirmStop}
            onDelete={confirmDelete}
          />
        )}
      </div>
      <TaskFormDialog
        open={dialogOpen}
        onClose={closeDialog}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        submitting={submitting}
        formError={formError}
        editingTask={editingTask}
      />
      <TaskDeleteDialog
        open={deleteDialogOpen}
        onClose={() => { setDeleteDialogOpen(false); setTaskToDelete(null); }}
        task={taskToDelete}
        onConfirm={handleDelete}
        submitting={submitting}
      />
    </>
  );
}
