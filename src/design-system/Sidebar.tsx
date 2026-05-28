import { useEffect, useState, type ReactNode } from "react";
import { Icon, type IconName } from "./Icons";
import { cn } from "./utils";

type SidebarItemProps = {
  active?: boolean;
  children: ReactNode;
  icon?: IconName;
  mini?: boolean;
  onClick?: () => void;
};

export function SidebarItem({ active = false, children, icon, mini = false, onClick }: SidebarItemProps) {
  return (
    <button
      className={cn(
        "group flex h-10 w-full items-center gap-[var(--ads-spacing-3)] px-[var(--ads-spacing-4)] py-[10px] text-left text-[length:var(--ads-font-size-14)] leading-[var(--ads-line-height-20)] transition-colors focus-visible:outline-none",
        mini && "justify-center",
        active ? "font-semibold text-[color:var(--ads-text-brand)]" : "font-medium text-[color:var(--ads-opacity-white-50a)] hover:text-[color:var(--opacity-white-80a)]",
      )}
      onClick={onClick}
      type="button"
    >
      <span className="relative grid size-5 shrink-0 place-items-center">
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-7)] transition-colors",
            active
              ? "bg-[var(--ads-opacity-purple-20a)] shadow-[inset_0_0_11px_2px_var(--ads-opacity-black-10a)]"
              : "group-hover:bg-[var(--ads-opacity-white-10a)] group-focus-visible:border-[1.5px] group-focus-visible:border-[var(--opacity-purple-60a)] group-focus-visible:bg-[var(--opacity-white-5a)]",
          )}
        />
        <Icon className="absolute left-[2px] top-[2px] z-10" name={icon} size={16} strokeWidth={2.1} />
      </span>
      {!mini && <span className="truncate">{children}</span>}
    </button>
  );
}

export type SidebarRoute = "analytics" | "builder" | "campaigns" | "components" | "dashboard" | "promotions" | "segments" | "templates";

type SidebarProps = {
  activeId?: SidebarRoute;
  includeComponents?: boolean;
  mini?: boolean;
  onNavigate?: (id: SidebarRoute) => void;
  onToggleMini?: () => void;
  viewport?: boolean;
};

export function Sidebar({ activeId = "dashboard", includeComponents = false, mini = false, onNavigate, onToggleMini, viewport = false }: SidebarProps) {
  const [isMini, setIsMini] = useState(mini);

  useEffect(() => {
    setIsMini(mini);
  }, [mini]);

  const items: Array<{ id: SidebarRoute; icon: IconName; label: string }> = [
    ...(includeComponents ? [{ id: "components" as const, icon: "layout" as const, label: "Components" }] : []),
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "campaigns", icon: "campaign", label: "Campaign" },
    { id: "promotions", icon: "promotions", label: "Promotion" },
    { id: "segments", icon: "segments", label: "Segments" },
    { id: "templates", icon: "template", label: "Template" },
    { id: "analytics", icon: "analytics", label: "Analytics" },
  ];

  function handleToggleMini() {
    setIsMini((current) => !current);
    onToggleMini?.();
  }

  return (
    <aside
      className={cn(
        "relative flex min-h-full shrink-0 flex-col justify-between bg-[var(--ads-sidebar-bg)] py-[var(--ads-spacing-6)] transition-[width] duration-200 ease-out",
        viewport && "sticky top-0 h-screen min-h-screen",
        isMini ? "w-[56px] items-center border border-[var(--ads-surface-dark-card)]" : "w-[220px] items-start",
      )}
    >
      <div className={cn("flex w-full flex-col gap-[var(--ads-spacing-8)]", isMini ? "items-center" : "items-start")}>
        <div className={cn("flex h-8 items-center gap-[var(--ads-spacing-3)] text-[color:var(--ads-text-inverse)]", isMini ? "justify-center px-0" : "w-full px-[var(--ads-spacing-4)]")}>
          <span className="grid size-8 place-items-center rounded-[var(--ads-radius-md)] bg-[var(--ads-action-primary-bg)] text-[length:var(--ads-font-size-13)] font-bold leading-[var(--ads-line-height-20)]">LO</span>
          {!isMini && <span className="text-[length:var(--ads-font-size-16)] font-semibold leading-[var(--ads-line-height-24)]">LiveOps</span>}
        </div>

        <nav className="grid w-full gap-[var(--ads-spacing-1)]">
          {items.map((item) => (
            <SidebarItem active={activeId === item.id} icon={item.icon} key={item.id} mini={isMini} onClick={() => onNavigate?.(item.id)}>
              {item.label}
            </SidebarItem>
          ))}
        </nav>
      </div>

      <div className={cn("grid w-full gap-[var(--ads-spacing-5)]", isMini ? "justify-items-center px-0" : "px-[var(--ads-spacing-4)]")}>
        <button
          className={cn(
            "flex w-full items-center py-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-14)] font-normal leading-[var(--ads-line-height-20)] text-[color:var(--ads-opacity-white-40a)] transition-colors hover:text-[color:var(--opacity-white-70a)] focus-visible:outline-none",
            isMini ? "justify-center" : "gap-[var(--ads-spacing-3)]",
          )}
          type="button"
        >
          <Icon name="settings" size={20} strokeWidth={1.8} />
          {!isMini && <span>Settings</span>}
        </button>

        <div className={cn("h-px bg-[var(--ads-opacity-white-10a)]", isMini ? "w-8" : "w-full")} />

        <div className={cn("flex items-center gap-[var(--ads-spacing-3)]", isMini ? "justify-center" : "w-full")}>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--gray-600)] text-[color:var(--ads-text-inverse)] ring-1 ring-[var(--ads-opacity-white-10a)]">
            <Icon name="users" size={18} strokeWidth={2.2} />
          </span>
          {!isMini && (
            <span className="grid min-w-0 flex-1 gap-[1px]">
              <span className="truncate text-[length:var(--ads-font-size-13)] font-semibold leading-[var(--ads-line-height-20)] text-[color:var(--opacity-white-70a)]">Loc Nguyen</span>
              <span className="truncate text-[length:var(--ads-font-size-11)] font-normal leading-[var(--ads-line-height-16)] text-[color:var(--ads-opacity-white-40a)]">Designer</span>
            </span>
          )}
        </div>
      </div>

      <button
        aria-expanded={!isMini}
        aria-label={isMini ? "Expand sidebar" : "Collapse sidebar"}
        className={cn(
          "absolute top-[418.89px] grid size-7 place-items-center rounded-[var(--ads-radius-2xl)] bg-[var(--ads-surface-dark-card)] text-[color:var(--ads-opacity-white-60a)] transition-colors hover:text-[color:var(--ads-text-inverse)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ads-border-focus)]",
          isMini ? "right-[-15px]" : "right-[-14px]",
        )}
        onClick={handleToggleMini}
        type="button"
      >
        <span className={cn("block size-2.5 rotate-45 border-current", isMini ? "border-r-2 border-t-2" : "border-b-2 border-l-2")} />
      </button>
    </aside>
  );
}
