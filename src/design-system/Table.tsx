import type { ReactNode } from "react";
import { Badge, type BadgeStatus } from "./Badge";
import { Checkbox } from "./Checkbox";
import { IconButton } from "./Button";
import { cn } from "./utils";

type TableCellProps = {
  children?: ReactNode;
  className?: string;
  width?: string;
};

export function TableCell({ children = "Cell content", className, width = "w-[140px]" }: TableCellProps) {
  return (
    <div className={cn("flex h-[56px] max-h-[56px] items-center px-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-14)] text-[color:var(--ads-text-default)]", width, className)}>
      {children}
    </div>
  );
}

export function TableHeaderCell({
  children = "Label",
  type = "label",
  width = "w-[120px]",
}: {
  children?: ReactNode;
  type?: "checkbox" | "label";
  width?: string;
}) {
  if (type === "checkbox") {
    return (
      <div className={cn("flex h-[44px] items-center justify-center bg-[var(--ads-surface-subtle)]", width)}>
        <Checkbox aria-label="Select all rows" />
      </div>
    );
  }

  return (
    <div className={cn("flex h-[44px] items-center bg-[var(--ads-surface-subtle)] px-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-11)] font-medium uppercase leading-[var(--ads-line-height-16)] text-[color:var(--ads-text-subtle)]", width)}>
      {children}
    </div>
  );
}

export function TableCheckboxCell() {
  return (
    <div className="flex h-[56px] w-[40px] items-center justify-center">
      <Checkbox aria-label="Select row" />
    </div>
  );
}

export function TableTextSub({ primary = "Campaign Name", secondary = "Jan 22" }: { primary?: string; secondary?: string }) {
  return (
    <TableCell width="w-[200px]">
      <span className="grid gap-[2px] whitespace-nowrap">
        <span className="font-medium">{primary}</span>
        <span className="text-[length:var(--ads-font-size-11)] text-[color:var(--ads-text-subtle)]">{secondary}</span>
      </span>
    </TableCell>
  );
}

export function TableBasicCell({
  children = "Cell content",
  emphasis = "strong",
  width = "w-[140px]",
}: {
  children?: ReactNode;
  emphasis?: "medium" | "strong";
  width?: string;
}) {
  return (
    <TableCell className={cn(emphasis === "medium" && "text-[color:var(--ads-text-secondary)]")} width={width}>
      {children}
    </TableCell>
  );
}

export function TableStatusCell({ status = "live", label = "Live" }: { status?: BadgeStatus; label?: string }) {
  return (
    <TableCell width="w-[80px] max-w-[88px]">
      <Badge status={status}>{label}</Badge>
    </TableCell>
  );
}

export function TableBadgeCell({ status = "live" }: { status?: BadgeStatus }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <TableStatusCell label={label} status={status} />;
}

export function TableProgress({ value = "44.2% open", progress = 44 }: { value?: string; progress?: number }) {
  return (
    <TableCell width="w-[120px]">
      <span className="grid w-[96px] gap-[4px]">
        <span className="whitespace-nowrap text-[length:var(--ads-font-size-13)]">{value}</span>
        <span className="h-1 rounded-[var(--radius-2)] bg-[var(--ads-background-muted)]">
          <span className="block h-1 rounded-[var(--radius-2)] bg-[var(--ads-background-brand)]" style={{ width: `${progress}%` }} />
        </span>
      </span>
    </TableCell>
  );
}

export function TableActionsCell() {
  return (
    <div className="flex h-[56px] w-[40px] items-center justify-center">
      <IconButton size="sm" variant="ghost">
        <span className="block size-[14px] rounded-[var(--radius-2)] bg-current" />
      </IconButton>
    </div>
  );
}

export function TableRow({ selected = false }: { selected?: boolean }) {
  return (
    <div
      className={cn(
        "flex w-full min-w-[640px] items-center border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] transition-colors hover:bg-[var(--ads-surface-subtle)]",
        selected && "bg-[var(--ads-feedback-brand-bg)] ring-1 ring-[var(--ads-border-brand)]",
      )}
    >
      <TableCheckboxCell />
      <TableTextSub />
      <TableStatusCell />
      <TableBasicCell>Cell content</TableBasicCell>
      <TableProgress />
      <TableActionsCell />
    </div>
  );
}

export function DataTable() {
  return (
    <div className="overflow-hidden rounded-[var(--ads-radius-lg)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)]">
      <div className="flex min-w-[640px] bg-[var(--ads-surface-subtle)] text-[length:var(--ads-font-size-12)] font-semibold uppercase text-[color:var(--ads-text-subtle)]">
        <TableHeaderCell type="checkbox" width="w-[40px]" />
        <TableHeaderCell width="w-[200px]">Campaign</TableHeaderCell>
        <TableHeaderCell width="w-[80px]">Status</TableHeaderCell>
        <TableHeaderCell width="w-[140px]">Owner</TableHeaderCell>
        <TableHeaderCell width="w-[120px]">Progress</TableHeaderCell>
        <TableHeaderCell width="w-[40px]" />
      </div>
      <TableRow />
      <TableRow selected />
      <TableRow />
    </div>
  );
}
