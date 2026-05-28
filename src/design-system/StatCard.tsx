import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icons";
import { cn } from "./utils";

type StatCardProps = {
  accent?: boolean;
  change?: ReactNode;
  className?: string;
  icon?: IconName;
  label: ReactNode;
  value: ReactNode;
};

export function StatCard({ accent = false, change, className, icon = "folder", label, value }: StatCardProps) {
  return (
    <article className={cn("grid min-h-[104px] gap-[var(--ads-spacing-1)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-4)]", className)}>
      <div className="flex items-center justify-between gap-[var(--ads-spacing-3)]">
        <p className="text-[10px] font-medium uppercase leading-[var(--ads-line-height-16)] text-[color:var(--ads-icon-subtle)]">{label}</p>
        <Icon className="text-[color:var(--ads-icon-subtle)]" name={icon} />
      </div>
      <p className={cn("text-[length:var(--ads-font-size-24)] font-semibold leading-[var(--ads-line-height-32)]", accent && "text-[color:var(--ads-action-primary-bg)]")}>{value}</p>
      {change && <div className="text-[length:var(--ads-font-size-11)] text-[color:var(--ads-feedback-success-icon)]">{change}</div>}
    </article>
  );
}
