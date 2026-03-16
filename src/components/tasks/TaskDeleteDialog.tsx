"use client";

import type { ScheduledTask } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Clock, AlertTriangle } from "lucide-react";
import { parseTaskPrompt, formatScheduleLabel } from "./task-utils";

interface TaskDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  task: ScheduledTask | null;
  onConfirm: () => void;
  submitting: boolean;
}

export default function TaskDeleteDialog({ open, onClose, task, onConfirm, submitting }: TaskDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="bg-[#0c0c0c] text-white border border-zinc-800/80 sm:max-w-md shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2.5 text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="size-4 text-red-400" />
            </div>
            Delete task
          </DialogTitle>
          <DialogDescription className="text-zinc-300 text-sm leading-relaxed">
            This task will be permanently deleted. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {task && (
          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-4">
            <p className="text-sm font-semibold text-white">
              {parseTaskPrompt(task.prompt ?? "").name}
            </p>
            <p className="text-xs text-zinc-600 mt-1.5 flex items-center gap-1.5">
              <Clock className="size-3" />
              {formatScheduleLabel(task.scheduled_for)}
            </p>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            className="border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={submitting}
            className="rounded-lg"
          >
            {submitting ? (
              <>
                <Spinner className="size-4" />
                Deleting...
              </>
            ) : (
              "Delete task"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
