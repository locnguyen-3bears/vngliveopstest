import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

type ButtonBuilderProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  icon?: ReactNode;
  state?: "default" | "hover" | "grabbing";
  text?: string;
};

export function ButtonBuilder({ className, icon, state = "default", text = "Full Width", ...props }: ButtonBuilderProps) {
  const isActiveState = state === "hover" || state === "grabbing";

  return (
    <div
      className={cn(
        "group relative flex h-[var(--ads-builder-button-height)] w-full flex-col items-center justify-center gap-[var(--ads-builder-button-gap)] rounded-[var(--ads-builder-button-radius)] border-solid p-[var(--ads-builder-button-padding)] transition-[background-color,border-color,box-shadow]",
        state === "hover" &&
          "border-[length:var(--ads-builder-button-border-default)] border-[var(--ads-builder-button-border-hover-color)] bg-[var(--ads-builder-button-bg-hover)] shadow-ads-hover",
        state === "grabbing" &&
          "border-[length:var(--ads-builder-button-border-selected)] border-[var(--ads-builder-button-border-selected-color)] bg-[var(--ads-builder-button-bg-grabbing)]",
        state === "default" &&
          "border-[length:var(--ads-builder-button-border-default)] border-[var(--ads-builder-button-border-default-color)] bg-[var(--ads-builder-button-bg-default)] hover:border-[var(--ads-builder-button-border-hover-color)] hover:bg-[var(--ads-builder-button-bg-hover)] hover:shadow-ads-hover",
        className,
      )}
      data-component="ButtonBuilder"
      data-state={state}
      {...props}
    >
      <div
        className={cn(
          "grid size-6 shrink-0 place-items-center text-[color:var(--ads-builder-button-icon-color)] transition-[color,opacity] group-hover:opacity-100",
          state === "default" && "opacity-[var(--ads-builder-button-text-default-opacity)]",
          isActiveState && "opacity-100",
        )}
      >
        {icon ?? <span className="block size-6 rounded-[var(--radius-2)] border border-[var(--zinc-500)]" />}
      </div>
      <p
        className={cn(
          "w-full text-center text-[length:var(--ads-font-size-11)] font-semibold leading-[var(--ads-line-height-16)] text-[color:var(--ads-builder-button-text-default)] transition-[color,opacity] group-hover:text-[color:var(--ads-builder-button-text-hover)] group-hover:opacity-100",
          state === "default" && "opacity-[var(--ads-builder-button-text-default-opacity)]",
          isActiveState && "text-[color:var(--ads-builder-button-text-hover)] opacity-100",
        )}
      >
        {text}
      </p>
    </div>
  );
}
