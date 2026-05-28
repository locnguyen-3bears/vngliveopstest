import type { ReactNode } from "react";
import { cn } from "./utils";

type TabItem = {
  count?: number;
  id: string;
  label: ReactNode;
};

type FilterTabsProps = {
  activeId?: string;
  className?: string;
  items: TabItem[];
  variant?: "pill" | "underline";
};

export function FilterTabs({ activeId, className, items, variant = "pill" }: FilterTabsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-[var(--ads-spacing-2)]", className)} role="tablist">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            className={cn(
              "inline-flex items-center justify-center gap-[var(--ads-spacing-1)] whitespace-nowrap text-[length:var(--ads-font-size-14)] font-medium transition-colors",
              variant === "pill" &&
                "rounded-[var(--ads-radius-2xl)] px-[var(--ads-spacing-4)] py-[var(--ads-spacing-2)]",
              variant === "pill" && active && "bg-[var(--ads-feedback-brand-border)] font-semibold text-[color:var(--ads-text-brand)]",
              variant === "pill" && !active && "bg-[var(--ads-background-subtle)] text-[color:var(--ads-text-subtle)] hover:text-[color:var(--ads-text-default)]",
              variant === "underline" && "border-b-2 px-[var(--ads-spacing-2)] py-[var(--ads-spacing-2)]",
              variant === "underline" && active && "border-[var(--ads-border-brand)] text-[color:var(--ads-text-brand)]",
              variant === "underline" && !active && "border-transparent text-[color:var(--ads-text-subtle)]",
            )}
            key={item.id}
            role="tab"
            type="button"
          >
            {item.label}
            {item.count !== undefined && <span className="text-[length:var(--ads-font-size-12)] opacity-70">{item.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
