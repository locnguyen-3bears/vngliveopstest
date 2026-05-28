import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "border" | "soft" | "ghostSoft";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[28px] px-[var(--ads-spacing-3)] py-[6px] text-[length:var(--ads-font-size-12)]",
  md: "min-h-[36px] px-[var(--ads-spacing-4)] py-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-13)]",
  lg: "min-h-[40px] px-[var(--ads-spacing-5)] py-[10px] text-[length:var(--ads-font-size-14)]",
  xl: "min-h-[56px] px-[var(--ads-spacing-6)] py-[var(--ads-spacing-4)] text-[length:var(--ads-font-size-16)]",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "size-[28px]",
  md: "size-[36px]",
  lg: "size-[40px]",
  xl: "size-[56px]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ads-action-primary-bg)] text-[color:var(--ads-action-primary-text)] shadow-ads-primary hover:bg-[var(--ads-action-primary-bg-hover)] active:bg-[var(--ads-action-primary-bg-press)]",
  secondary:
    "bg-[var(--ads-action-secondary-bg)] text-[color:var(--ads-action-secondary-text)] hover:bg-[var(--ads-action-secondary-bg-hover)]",
  ghost:
    "bg-transparent text-[color:var(--ads-action-ghost-text)] hover:bg-[var(--ads-action-ghost-bg-hover)]",
  border:
    "border-[1.5px] border-[var(--ads-action-border-stroke)] bg-transparent text-[color:var(--ads-action-border-text)] hover:bg-[var(--ads-action-soft-bg)]",
  soft:
    "bg-[var(--ads-action-soft-bg)] text-[color:var(--ads-action-soft-text)] hover:bg-[var(--ads-action-soft-bg-hover)]",
  ghostSoft:
    "bg-transparent text-[color:var(--ads-action-soft-text)] hover:bg-[var(--ads-action-soft-bg)]",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: boolean;
};

function IconPlaceholder() {
  return <span aria-hidden="true" className="block size-4 rounded-[var(--radius-2)] bg-current" />;
}

export function Button({
  className,
  children = "Button",
  disabled,
  iconLeft,
  iconRight,
  iconOnly = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center gap-[var(--ads-spacing-2)] rounded-[var(--ads-radius-lg)] font-semibold leading-[var(--ads-line-height-20)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ads-border-brand)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
        iconOnly ? iconSizeClasses[size] : sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {iconLeft}
      {iconOnly ? children || <IconPlaceholder /> : children}
      {iconRight}
      {variant === "primary" && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[var(--ads-shadow-inset-action)]" />
      )}
    </button>
  );
}

export function IconButton(props: Omit<ButtonProps, "iconOnly">) {
  return <Button aria-label={props["aria-label"] ?? "Icon button"} iconOnly {...props} />;
}
