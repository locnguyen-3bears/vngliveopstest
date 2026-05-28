import { cn } from "./utils";

type PaginationProps = {
  className?: string;
  currentPage?: number;
  label?: string;
  pages?: number;
};

export function Pagination({ className, currentPage = 1, label = "Showing 1-5 of 24 segments", pages = 3 }: PaginationProps) {
  return (
    <div className={cn("flex items-center justify-between border-t border-[var(--ads-border-default)] px-[var(--ads-spacing-5)] py-[var(--ads-spacing-4)]", className)}>
      <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">{label}</p>
      <div className="flex items-center gap-[var(--ads-spacing-2)]">
        <button className="font-semibold text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-muted)]" type="button">
          ← Prev
        </button>
        {Array.from({ length: pages }, (_, index) => index + 1).map((page) => (
          <button
            className={cn(
              "grid size-[28px] place-items-center rounded-[var(--ads-radius-sm)] border text-[length:var(--ads-font-size-13)] font-medium",
              page === currentPage
                ? "border-[var(--ads-action-primary-bg)] bg-[var(--ads-action-primary-bg)] text-[color:var(--ads-action-primary-text)]"
                : "border-[var(--ads-border-subtle)] bg-[var(--ads-surface-default)] text-[color:var(--ads-text-subtle)]",
            )}
            key={page}
            type="button"
          >
            {page}
          </button>
        ))}
        <button className="font-semibold text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-default)]" type="button">
          Next →
        </button>
      </div>
    </div>
  );
}
