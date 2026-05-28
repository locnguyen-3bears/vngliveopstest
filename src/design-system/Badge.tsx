import type { HTMLAttributes } from "react";
import { cn } from "./utils";

export type BadgeStatus = "active" | "brand" | "draft" | "ended" | "error" | "live" | "neutral" | "scheduled" | "success" | "warning";

const statusClasses: Record<BadgeStatus, string> = {
  active: "bg-[var(--status-active)] text-[color:var(--ads-text-inverse)]",
  brand: "bg-[var(--ads-feedback-brand-border)] text-[color:var(--ads-text-brand)]",
  draft: "bg-[var(--status-draft)] text-[color:var(--ads-text-inverse)]",
  ended: "bg-[var(--status-ended)] text-[color:var(--ads-text-inverse)]",
  error: "bg-[var(--ads-feedback-error-bg)] text-[color:var(--ads-feedback-error-icon)]",
  live: "bg-[var(--status-live)] text-[color:var(--ads-text-inverse)]",
  neutral: "bg-[var(--ads-background-muted)] text-[color:var(--ads-text-subtle)]",
  scheduled: "bg-[var(--status-scheduled)] text-[color:var(--ads-text-inverse)]",
  success: "bg-[var(--ads-feedback-success-bg)] text-[color:var(--ads-feedback-success-icon)]",
  warning: "bg-[var(--ads-feedback-warning-bg)] text-[color:var(--ads-feedback-warning-icon)]",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  dot?: boolean;
  status?: BadgeStatus;
};

export function Badge({ className, children = "Label", dot = false, status = "live", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[20px] max-h-[20px] items-center justify-center gap-[var(--ads-spacing-1)] rounded-[var(--radius-99)] px-[var(--ads-spacing-2)] py-[var(--ads-spacing-1)] text-[length:var(--ads-font-size-11)] font-semibold leading-none",
        statusClasses[status],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-[6px] rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}
