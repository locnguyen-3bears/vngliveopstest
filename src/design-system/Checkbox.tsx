import type { InputHTMLAttributes } from "react";
import { cn } from "./utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export function Checkbox({ className, label, ...props }: CheckboxProps) {
  return (
    <label className={cn("inline-flex items-center gap-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-14)]", className)}>
      <input
        className="size-4 rounded-[var(--radius-3)] border-[1.5px] border-[var(--ads-feedback-neutral-border)] text-[var(--ads-background-brand)] accent-[var(--ads-background-brand)]"
        type="checkbox"
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
