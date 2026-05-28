import { useRef, useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { Icon } from "./Icons";
import { cn } from "./utils";

type SearchFieldSize = "M" | "S" | "m" | "s";
type SearchFieldState = "Default" | "Disabled" | "Filled" | "Focused" | "default" | "disabled" | "filled" | "focused";

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  clearVisibility?: "always" | "auto";
  hasClear?: boolean;
  hasLeading?: boolean;
  size?: SearchFieldSize;
  state?: SearchFieldState;
};

function normalizeSize(size: SearchFieldSize = "S") {
  return size.toString().toLowerCase() === "m" ? "M" : "S";
}

function normalizeState(state?: SearchFieldState) {
  return state?.toString().toLowerCase() as "default" | "disabled" | "filled" | "focused" | undefined;
}

function hasValue(value: unknown) {
  return value !== undefined && value !== null && String(value).length > 0;
}

export function SearchField({
  className,
  clearVisibility = "always",
  defaultValue,
  disabled,
  hasClear = true,
  hasLeading = true,
  onChange,
  placeholder = "Search components...",
  size = "S",
  state,
  style,
  value,
  ...props
}: SearchFieldProps) {
  const normalizedSize = normalizeSize(size);
  const normalizedState = normalizeState(state);
  const initialUncontrolledValue = defaultValue ?? (normalizedState === "filled" ? placeholder : "");
  const [uncontrolledValue, setUncontrolledValue] = useState(String(initialUncontrolledValue));
  const currentValue = value === undefined ? uncontrolledValue : String(value);
  const visualState = disabled ? "disabled" : normalizedState ?? (hasValue(currentValue) ? "filled" : "default");
  const isSmall = normalizedSize === "S";
  const isFocused = visualState === "focused";
  const isDisabled = visualState === "disabled";
  const isFilled = visualState === "filled";
  const inputRef = useRef<HTMLInputElement>(null);

  const iconSize = isSmall ? 14 : 16;
  const clearIconSize = isSmall ? 12 : 14;
  const resolvedDefaultValue = value === undefined ? uncontrolledValue : undefined;
  const resolvedPlaceholder = isFilled ? undefined : placeholder;
  const showClear = hasClear && (clearVisibility === "always" || (!isDisabled && hasValue(currentValue)));

  return (
    <label
      className={cn(
        "flex w-[208px] min-w-0 items-center rounded-[var(--ads-search-field-radius)] bg-[var(--ads-sidebar-bg-active)] text-[color:var(--sidebar-text)] transition-[border-color,border-width,opacity]",
        "gap-[var(--ads-search-field-gap)] border border-[var(--ads-search-field-border-color-default)]",
        "focus-within:border-[length:var(--ads-search-field-border-focus)] focus-within:border-[var(--ads-search-field-border-color-focus)]",
        isSmall
          ? "h-[var(--ads-search-field-size-s)] px-[var(--ads-search-field-padding-x-s)] py-[var(--ads-search-field-padding-y-s)]"
          : "h-[var(--ads-search-field-size-m)] px-[var(--ads-search-field-padding-x-m)] py-[var(--ads-search-field-padding-y-m)]",
        isFocused && "border-[length:var(--ads-search-field-border-focus)] border-[var(--ads-search-field-border-color-focus)]",
        isDisabled && "opacity-40",
        className,
      )}
      data-component="SearchField"
      data-size={normalizedSize}
      data-state={visualState}
      style={{
        borderColor: isFocused ? "var(--ads-search-field-border-color-focus)" : "var(--ads-search-field-border-color-default)",
        borderWidth: isFocused ? "var(--ads-search-field-border-focus)" : "var(--ads-search-field-border-default)",
        ...style,
      }}
    >
      {hasLeading && (
        <Icon
          className={cn("text-[color:var(--sidebar-icon)]", isSmall && visualState === "default" && "opacity-70")}
          name="search"
          size={iconSize}
          strokeWidth={1.8}
        />
      )}
      <input
        className={cn(
          "min-w-0 flex-1 bg-transparent font-normal leading-[var(--ads-line-height-20)] outline-none placeholder:text-[color:var(--gray-400)] disabled:cursor-not-allowed",
          isSmall ? "text-[length:var(--ads-font-size-12)]" : "text-[length:var(--ads-font-size-14)]",
          isDisabled
            ? "text-[color:var(--ads-search-field-text-disabled)] placeholder:text-[color:var(--ads-search-field-text-disabled)]"
            : isFilled
              ? "text-[color:var(--sidebar-text)]"
              : "text-[color:var(--ads-search-field-text-subtle)]",
          isSmall && visualState === "default" && "opacity-70",
        )}
        defaultValue={resolvedDefaultValue}
        disabled={isDisabled}
        ref={inputRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (value === undefined) setUncontrolledValue(event.target.value);
          onChange?.(event);
        }}
        placeholder={resolvedPlaceholder}
        value={value}
        {...props}
      />
      {showClear && (
        <button
          aria-label="Clear search"
          className={cn(
            "grid shrink-0 place-items-center text-[color:var(--sidebar-icon)] transition-colors hover:text-[color:var(--ads-text-inverse)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--indigo-500)]",
            isSmall ? "size-[14px]" : "size-[16px]",
            isSmall && visualState === "default" && "opacity-70",
          )}
          disabled={isDisabled}
          onClick={() => {
            if (value === undefined) {
              setUncontrolledValue("");
              if (inputRef.current) inputRef.current.value = "";
            }
            onChange?.({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
          }}
          type="button"
        >
          <Icon name="circleX" size={clearIconSize} strokeWidth={1.5} />
        </button>
      )}
    </label>
  );
}
