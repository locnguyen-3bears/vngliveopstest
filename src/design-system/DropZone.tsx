import type { DragEvent, HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type DropZoneState = "Idle" | "DragOver";

type DropZoneDropData = {
  existingId: string;
  kind: string;
};

type DropZoneProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "onDrop"> & {
  children?: ReactNode;
  fullWidth?: boolean;
  onDropData?: (data: DropZoneDropData, event: DragEvent<HTMLDivElement>) => void;
  state?: DropZoneState;
};

export function DropZone({ children, className, fullWidth = false, onDragOver, onDropData, state = "Idle", ...props }: DropZoneProps) {
  const isDragOver = state === "DragOver";

  return (
    <div
      className={cn(
        "relative flex h-[var(--ads-drop-zone-height)] flex-col items-center justify-center gap-[var(--ads-drop-zone-gap)] rounded-[var(--ads-drop-zone-radius)] border-[length:var(--ads-drop-zone-border)] border-dashed transition-[background-color,border-color,color,opacity]",
        fullWidth ? "w-full max-w-none" : "w-[var(--ads-drop-zone-width)] max-w-[var(--ads-drop-zone-max-width)]",
        isDragOver
          ? "border-[var(--ads-drop-zone-accent)] text-[color:var(--ads-drop-zone-accent)]"
          : "border-[var(--ads-drop-zone-border-idle)] bg-[var(--ads-drop-zone-bg-idle)] text-[color:var(--ads-drop-zone-text-idle)]",
        className,
      )}
      data-component="DropZone"
      data-full-width={fullWidth ? "true" : "false"}
      data-state={state}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        onDragOver?.(event);
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onDropData?.(
          {
            existingId: event.dataTransfer.getData("application/x-builder-existing"),
            kind: event.dataTransfer.getData("application/x-builder-block"),
          },
          event,
        );
      }}
      {...props}
    >
      <span className="relative block size-4 shrink-0" aria-hidden="true">
        <span className={cn("absolute left-0 top-[7px] h-[2px] w-4 rounded-[var(--radius-1)]", isDragOver ? "bg-[var(--ads-drop-zone-accent)]" : "bg-[var(--ads-drop-zone-icon-idle)]")} />
        <span className={cn("absolute left-[7px] top-0 h-4 w-[2px] rounded-[var(--radius-1)]", isDragOver ? "bg-[var(--ads-drop-zone-accent)]" : "bg-[var(--ads-drop-zone-icon-idle)]")} />
      </span>
      <p className={cn("whitespace-nowrap text-[11px] leading-none", isDragOver ? "font-medium" : "font-normal")}>
        {children ?? (isDragOver ? "Release to drop" : "Drop here")}
      </p>
    </div>
  );
}
