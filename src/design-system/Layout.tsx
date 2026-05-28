import type { ReactNode } from "react";
import { Button } from "./Button";
import { Icon } from "./Icons";
import { TextField } from "./TextField";
import { cn } from "./utils";

export function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-12)]" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span className="contents" key={item}>
          {index > 0 && <span className="text-[color:var(--ads-icon-subtle)]">/</span>}
          <span className={cn(index === items.length - 1 ? "font-semibold text-[color:var(--ads-text-default)]" : "font-medium text-[color:var(--ads-text-secondary)]")}>{item}</span>
        </span>
      ))}
    </nav>
  );
}

type TopbarProps = {
  actions?: ReactNode;
  breadcrumbs?: string[];
  search?: boolean;
  title?: string;
};

export function Topbar({ actions, breadcrumbs, search = false, title }: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between gap-[var(--ads-spacing-4)] border-b border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] px-[var(--ads-spacing-8)]">
      <div className="min-w-0">
        {breadcrumbs ? (
          <div className="flex items-center gap-[var(--ads-spacing-3)]">
            <Icon className="text-[color:var(--ads-text-secondary)]" name="arrowLeft" size={20} />
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : (
          <h1 className="truncate text-[length:var(--ads-font-size-18)] font-semibold leading-[var(--ads-line-height-28)]">{title}</h1>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-[var(--ads-spacing-3)]">
        {search && <TextField aria-label="Search" className="w-[320px]" placeholder="Search..." />}
        {actions ?? (
          <>
            <Button variant="ghost">Preview</Button>
            <Button variant="ghost">Save Draft</Button>
            <Button>Publish</Button>
          </>
        )}
      </div>
    </header>
  );
}

export function PageHeader({ children, subtitle, title }: { children?: ReactNode; subtitle?: ReactNode; title: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-[var(--ads-spacing-4)]">
      <div className="grid gap-[var(--ads-spacing-1)]">
        <h1 className="text-[length:var(--ads-font-size-24)] font-extrabold leading-[var(--ads-line-height-32)]">{title}</h1>
        {subtitle && <p className="text-[length:var(--ads-font-size-14)] text-[color:var(--ads-text-subtle)]">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
