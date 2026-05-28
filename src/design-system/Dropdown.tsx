import { useMemo, useState, type ReactNode } from "react";
import { Icon } from "./Icons";
import { cn } from "./utils";

type DropdownType = "Multi" | "Single" | "multi" | "single";
type DropdownState = "Default" | "Disabled" | "Error" | "Filled" | "Open" | "default" | "disabled" | "error" | "filled" | "open";
type DropdownOptionState = "Default" | "Disabled" | "Hover" | "Selected" | "default" | "disabled" | "hover" | "selected";

export type DropdownItem = {
  disabled?: boolean;
  label: ReactNode;
  value: string;
};

export type DropdownOptionProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
  selected?: boolean;
  state?: DropdownOptionState;
  type?: DropdownType;
};

export type DropdownProps = {
  className?: string;
  count?: number;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  onChange?: (value: string | string[]) => void;
  options?: DropdownItem[];
  placeholder?: string;
  selectedValues?: string[];
  state?: DropdownState;
  type?: DropdownType;
  value?: string;
};

function normalizeDropdownType(type: DropdownType = "Single") {
  return type.toString().toLowerCase() === "multi" ? "multi" : "single";
}

function normalizeDropdownState(state?: DropdownState | DropdownOptionState) {
  return state?.toString().toLowerCase() as "default" | "disabled" | "error" | "filled" | "hover" | "open" | "selected" | undefined;
}

const defaultOptions: DropdownItem[] = [
  { label: "Ten tuy chon", value: "option-a" },
  { label: "Ten tuy chon", value: "option-b" },
  { label: "Ten tuy chon", value: "option-c" },
  { disabled: true, label: "Ten tuy chon", value: "option-d" },
];

export function DropdownOption({ children = "Ten tuy chon", className, disabled, onSelect, selected, state, type = "Single" }: DropdownOptionProps) {
  const optionType = normalizeDropdownType(type);
  const normalizedState = normalizeDropdownState(state);
  const visualState = disabled ? "disabled" : selected ? "selected" : normalizedState ?? "default";
  const isSelected = visualState === "selected";
  const isDisabled = visualState === "disabled";

  return (
    <button
      className={cn(
        "flex h-[36px] w-full items-center gap-[var(--ads-spacing-2)] px-[var(--ads-spacing-3)] text-left text-[length:var(--ads-font-size-14)] leading-[var(--ads-line-height-20)] transition-colors",
        visualState === "hover" && "bg-[var(--ads-feedback-brand-bg)]",
        isSelected && "bg-[var(--ads-background-brand-subtle)] font-semibold",
        !isSelected && !isDisabled && visualState !== "hover" && "bg-[var(--ads-surface-default)]",
        isDisabled && "cursor-not-allowed bg-[var(--ads-surface-default)] text-[color:var(--ads-text-disabled)]",
        className,
      )}
      disabled={isDisabled}
      onClick={onSelect}
      role="option"
      type="button"
    >
      {optionType === "multi" && !isSelected && (
        <span className={cn("grid size-4 shrink-0 place-items-center rounded-[var(--ads-radius-sm)] border-[1.5px] border-[var(--ads-border-default)]", isDisabled ? "bg-[var(--ads-background-subtle)]" : "bg-[var(--ads-surface-default)]")} />
      )}
      {isSelected && (
        <span className="grid size-4 shrink-0 place-items-center text-[color:var(--ads-text-brand)]">
          <Icon name="check" size={14} strokeWidth={2.2} />
        </span>
      )}
      <span
        className={cn(
          "min-w-0 flex-1 truncate",
          isSelected && optionType === "single" && "text-[color:var(--ads-text-brand)]",
          isSelected && optionType === "multi" && "text-[color:var(--ads-text-default)]",
          !isSelected && !isDisabled && "text-[color:var(--ads-text-default)]",
        )}
      >
        {children}
      </span>
    </button>
  );
}

export function DropdownList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[var(--ads-radius-lg)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] py-[6px] shadow-[var(--ads-shadow-card)]", className)} role="listbox">
      {children}
    </div>
  );
}

export function Dropdown({
  className,
  count,
  disabled,
  error,
  label,
  onChange,
  options = defaultOptions,
  placeholder,
  selectedValues,
  state,
  type = "Single",
  value,
}: DropdownProps) {
  const dropdownType = normalizeDropdownType(type);
  const [open, setOpen] = useState(false);
  const [internalValues, setInternalValues] = useState<string[]>(selectedValues ?? (value ? [value] : []));
  const currentValues = selectedValues ?? internalValues;
  const selectedItems = useMemo(() => options.filter((option) => currentValues.includes(option.value)), [currentValues, options]);
  const normalizedState = normalizeDropdownState(state);
  const visualState = disabled ? "disabled" : error ? "error" : open || normalizedState === "open" ? "open" : normalizedState ?? (selectedItems.length > 0 ? "filled" : "default");
  const isMulti = dropdownType === "multi";
  const selectedCount = count ?? selectedItems.length;
  const displayText = selectedItems[0]?.label ?? placeholder ?? (isMulti ? "Chon nhieu gia tri" : "Chon mot gia tri");

  const handleSelect = (item: DropdownItem) => {
    if (item.disabled) return;
    const nextValues = isMulti
      ? currentValues.includes(item.value)
        ? currentValues.filter((current) => current !== item.value)
        : [...currentValues, item.value]
      : [item.value];

    setInternalValues(nextValues);
    onChange?.(isMulti ? nextValues : item.value);
    if (!isMulti) setOpen(false);
  };

  return (
    <label className={cn("relative grid w-[280px] gap-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-13)] font-medium text-[color:var(--ads-text-default)]", className)} data-component="Dropdown">
      {label && <span>{label}</span>}
      <button
        className={cn(
          "flex h-[44px] w-full items-center justify-center gap-[var(--ads-spacing-2)] rounded-[var(--ads-radius-lg)] border border-solid px-[var(--ads-spacing-3)] text-left text-[length:var(--ads-font-size-14)] leading-[var(--ads-line-height-20)] transition-colors",
          visualState === "disabled" && "cursor-not-allowed border-[var(--ads-border-default)] bg-[var(--ads-background-page)] text-[color:var(--ads-text-disabled)]",
          visualState === "error" && "border-[var(--ads-border-error)] bg-[var(--ads-surface-default)]",
          visualState === "open" && "border-[var(--ads-border-brand)] bg-[var(--ads-surface-default)]",
          visualState === "filled" && "border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] font-semibold text-[color:var(--ads-text-default)]",
          visualState === "default" && "border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] text-[color:var(--ads-text-subtle)]",
        )}
        disabled={disabled || visualState === "disabled"}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {isMulti && selectedCount > 0 && visualState !== "disabled" && (
          <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-[var(--ads-action-primary-bg)] text-[length:var(--ads-font-size-11)] font-medium leading-[var(--ads-line-height-16)] text-[color:var(--ads-text-inverse)]">
            {selectedCount}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate">{isMulti && selectedCount > 0 ? "muc da chon" : displayText}</span>
        <Icon className="text-[color:var(--ads-icon-subtle)]" name="chevronDown" size={16} />
      </button>
      {open && visualState !== "disabled" && (
        <DropdownList className="absolute left-0 top-[calc(100%+4px)] z-20 w-full">
          {options.map((option) => (
            <DropdownOption disabled={option.disabled} key={option.value} onSelect={() => handleSelect(option)} selected={currentValues.includes(option.value)} type={dropdownType}>
              {option.label}
            </DropdownOption>
          ))}
        </DropdownList>
      )}
    </label>
  );
}
