import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "./utils";

type FieldSize = "L" | "M" | "S" | "lg" | "md" | "sm";
type FieldState = "Default" | "Disabled" | "Error" | "Filled" | "Focused" | "Hover" | "default" | "disabled" | "error" | "filled" | "focused" | "hover";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  error?: boolean;
  helperText?: ReactNode;
  label?: string;
  leading?: ReactNode;
  message?: ReactNode;
  size?: FieldSize;
  state?: FieldState;
  trailing?: ReactNode;
};

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
  error?: boolean;
  helperText?: ReactNode;
  label?: string;
  message?: ReactNode;
  size?: "LG" | "MD" | "SM" | "lg" | "md" | "sm";
  state?: FieldState;
};

function normalizeFieldSize(size: FieldSize = "S") {
  const normalized = size.toString().toLowerCase();
  if (normalized === "l" || normalized === "lg") return "lg";
  if (normalized === "m" || normalized === "md") return "md";
  return "sm";
}

function normalizeTextareaSize(size: TextareaProps["size"] = "SM") {
  const normalized = size.toString().toLowerCase();
  if (normalized === "lg") return "lg";
  if (normalized === "md") return "md";
  return "sm";
}

function normalizeFieldState(state?: FieldState) {
  return state?.toString().toLowerCase() as "default" | "disabled" | "error" | "filled" | "focused" | "hover" | undefined;
}

function hasFieldValue(value: unknown) {
  return value !== undefined && value !== null && String(value).length > 0;
}

const fieldSizeClasses = {
  lg: "min-h-[56px] rounded-[10px] px-[var(--ads-spacing-4)] py-[var(--ads-spacing-4)]",
  md: "min-h-[44px] rounded-[var(--ads-radius-lg)] px-[var(--ads-spacing-3)] py-[var(--ads-spacing-3)]",
  sm: "min-h-[32px] rounded-[var(--ads-radius-md)] px-[var(--ads-spacing-2)] py-[6px]",
};

const textareaSizeClasses = {
  lg: "h-[152px]",
  md: "h-[120px]",
  sm: "h-[88px]",
};

function fieldChrome(visualState: string) {
  if (visualState === "disabled") return "border-[var(--ads-border-default)] bg-[var(--ads-background-page)] text-[color:var(--ads-text-disabled)]";
  if (visualState === "error") return "border-[var(--ads-border-error)] bg-[var(--ads-surface-default)] shadow-[0_0_0_3px_var(--ads-action-danger-focus-ring)]";
  if (visualState === "focused") return "border-[var(--ads-border-focus)] bg-[var(--ads-surface-default)] shadow-[0_0_0_3px_var(--ads-action-focus-ring)]";
  if (visualState === "hover") return "border-[var(--ads-border-strong)] bg-[var(--ads-surface-subtle)]";
  return "border-[var(--ads-border-default)] bg-[var(--ads-surface-default)]";
}

export function TextField({
  className,
  disabled,
  error,
  helperText,
  label,
  leading,
  message,
  size = "S",
  state,
  trailing,
  value,
  defaultValue,
  ...props
}: TextFieldProps) {
  const fieldSize = normalizeFieldSize(size);
  const normalizedState = normalizeFieldState(state);
  const visualState = disabled ? "disabled" : error ? "error" : normalizedState ?? (hasFieldValue(value) || hasFieldValue(defaultValue) ? "filled" : "default");
  const supportingText = message ?? helperText;

  return (
    <label className="grid gap-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-13)] font-medium text-[color:var(--ads-text-default)]">
      {label && <span>{label}</span>}
      <span
        className={cn(
          "flex min-w-0 w-full items-center gap-[var(--ads-spacing-2)] border border-solid transition-colors focus-within:border-[var(--ads-border-focus)] focus-within:bg-[var(--ads-surface-default)] hover:border-[var(--ads-border-strong)] hover:bg-[var(--ads-surface-subtle)]",
          fieldSizeClasses[fieldSize],
          fieldChrome(visualState),
          className,
        )}
        data-component="TextField"
      >
        {leading && <span className="grid size-4 shrink-0 place-items-center text-[color:var(--ads-icon-subtle)]">{leading}</span>}
        <input
          aria-invalid={visualState === "error" || undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-[length:var(--ads-font-size-14)] font-normal leading-[var(--ads-line-height-20)] outline-none placeholder:text-[color:var(--ads-text-subtle)] disabled:cursor-not-allowed disabled:text-[color:var(--ads-text-disabled)]",
            visualState === "disabled" ? "text-[color:var(--ads-text-disabled)]" : visualState === "default" || visualState === "hover" ? "text-[color:var(--ads-text-subtle)]" : "text-[color:var(--ads-text-default)]",
          )}
          defaultValue={defaultValue}
          disabled={disabled || visualState === "disabled"}
          value={value}
          {...props}
        />
        {trailing && <span className="grid size-4 shrink-0 place-items-center text-[color:var(--ads-icon-subtle)]">{trailing}</span>}
      </span>
      {supportingText && <span className={cn("text-[length:var(--ads-font-size-12)] font-normal leading-[var(--ads-line-height-16)]", visualState === "error" ? "text-[color:var(--ads-border-error)]" : "text-[color:var(--ads-text-subtle)]")}>{supportingText}</span>}
    </label>
  );
}

export function Textarea({
  className,
  disabled,
  error,
  helperText,
  label = "FIELD LABEL",
  message,
  size = "SM",
  state,
  value,
  defaultValue,
  ...props
}: TextareaProps) {
  const textareaSize = normalizeTextareaSize(size);
  const normalizedState = normalizeFieldState(state);
  const visualState = disabled ? "disabled" : error ? "error" : normalizedState ?? (hasFieldValue(value) || hasFieldValue(defaultValue) ? "filled" : "default");
  const supportingText = message ?? helperText;

  return (
    <label className={cn("grid w-full gap-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-12)] font-semibold leading-[var(--ads-line-height-16)] text-[color:var(--ads-text-subtle)]", className)} data-component="Textarea">
      {label && <span>{label}</span>}
      <textarea
        aria-invalid={visualState === "error" || undefined}
        className={cn(
          "w-full resize-y rounded-[var(--ads-radius-md)] border-[1.5px] border-solid p-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-14)] font-normal leading-[var(--ads-line-height-20)] outline-none transition-colors placeholder:text-[color:var(--ads-text-subtle)] focus:border-[var(--ads-border-focus)] focus:bg-[var(--ads-surface-default)] hover:border-[var(--ads-border-strong)] hover:bg-[var(--ads-surface-subtle)] disabled:cursor-not-allowed disabled:text-[color:var(--ads-text-disabled)]",
          textareaSizeClasses[textareaSize],
          fieldChrome(visualState),
          visualState === "disabled" ? "text-[color:var(--ads-text-disabled)]" : visualState === "filled" ? "text-[color:var(--ads-text-default)]" : "text-[color:var(--ads-text-subtle)]",
        )}
        defaultValue={defaultValue}
        disabled={disabled || visualState === "disabled"}
        value={value}
        {...props}
      />
      {supportingText && <span className={cn("text-[length:var(--ads-font-size-12)] font-normal leading-[var(--ads-line-height-16)]", visualState === "error" ? "text-[color:var(--ads-border-error)]" : "text-[color:var(--ads-text-subtle)]")}>{supportingText}</span>}
    </label>
  );
}
