import { Clock, Loader2, CheckCircle2, XCircle, X } from "lucide-react";

export const STATUS_CONFIG: Record<string, { icon: React.ReactNode; label: string; dot: string; bg: string }> = {
  pending: {
    icon: <Clock className="size-3" />,
    label: "Pending",
    dot: "bg-green-500",
    bg: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  processing: {
    icon: <Loader2 className="size-3 animate-spin" />,
    label: "Running",
    dot: "bg-sky-400 animate-pulse",
    bg: "bg-sky-400/10 text-sky-300 border-sky-400/20",
  },
  completed: {
    icon: <CheckCircle2 className="size-3" />,
    label: "Completed",
    dot: "bg-[#0091ff]",
    bg: "bg-[#0091ff]/10 text-[#0091ff] border-[#0091ff]/20",
  },
  failed: {
    icon: <XCircle className="size-3" />,
    label: "Failed",
    dot: "bg-red-400",
    bg: "bg-red-400/10 text-red-300 border-red-400/20",
  },
  cancelled: {
    icon: <X className="size-3" />,
    label: "Cancelled",
    dot: "bg-zinc-500",
    bg: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  },
};
