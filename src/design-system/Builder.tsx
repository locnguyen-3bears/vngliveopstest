import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { ButtonBuilder } from "./ButtonBuilder";
import { DropZone } from "./DropZone";
import { Icon, type IconName } from "./Icons";
import { Breadcrumbs } from "./Layout";
import { SearchField } from "./SearchField";
import { TextField } from "./TextField";
import { cn } from "./utils";

type BlockKind =
  | "button"
  | "countdown"
  | "divider"
  | "embed"
  | "footer"
  | "fullWidth"
  | "hero"
  | "image"
  | "products"
  | "progress"
  | "reward"
  | "rewardTiers"
  | "skinPreview"
  | "spinWheel"
  | "text"
  | "threeColumns"
  | "twoColumns"
  | "video";

type ComponentTile = {
  full?: boolean;
  icon: IconName;
  kind: BlockKind;
  label: string;
};

type EmailBlock = {
  id: string;
  kind: BlockKind;
  title: string;
  subtitle?: string;
  cta?: string;
  altText?: string;
};

const paletteSections: Array<{ icon?: IconName; items: ComponentTile[]; title: string }> = [
  {
    title: "Layout",
    items: [
      { full: true, icon: "layout", kind: "fullWidth", label: "Full Width" },
      { icon: "columns2", kind: "twoColumns", label: "Two Columns" },
      { icon: "columns3", kind: "threeColumns", label: "Three Columns" },
    ],
  },
  {
    title: "Basic",
    items: [
      { icon: "text", kind: "text", label: "Text" },
      { icon: "image", kind: "image", label: "Image" },
      { icon: "button", kind: "button", label: "Button" },
      { icon: "link", kind: "embed", label: "Embed URL" },
      { icon: "minus", kind: "divider", label: "Divider" },
      { icon: "play", kind: "video", label: "Video" },
    ],
  },
  {
    icon: "image",
    title: "Gaming",
    items: [
      { icon: "timer", kind: "countdown", label: "Timer" },
      { icon: "gem", kind: "reward", label: "Item Game" },
      { icon: "trophy", kind: "rewardTiers", label: "Reward Tiers" },
      { icon: "barChart", kind: "progress", label: "Progress Bar" },
      { icon: "rotate", kind: "spinWheel", label: "Spin Wheel" },
      { icon: "shirt", kind: "skinPreview", label: "Skin Preview" },
    ],
  },
];

const initialBlocks: EmailBlock[] = [
  {
    id: "hero-1",
    kind: "hero",
    title: "Lunar New Year Sale",
    subtitle: "Exclusive skins, rare collectibles, and limited bundles for your best players.",
    cta: "Open Game & Claim Now",
    altText: "Lunar New Year promotional art",
  },
  {
    id: "text-1",
    kind: "text",
    title: "Exclusive Skins Up to 70% Off",
    subtitle: "Celebrate the season with legendary skins and rare rewards available for a short time.",
  },
  {
    id: "products-1",
    kind: "products",
    title: "Featured Rewards",
    subtitle: "Crimson Blade, Phoenix Armor, and Jade Wings",
  },
  {
    id: "timer-1",
    kind: "countdown",
    title: "Sale ends in:",
    subtitle: "02d 14h 33m 20s",
  },
  {
    id: "footer-1",
    kind: "footer",
    title: "You are receiving this because you signed up for game updates.",
    cta: "Unsubscribe",
  },
];

const blockLabels: Record<BlockKind, string> = {
  button: "Button",
  countdown: "Timer",
  divider: "Divider",
  embed: "Embed URL",
  footer: "Footer",
  fullWidth: "Full Width",
  hero: "Hero Section",
  image: "Image",
  products: "Product Grid",
  progress: "Progress Bar",
  reward: "Item Game",
  rewardTiers: "Reward Tiers",
  skinPreview: "Skin Preview",
  spinWheel: "Spin Wheel",
  text: "Text",
  threeColumns: "Three Columns",
  twoColumns: "Two Columns",
  video: "Video",
};

function BuilderSection({ children, className, icon, title }: { children: ReactNode; className?: string; icon?: IconName; title: string }) {
  return (
    <section className={cn("grid w-[208px] gap-[var(--ads-spacing-2)]", className)}>
      <p className="flex items-center gap-[var(--ads-spacing-2)] text-[10px] font-semibold uppercase leading-[var(--ads-line-height-16)] text-[color:var(--ads-icon-subtle)]">
        {icon && <Icon name={icon} size={12} strokeWidth={1.4} />}
        {title}
      </p>
      {children}
    </section>
  );
}

export function BuilderPanelSectionHeader({
  action,
  title = "Content",
}: {
  action?: ReactNode;
  title?: ReactNode;
}) {
  return (
    <div className="flex h-11 w-[248px] items-center justify-between border-b border-[var(--ads-border-default)] text-[length:var(--ads-font-size-14)] font-semibold leading-[var(--ads-line-height-20)]">
      <span>{title}</span>
      {action ?? <Icon className="text-[color:var(--ads-text-muted)]" name="more" size={16} />}
    </div>
  );
}

export function BuilderPanelPropertyRow({
  children,
  label = "Property",
}: {
  children?: ReactNode;
  label?: ReactNode;
}) {
  return (
    <div className="grid min-h-[72px] w-[248px] content-center gap-[var(--ads-spacing-2)]">
      <p className="text-[length:var(--ads-font-size-11)] font-semibold leading-[var(--ads-line-height-16)] text-[color:var(--ads-text-secondary)]">{label}</p>
      {children ?? <TextField defaultValue="Value" />}
    </div>
  );
}

export function BuilderPanelToggleRow({
  checked = true,
  label = "Show section",
}: {
  checked?: boolean;
  label?: ReactNode;
}) {
  return (
    <div className="flex min-h-[26px] w-[248px] items-center justify-between gap-[var(--ads-spacing-3)]">
      <span className="text-[length:var(--ads-font-size-13)] font-medium leading-[var(--ads-line-height-20)] text-[color:var(--ads-text-default)]">{label}</span>
      <span className={cn("flex h-[22px] w-[38px] items-center rounded-full p-[2px] transition-colors", checked ? "justify-end bg-[var(--ads-background-brand)]" : "justify-start bg-[var(--ads-background-muted)]")}>
        <span className="size-[18px] rounded-full bg-[var(--ads-surface-default)] shadow-[var(--ads-shadow-control)]" />
      </span>
    </div>
  );
}

function makeBlock(kind: BlockKind): EmailBlock {
  const id = `${kind}-${Date.now()}-${Math.round(Math.random() * 1000)}`;

  switch (kind) {
    case "button":
      return { cta: "Shop Now", id, kind, title: "Primary CTA" };
    case "countdown":
      return { id, kind, subtitle: "01d 08h 45m 00s", title: "Event ends in:" };
    case "divider":
      return { id, kind, title: "Divider" };
    case "embed":
      return { cta: "https://game.example.com/reward", id, kind, subtitle: "Paste a URL to embed a landing page, reward page, or store link.", title: "Embedded Reward URL" };
    case "fullWidth":
      return { cta: "Learn More", id, kind, subtitle: "A full-width content block for headlines, copy, and calls to action.", title: "Full Width Section" };
    case "image":
      return { altText: "Campaign visual", id, kind, title: "Campaign Image" };
    case "products":
      return { id, kind, subtitle: "Three featured reward cards", title: "Featured Rewards" };
    case "progress":
      return { id, kind, subtitle: "68% claimed", title: "Reward Claim Progress" };
    case "reward":
      return { cta: "Claim Reward", id, kind, subtitle: "Legendary skin bundle", title: "Crimson Blade Bundle" };
    case "rewardTiers":
      return { cta: "View Tiers", id, kind, subtitle: "Bronze, Silver, and Gold reward thresholds.", title: "Reward Tiers" };
    case "skinPreview":
      return { cta: "Try Skin", id, kind, subtitle: "Preview the featured skin before sending.", title: "Skin Preview" };
    case "spinWheel":
      return { cta: "Spin Now", id, kind, subtitle: "Limited-time reward wheel for engaged players.", title: "Spin Wheel Event" };
    case "text":
      return { id, kind, subtitle: "Write campaign body copy here.", title: "New Content Section" };
    case "threeColumns":
      return { id, kind, subtitle: "Three equal columns for rewards or feature highlights.", title: "Three Columns" };
    case "twoColumns":
      return { id, kind, subtitle: "Two balanced columns for offers, images, or comparisons.", title: "Two Columns" };
    case "video":
      return { cta: "Watch Trailer", id, kind, subtitle: "Embed a trailer, event recap, or feature video.", title: "Video Block" };
    case "footer":
      return { cta: "Unsubscribe", id, kind, title: "You are receiving this campaign email." };
    case "hero":
    default:
      return { cta: "Open Game", id, kind, subtitle: "A high impact header for this campaign.", title: "New Hero Section" };
  }
}

export function ComponentPalette({
  className,
  onAddBlock,
  onDragBlockEnd,
  onDragBlockStart,
}: {
  className?: string;
  onAddBlock?: (kind: BlockKind) => void;
  onDragBlockEnd?: () => void;
  onDragBlockStart?: (kind: BlockKind) => void;
}) {
  const [draggingKind, setDraggingKind] = useState<BlockKind | null>(null);
  const [activeTab, setActiveTab] = useState<"components" | "templates">("components");

  return (
    <aside className={cn("grid w-[240px] shrink-0 content-start justify-items-start overflow-x-hidden overflow-y-auto bg-[var(--ads-surface-dark)] px-[var(--ads-spacing-4)] pb-[var(--ads-spacing-6)] pt-[var(--ads-spacing-6)]", className)} data-component="left-sidebar-builder">
      <div className="flex w-[208px] gap-[var(--ads-spacing-2)]">
        <button
          className={cn(
            "h-8 rounded-[var(--ads-radius-md)] border px-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-11)] font-semibold leading-[var(--ads-line-height-16)] transition-colors",
            activeTab === "components"
              ? "border-[var(--ads-border-strong)] bg-[var(--ads-surface-dark-card)] text-[color:var(--ads-text-inverse)]"
              : "border-[var(--ads-sidebar-border)] bg-transparent text-[color:var(--ads-opacity-white-50a)] hover:bg-[var(--ads-surface-dark-card)]",
          )}
          onClick={() => setActiveTab("components")}
          type="button"
        >
          Components
        </button>
        <button
          className={cn(
            "h-8 rounded-[var(--ads-radius-md)] border px-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-11)] font-semibold leading-[var(--ads-line-height-16)] transition-colors",
            activeTab === "templates"
              ? "border-[var(--ads-border-strong)] bg-[var(--ads-surface-dark-card)] text-[color:var(--ads-text-inverse)]"
              : "border-[var(--ads-sidebar-border)] bg-transparent text-[color:var(--ads-opacity-white-50a)] hover:bg-[var(--ads-surface-dark-card)]",
          )}
          onClick={() => setActiveTab("templates")}
          type="button"
        >
          Templates
        </button>
      </div>
      <SearchField clearVisibility="auto" className="mt-[9px]" placeholder={activeTab === "components" ? "Search components..." : "Search templates..."} size="S" />
      {activeTab === "components" ? (
        paletteSections.map((section, index) => (
          <BuilderSection className={index === 0 ? "mt-[17px]" : "mt-[18px]"} icon={section.icon} key={section.title} title={section.title}>
            <div className="grid w-[208px] grid-cols-2 gap-[var(--ads-spacing-2)]">
              {section.items.map((item) => (
                <button
                  className={cn(item.full && "col-span-2", "cursor-grab active:cursor-grabbing")}
                  draggable
                  key={item.label}
                  onClick={() => onAddBlock?.(item.kind)}
                  onDragEnd={() => {
                    setDraggingKind(null);
                    onDragBlockEnd?.();
                  }}
                  onDragStart={(event) => {
                    setDraggingKind(item.kind);
                    onDragBlockStart?.(item.kind);
                    event.dataTransfer.effectAllowed = "copy";
                    event.dataTransfer.setData("application/x-builder-block", item.kind);
                  }}
                  type="button"
                >
                  <ButtonBuilder
                    icon={<Icon name={item.icon} size={24} strokeWidth={1.4} />}
                    state={draggingKind === item.kind ? "grabbing" : "default"}
                    text={item.label}
                  />
                </button>
              ))}
            </div>
          </BuilderSection>
        ))
      ) : (
        <BuilderSection className="mt-[17px]" title="Templates">
          <div className="grid w-[208px] gap-[var(--ads-spacing-2)]">
            {["Lunar Sale", "Reward Drop", "Welcome Back"].map((template) => (
              <button className="rounded-[var(--ads-radius-md)] border border-[var(--ads-sidebar-border)] bg-[var(--ads-sidebar-bg)] p-[var(--ads-spacing-3)] text-left text-[length:var(--ads-font-size-11)] font-semibold text-[color:var(--ads-opacity-white-50a)] hover:bg-[var(--ads-surface-dark-card)] hover:text-[color:var(--ads-text-inverse)]" key={template} type="button">
                {template}
              </button>
            ))}
          </div>
        </BuilderSection>
      )}
    </aside>
  );
}

type PropertyRowProps = {
  children: ReactNode;
  label: string;
};

export function PropertyRow({ children, label }: PropertyRowProps) {
  return (
    <div className="grid gap-[var(--ads-spacing-2)] py-[var(--ads-spacing-2)]">
      <p className="text-[length:var(--ads-font-size-11)] font-semibold leading-[var(--ads-line-height-16)] text-[color:var(--ads-text-secondary)]">{label}</p>
      {children}
    </div>
  );
}

export function SegmentedControl({
  items = ["Full", "Fixed"],
  onChange,
  value = "Full",
}: {
  items?: string[];
  onChange?: (value: string) => void;
  value?: string;
}) {
  return (
    <div className="flex rounded-[var(--ads-radius-md)] bg-[var(--ads-background-subtle)] p-[var(--ads-spacing-1)]">
      {items.map((item) => (
        <button
          className={cn(
            "flex-1 rounded-[var(--ads-radius-sm)] px-[var(--ads-spacing-3)] py-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-11)]",
            item === value ? "bg-[var(--ads-surface-default)] font-semibold text-[color:var(--ads-text-base)] shadow-[var(--ads-shadow-control)]" : "text-[color:var(--ads-text-secondary)]",
          )}
          key={item}
          onClick={() => onChange?.(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function FieldGroup({
  block,
  onUpdate,
}: {
  block: EmailBlock;
  onUpdate: (patch: Partial<EmailBlock>) => void;
}) {
  return (
    <div className="grid gap-[var(--ads-spacing-3)]">
      <PropertyRow label="Title">
        <TextField value={block.title} onChange={(event) => onUpdate({ title: event.target.value })} />
      </PropertyRow>
      {block.kind !== "divider" && block.kind !== "button" && block.kind !== "footer" && (
        <PropertyRow label="Body / Supporting Text">
          <TextField value={block.subtitle ?? ""} onChange={(event) => onUpdate({ subtitle: event.target.value })} />
        </PropertyRow>
      )}
      {["button", "embed", "hero", "reward", "rewardTiers", "skinPreview", "spinWheel", "footer", "video"].includes(block.kind) && (
        <PropertyRow label="CTA Label">
          <TextField value={block.cta ?? ""} onChange={(event) => onUpdate({ cta: event.target.value })} />
        </PropertyRow>
      )}
      {["hero", "image"].includes(block.kind) && (
        <PropertyRow label="Alt Text">
          <TextField value={block.altText ?? ""} onChange={(event) => onUpdate({ altText: event.target.value })} />
        </PropertyRow>
      )}
    </div>
  );
}

export function InspectorPanel({
  block,
  className,
  onDelete,
  onDuplicate,
  onUpdate,
}: {
  block?: EmailBlock;
  className?: string;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onUpdate?: (patch: Partial<EmailBlock>) => void;
}) {
  const [layoutMode, setLayoutMode] = useState("Full");

  return (
    <aside className={cn("grid w-[304px] shrink-0 content-start gap-[var(--ads-spacing-4)] overflow-y-auto border-l border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-4)]", className)}>
      <div className="flex items-center justify-between border-b border-[var(--ads-border-default)] pb-[var(--ads-spacing-3)]">
        <div className="flex items-center gap-[var(--ads-spacing-2)] font-semibold">
          <Icon className="text-[color:var(--ads-text-brand)]" name={block?.kind === "image" || block?.kind === "hero" ? "image" : "settings"} size={16} />
          {block ? blockLabels[block.kind] : "Inspector"}
        </div>
        {block && <Badge status="brand">Selected</Badge>}
      </div>

      {!block && (
        <div className="grid gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-lg)] bg-[var(--ads-background-page)] p-[var(--ads-spacing-4)] text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">
          <Icon name="button" />
          Select a block on the email canvas to edit its content.
        </div>
      )}

      {block && onUpdate && (
        <>
          <BuilderSection title="Content">
            <FieldGroup block={block} onUpdate={onUpdate} />
          </BuilderSection>
          <BuilderSection title="Layout">
            <PropertyRow label="Width">
              <SegmentedControl items={["Full", "Fixed"]} value={layoutMode} onChange={setLayoutMode} />
            </PropertyRow>
            <PropertyRow label="Spacing">
              <SegmentedControl items={["Tight", "Default", "Roomy"]} value="Default" />
            </PropertyRow>
          </BuilderSection>
          <BuilderSection title="Actions">
            <div className="grid grid-cols-2 gap-[var(--ads-spacing-2)]">
              <Button size="sm" variant="border" onClick={onDuplicate}>Duplicate</Button>
              <Button size="sm" variant="ghost" onClick={onDelete}>Delete</Button>
            </div>
          </BuilderSection>
        </>
      )}
    </aside>
  );
}

export function ProductCard({ title = "Crimson Blade" }: { title?: string }) {
  return (
    <article className="grid min-w-0 flex-1 gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-md)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-3)]">
      <div className="grid aspect-square place-items-center rounded-[var(--ads-radius-md)] bg-[radial-gradient(circle_at_50%_28%,var(--red-100),var(--zinc-500)_62%,var(--zinc-800))]">
        <Icon className="text-[color:var(--red-400)]" name="gem" size={42} strokeWidth={1.5} />
      </div>
      <div className="grid gap-[var(--ads-spacing-1)]">
        <h3 className="truncate text-[length:var(--ads-font-size-12)] font-semibold">{title}</h3>
        <p className="flex gap-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-10)]">
          <span className="font-bold text-[color:var(--ads-feedback-error-icon)]">$14.99</span>
          <span className="text-[color:var(--ads-icon-subtle)] line-through">$29.99</span>
        </p>
      </div>
      <Button size="sm">Get Now</Button>
    </article>
  );
}

export function FeaturedItemCard({
  cta = "Claim Reward",
  subtitle = "Legendary skin bundle with rare upgrade materials.",
  title = "Crimson Blade Bundle",
}: {
  cta?: string;
  subtitle?: string;
  title?: string;
}) {
  return (
    <article className="grid w-[536px] max-w-full grid-cols-[120px_1fr_auto] items-center gap-[var(--ads-spacing-5)] rounded-[var(--ads-radius-lg)] border border-[var(--ads-border-default)] bg-[var(--ads-background-inverse)] p-[var(--ads-spacing-5)] text-[color:var(--ads-text-inverse)]">
      <div className="grid size-[120px] place-items-center rounded-[var(--ads-radius-lg)] bg-[radial-gradient(circle_at_50%_28%,var(--red-300),var(--red-900)_72%)]">
        <Icon className="text-[color:var(--red-200)]" name="gem" size={52} strokeWidth={1.5} />
      </div>
      <div className="grid gap-[var(--ads-spacing-2)]">
        <h3 className="text-[length:var(--ads-font-size-18)] font-extrabold leading-[var(--ads-line-height-24)]">{title}</h3>
        <p className="text-[length:var(--ads-font-size-13)] leading-[var(--ads-line-height-20)] text-[color:var(--gray-300)]">{subtitle}</p>
        <p className="flex gap-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-12)]">
          <span className="font-bold text-[color:var(--special-reward-bg)]">$14.99</span>
          <span className="text-[color:var(--gray-400)] line-through">$29.99</span>
        </p>
      </div>
      <Button size="sm">{cta}</Button>
    </article>
  );
}

export function TimerDigit({ label = "d", value = "02" }: { label?: string; value?: string }) {
  return (
    <span className="inline-flex h-[52px] min-w-[63px] items-center gap-[var(--ads-spacing-1)]">
      <span className="grid min-w-[44px] place-items-center rounded-[var(--ads-radius-md)] bg-[var(--gaming-surface)] px-[var(--ads-spacing-3)] py-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-20)] font-extrabold leading-[var(--ads-line-height-28)] text-[color:var(--ads-text-inverse)]">{value}</span>
      <span className="text-[length:var(--ads-font-size-12)] font-bold text-[color:var(--ads-feedback-warning-icon)]">{label}</span>
    </span>
  );
}

export function Countdown({ title = "Sale ends in:", values = ["02", "14", "33", "20"] }: { title?: string; values?: string[] }) {
  const labels = ["d", "h", "m", "s"];
  return (
    <div className="grid justify-items-center gap-[var(--ads-spacing-4)] bg-[var(--gaming-surface-deep)] p-[var(--ads-spacing-8)]">
      <p className="text-[length:var(--ads-font-size-12)] font-bold uppercase text-[color:var(--ads-feedback-warning-icon)]">{title}</p>
      <div className="flex items-center gap-[var(--ads-spacing-3)]">
        {values.map((value, index) => (
          <TimerDigit key={`${value}-${index}`} label={labels[index]} value={value} />
        ))}
      </div>
    </div>
  );
}

export function GhostPreview() {
  return (
    <div className="grid w-full max-w-[320px] gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-action-primary-bg)] bg-[color-mix(in_srgb,var(--ads-surface-dark-card)_92%,transparent)] p-[var(--ads-spacing-4)] text-[color:var(--ads-text-inverse)] shadow-[0_10px_24px_var(--ads-opacity-black-28a)]">
      <div className="flex items-center gap-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-12)] font-bold">
        <Icon className="text-[color:var(--ads-action-primary-bg)]" name="gem" />
        Drag Preview
      </div>
      <p className="text-[length:var(--ads-font-size-12)] text-[color:var(--zinc-300)]">Drag a block from the left panel and drop it into the blue canvas slot.</p>
    </div>
  );
}

function CanvasDropSlot({
  activeId,
  beforeId,
  id,
  onDropData,
  onTargetChange,
}: {
  activeId?: string | null;
  beforeId?: string;
  id: string;
  onDropData: (data: { existingId: string; kind: string }, beforeId?: string) => void;
  onTargetChange: (id: string | null) => void;
}) {
  const active = activeId === id;

  return (
    <div className="flex w-full justify-center px-0 py-[var(--ads-spacing-2)]">
      <DropZone
        fullWidth
        className="mx-auto"
        state={active ? "DragOver" : "Idle"}
        onDragEnter={() => onTargetChange(id)}
        onDragLeave={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          onTargetChange(null);
        }}
        onDropData={(data) => {
          onTargetChange(null);
          onDropData(data, beforeId);
        }}
      />
    </div>
  );
}

function BlockFrame({
  block,
  children,
  onDropBefore,
  onMoveBefore,
  onSelect,
  selected,
}: {
  block: EmailBlock;
  children: ReactNode;
  onDropBefore?: (kind: BlockKind, beforeId: string) => void;
  onMoveBefore?: (fromId: string, beforeId: string) => void;
  onSelect?: () => void;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative block w-full cursor-pointer text-left outline-none ring-inset transition-shadow",
        selected ? "ring-2 ring-[var(--ads-border-brand)]" : "hover:ring-2 hover:ring-[var(--violet-300)]",
      )}
      draggable
      onClick={onSelect}
      onDragOver={(event) => event.preventDefault()}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("application/x-builder-existing", block.id);
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const existingId = event.dataTransfer.getData("application/x-builder-existing");
        const kind = event.dataTransfer.getData("application/x-builder-block") as BlockKind;
        if (existingId && existingId !== block.id) onMoveBefore?.(existingId, block.id);
        if (kind) onDropBefore?.(kind, block.id);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect?.();
      }}
      role="button"
      tabIndex={0}
    >
      <span className={cn("absolute right-3 top-3 z-10 rounded-[var(--ads-radius-sm)] px-[var(--ads-spacing-2)] py-[2px] text-[10px] font-semibold", selected ? "bg-[var(--ads-background-brand)] text-[color:var(--ads-action-primary-text)]" : "hidden bg-[var(--ads-surface-default)] text-[color:var(--ads-text-brand)] shadow-[var(--ads-shadow-control)] group-hover:block")}>
        {blockLabels[block.kind]}
      </span>
      {children}
    </div>
  );
}

function RenderEmailBlock({
  block,
  onDropBefore,
  onMoveBefore,
  onSelect,
  selected,
}: {
  block: EmailBlock;
  onDropBefore?: (kind: BlockKind, beforeId: string) => void;
  onMoveBefore?: (fromId: string, beforeId: string) => void;
  onSelect?: () => void;
  selected?: boolean;
}) {
  if (block.kind === "hero") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <header className="grid grid-cols-[1fr_120px] items-center gap-[var(--ads-spacing-6)] bg-[var(--gaming-surface-deep)] p-[var(--ads-spacing-8)]">
          <div>
            <div className="mb-[var(--ads-spacing-2)] h-6 w-[100px] rounded-[var(--radius-2)] bg-[var(--gray-700)]" />
            <h2 className="text-[length:var(--ads-font-size-24)] font-extrabold uppercase text-[color:var(--special-reward-bg)]">{block.title}</h2>
            <p className="mt-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-13)] text-[color:var(--violet-200)]">{block.subtitle}</p>
          </div>
          <div className="grid size-[120px] place-items-center rounded-[var(--ads-radius-md)] border border-[var(--orange-500)] bg-[radial-gradient(circle,var(--yellow-400),var(--red-700)_60%,var(--orange-950))]">
            <Icon className="text-[color:var(--yellow-200)]" name="sparkles" size={48} />
          </div>
        </header>
      </BlockFrame>
    );
  }

  if (block.kind === "image") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <div className="relative h-[260px] overflow-hidden bg-[linear-gradient(180deg,var(--orange-900),var(--yellow-400)_45%,var(--violet-900))]">
          <div className="absolute inset-x-0 top-8 flex justify-around opacity-70">
            {Array.from({ length: 10 }).map((_, index) => (
              <span className="size-5 rounded-full bg-[var(--orange-500)] shadow-[0_0_22px_var(--ads-opacity-yellow-50a)]" key={index} />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,color-mix(in_srgb,var(--indigo-950)_95%,transparent),transparent)]" />
        </div>
      </BlockFrame>
    );
  }

  if (block.kind === "fullWidth") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <section className="grid gap-[var(--ads-spacing-3)] bg-[var(--ads-background-page)] px-[var(--ads-spacing-8)] py-[var(--ads-spacing-8)] text-center">
          <p className="mx-auto w-fit rounded-[var(--ads-radius-sm)] bg-[var(--ads-feedback-brand-bg)] px-[var(--ads-spacing-2)] py-[var(--ads-spacing-1)] text-[length:var(--ads-font-size-11)] font-bold uppercase text-[color:var(--ads-text-brand)]">Full width</p>
          <h2 className="text-[length:var(--ads-font-size-24)] font-extrabold">{block.title}</h2>
          <p className="mx-auto max-w-[420px] text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">{block.subtitle}</p>
          <div className="justify-self-center"><Button size="sm">{block.cta}</Button></div>
        </section>
      </BlockFrame>
    );
  }

  if (block.kind === "twoColumns" || block.kind === "threeColumns") {
    const columns = block.kind === "threeColumns" ? ["Offer", "Reward", "Reminder"] : ["Campaign Copy", "Campaign Visual"];

    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <section className="grid gap-[var(--ads-spacing-4)] p-[var(--ads-spacing-8)]">
          <div className="text-center">
            <h2 className="text-[length:var(--ads-font-size-20)] font-extrabold">{block.title}</h2>
            <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">{block.subtitle}</p>
          </div>
          <div className={cn("grid gap-[var(--ads-spacing-3)]", block.kind === "threeColumns" ? "grid-cols-3" : "grid-cols-2")}>
            {columns.map((column, index) => (
              <article className="grid min-h-[120px] content-center gap-[var(--ads-spacing-2)] rounded-[var(--ads-radius-md)] border border-[var(--ads-border-default)] bg-[var(--ads-background-page)] p-[var(--ads-spacing-4)] text-center" key={column}>
                <Icon className="mx-auto text-[color:var(--ads-text-brand)]" name={index === 0 ? "text" : index === 1 ? "image" : "timer"} size={24} />
                <h3 className="text-[length:var(--ads-font-size-13)] font-bold">{column}</h3>
                <p className="text-[length:var(--ads-font-size-11)] text-[color:var(--ads-text-subtle)]">Drop content here</p>
              </article>
            ))}
          </div>
        </section>
      </BlockFrame>
    );
  }

  if (block.kind === "embed" || block.kind === "video") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <section className="grid gap-[var(--ads-spacing-4)] p-[var(--ads-spacing-8)]">
          <div className="grid min-h-[180px] place-items-center rounded-[var(--ads-radius-lg)] border border-dashed border-[var(--ads-border-brand)] bg-[var(--ads-feedback-brand-bg)] text-[color:var(--ads-text-brand)]">
            <div className="grid justify-items-center gap-[var(--ads-spacing-3)]">
              <Icon name={block.kind === "video" ? "play" : "link"} size={36} />
              <div className="grid justify-items-center gap-[var(--ads-spacing-1)]">
                <h2 className="text-[length:var(--ads-font-size-18)] font-extrabold">{block.title}</h2>
                <p className="max-w-[360px] text-center text-[length:var(--ads-font-size-13)] text-[color:var(--ads-feedback-brand-text)]">{block.subtitle}</p>
              </div>
              <Button size="sm" variant="soft">{block.cta}</Button>
            </div>
          </div>
        </section>
      </BlockFrame>
    );
  }

  if (block.kind === "products") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <section className="grid gap-[var(--ads-spacing-4)] p-[var(--ads-spacing-8)]">
          <div className="text-center">
            <h2 className="text-[length:var(--ads-font-size-20)] font-extrabold">{block.title}</h2>
            <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">{block.subtitle}</p>
          </div>
          <div className="flex gap-[var(--ads-spacing-4)]">
            <ProductCard title="Crimson Blade" />
            <ProductCard title="Phoenix Armor" />
            <ProductCard title="Jade Wings" />
          </div>
        </section>
      </BlockFrame>
    );
  }

  if (block.kind === "countdown") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <Countdown title={block.title} values={(block.subtitle ?? "02d 14h 33m 20s").match(/\d+/g)?.slice(0, 4) ?? ["02", "14", "33", "20"]} />
      </BlockFrame>
    );
  }

  if (block.kind === "button") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <section className="grid justify-items-center gap-[var(--ads-spacing-3)] px-[var(--ads-spacing-8)] py-[var(--ads-spacing-6)]">
          <Button size="xl">{block.cta || block.title}</Button>
        </section>
      </BlockFrame>
    );
  }

  if (block.kind === "divider") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <div className="px-[var(--ads-spacing-8)] py-[var(--ads-spacing-4)]">
          <div className="h-px bg-[var(--ads-border-default)]" />
        </div>
      </BlockFrame>
    );
  }

  if (block.kind === "reward") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <section className="grid grid-cols-[96px_1fr_auto] items-center gap-[var(--ads-spacing-4)] bg-[var(--ads-background-inverse)] p-[var(--ads-spacing-6)] text-[color:var(--ads-text-inverse)]">
          <div className="grid size-24 place-items-center rounded-[var(--ads-radius-lg)] bg-[radial-gradient(circle,var(--red-300),var(--red-900))]">
            <Icon name="gem" size={42} />
          </div>
          <div>
            <h2 className="text-[length:var(--ads-font-size-18)] font-extrabold">{block.title}</h2>
            <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--gray-300)]">{block.subtitle}</p>
          </div>
          <Button size="sm">{block.cta}</Button>
        </section>
      </BlockFrame>
    );
  }

  if (block.kind === "rewardTiers" || block.kind === "spinWheel" || block.kind === "skinPreview") {
    const icon: IconName = block.kind === "rewardTiers" ? "trophy" : block.kind === "spinWheel" ? "rotate" : "shirt";

    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <section className="grid grid-cols-[112px_1fr_auto] items-center gap-[var(--ads-spacing-4)] bg-[var(--gaming-surface-deep)] p-[var(--ads-spacing-6)] text-[color:var(--ads-text-inverse)]">
          <div className="grid size-28 place-items-center rounded-[var(--ads-radius-lg)] bg-[radial-gradient(circle,var(--violet-500),var(--indigo-950))]">
            <Icon className="text-[color:var(--violet-100)]" name={icon} size={44} strokeWidth={1.6} />
          </div>
          <div className="grid gap-[var(--ads-spacing-2)]">
            <h2 className="text-[length:var(--ads-font-size-18)] font-extrabold">{block.title}</h2>
            <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--violet-200)]">{block.subtitle}</p>
          </div>
          <Button size="sm">{block.cta}</Button>
        </section>
      </BlockFrame>
    );
  }

  if (block.kind === "progress") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <section className="grid gap-[var(--ads-spacing-3)] p-[var(--ads-spacing-8)]">
          <div className="flex justify-between">
            <h2 className="font-bold">{block.title}</h2>
            <span className="text-[color:var(--ads-text-brand)]">{block.subtitle}</span>
          </div>
          <div className="h-3 rounded-full bg-[var(--ads-background-muted)]">
            <div className="h-3 w-2/3 rounded-full bg-[var(--ads-background-brand)]" />
          </div>
        </section>
      </BlockFrame>
    );
  }

  if (block.kind === "footer") {
    return (
      <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
        <footer className="grid gap-[var(--ads-spacing-3)] p-[var(--ads-spacing-8)] text-center">
          <p className="text-[length:var(--ads-font-size-11)] text-[color:var(--ads-icon-subtle)]">{block.title} <span className="underline">{block.cta}</span></p>
        </footer>
      </BlockFrame>
    );
  }

  return (
    <BlockFrame block={block} onDropBefore={onDropBefore} onMoveBefore={onMoveBefore} onSelect={onSelect} selected={selected}>
      <section className="grid gap-[var(--ads-spacing-3)] px-[var(--ads-spacing-8)] py-[var(--ads-spacing-8)] text-center">
        <h2 className="text-[length:var(--ads-font-size-24)] font-extrabold">{block.title}</h2>
        <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">{block.subtitle}</p>
      </section>
    </BlockFrame>
  );
}

export function EmailCanvas({
  blocks = initialBlocks,
  className,
  isPaletteDragging,
  onAddBlock,
  onInsertBlockBefore,
  onMoveBlock,
  onSelectBlock,
  selectedId,
}: {
  blocks?: EmailBlock[];
  className?: string;
  isPaletteDragging?: boolean;
  onAddBlock?: (kind: BlockKind) => void;
  onInsertBlockBefore?: (kind: BlockKind, beforeId: string) => void;
  onMoveBlock?: (fromId: string, beforeId: string) => void;
  onSelectBlock?: (id: string) => void;
  selectedId?: string;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const showDropZones = isPaletteDragging || dragActive;

  const handleDropData = (data: { existingId: string; kind: string }, beforeId?: string) => {
    setDragActive(false);
    setDropTargetId(null);
    if (data.existingId && beforeId) {
      onMoveBlock?.(data.existingId, beforeId);
      return;
    }
    if (data.kind) {
      if (beforeId) onInsertBlockBefore?.(data.kind as BlockKind, beforeId);
      else onAddBlock?.(data.kind as BlockKind);
    }
  };

  return (
    <div
      className={cn("mx-auto grid w-[600px] max-w-full overflow-hidden bg-[var(--ads-surface-default)] shadow-[0_16px_42px_var(--opacity-gray-20a)]", className)}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        setDragActive(false);
        setDropTargetId(null);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        setDragActive(false);
        setDropTargetId(null);
        const kind = event.dataTransfer.getData("application/x-builder-block") as BlockKind;
        if (kind) onAddBlock?.(kind);
      }}
    >
      {showDropZones && blocks[0] && (
        <CanvasDropSlot activeId={dropTargetId} beforeId={blocks[0].id} id={`before-${blocks[0].id}`} onDropData={handleDropData} onTargetChange={setDropTargetId} />
      )}
      {blocks.map((block, index) => (
        <div key={block.id}>
          <RenderEmailBlock
            block={block}
            onDropBefore={onInsertBlockBefore}
            onMoveBefore={onMoveBlock}
            onSelect={() => onSelectBlock?.(block.id)}
            selected={selectedId === block.id || (!selectedId && index === 0)}
          />
          {showDropZones && (
            <CanvasDropSlot
              activeId={dropTargetId}
              beforeId={blocks[index + 1]?.id}
              id={blocks[index + 1] ? `before-${blocks[index + 1].id}` : "end"}
              onDropData={handleDropData}
              onTargetChange={setDropTargetId}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ImportModal({
  onClose,
  onImported,
}: {
  onClose: () => void;
  onImported?: (block: EmailBlock) => void;
}) {
  const [fileName, setFileName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "ready">("idle");

  const processImport = () => {
    setStatus("processing");
    window.setTimeout(() => setStatus("ready"), 700);
  };

  const useImported = () => {
    onImported?.({
      id: `import-${Date.now()}`,
      kind: "text",
      subtitle: sourceUrl ? `Imported from ${sourceUrl}` : fileName ? `Imported from ${fileName}` : "Imported HTML content",
      title: "Imported Email Section",
    });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-30 grid place-items-center bg-[var(--ads-background-overlay)] p-[var(--ads-spacing-6)] backdrop-blur-[2px]">
      <section className="grid w-[min(560px,100%)] max-h-[calc(100vh-48px)] overflow-hidden rounded-[var(--ads-radius-xl)] bg-[var(--ads-surface-default)] shadow-[0_24px_80px_var(--ads-opacity-black-28a)]">
        <header className="flex min-h-[88px] items-center justify-between gap-[var(--ads-spacing-4)] border-b border-[var(--ads-border-default)] px-[var(--ads-spacing-6)] py-[var(--ads-spacing-4)]">
          <div>
            <h2 className="text-[length:var(--ads-font-size-18)] font-semibold">Import HTML</h2>
            <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">Paste a URL or upload one HTML file to simulate conversion.</p>
          </div>
          <Button aria-label="Close import" iconOnly size="md" variant="ghost" onClick={onClose}>
            <Icon name="x" />
          </Button>
        </header>
        <div className="grid gap-[var(--ads-spacing-4)] overflow-y-auto p-[var(--ads-spacing-6)]">
          <TextField leading={<Icon name="link" size={20} />} placeholder="https://example.com/lunar-sale.html" value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} />
          <label
            className="grid cursor-pointer gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-lg)] border border-dashed border-[var(--ads-border-strong)] bg-[var(--ads-background-page)] p-[var(--ads-spacing-4)]"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              setFileName(event.dataTransfer.files?.[0]?.name ?? "");
            }}
          >
            <input
              className="sr-only"
              type="file"
              accept=".html,.htm"
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            />
            <div className="flex items-center gap-[var(--ads-spacing-3)]">
              <div className="grid size-10 place-items-center rounded-[var(--ads-radius-lg)] bg-[var(--ads-feedback-brand-border)] text-[color:var(--ads-text-brand)]">
                <Icon name="filePlus" size={20} />
              </div>
              <div>
                <h3 className="font-semibold">{fileName || "Choose an HTML file"}</h3>
                <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">This is a prototype upload flow. The selected file name is used as the simulated source.</p>
              </div>
            </div>
          </label>
          <div className="grid grid-cols-[1fr_auto] gap-[var(--ads-spacing-3)]">
            <Button onClick={processImport}>Convert to Email Layout</Button>
            <Button variant="border" onClick={useImported}>Use Plain HTML</Button>
          </div>
          <section className="grid gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-lg)] border border-[var(--ads-border-default)] p-[var(--ads-spacing-4)]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Preview</h3>
              <Badge status={status === "ready" ? "success" : status === "processing" ? "brand" : "neutral"}>{status === "ready" ? "Ready" : status === "processing" ? "Processing" : "Idle"}</Badge>
            </div>
            <div className="grid gap-[var(--ads-spacing-3)]">
              <div className={cn("h-[140px] rounded-[var(--ads-radius-md)]", status === "ready" ? "bg-[linear-gradient(135deg,var(--yellow-200),var(--ads-background-brand))]" : "bg-[linear-gradient(90deg,var(--ads-border-default),var(--ads-border-subtle),var(--ads-border-default))]")} />
              <div className="grid grid-cols-[120px_1fr] gap-[var(--ads-spacing-3)]">
                <div className="h-[120px] rounded-[var(--ads-radius-md)] bg-[var(--ads-background-muted)]" />
                <div className="grid content-start gap-[var(--ads-spacing-2)]">
                  <div className="h-3 rounded bg-[var(--ads-background-muted)]" />
                  <div className="h-3 rounded bg-[var(--ads-background-muted)]" />
                  <div className="h-3 w-1/2 rounded bg-[var(--ads-background-muted)]" />
                </div>
              </div>
            </div>
            <Button disabled={status !== "ready"} onClick={useImported}>Insert Imported Section</Button>
          </section>
        </div>
      </section>
    </div>
  );
}

export function BuilderShell({ importedBlocks = [] }: { importedBlocks?: EmailBlock[] } = {}) {
  const [blocks, setBlocks] = useState<EmailBlock[]>(() => [...initialBlocks, ...importedBlocks]);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [paletteDragKind, setPaletteDragKind] = useState<BlockKind | null>(null);
  const [selectedId, setSelectedId] = useState(initialBlocks[0]?.id);
  const selectedBlock = useMemo(() => blocks.find((block) => block.id === selectedId) ?? blocks[0], [blocks, selectedId]);

  useEffect(() => {
    if (importedBlocks.length === 0) return;
    const incoming = importedBlocks.filter((importedBlock) => !blocks.some((block) => block.id === importedBlock.id));
    if (incoming.length === 0) return;
    setBlocks((current) => [...current, ...incoming]);
    setSelectedId(incoming[incoming.length - 1]?.id ?? selectedId);
  }, [blocks, importedBlocks, selectedId]);

  const addBlock = (kind: BlockKind) => {
    const block = makeBlock(kind);
    setBlocks((current) => [...current, block]);
    setSelectedId(block.id);
  };

  const insertBlockBefore = (kind: BlockKind, beforeId: string) => {
    const block = makeBlock(kind);
    setBlocks((current) => {
      const beforeIndex = current.findIndex((item) => item.id === beforeId);
      if (beforeIndex < 0) return [...current, block];
      return [...current.slice(0, beforeIndex), block, ...current.slice(beforeIndex)];
    });
    setSelectedId(block.id);
  };

  const moveBlockBefore = (fromId: string, beforeId: string) => {
    if (fromId === beforeId) return;
    setBlocks((current) => {
      const moving = current.find((block) => block.id === fromId);
      if (!moving) return current;
      const withoutMoving = current.filter((block) => block.id !== fromId);
      const beforeIndex = withoutMoving.findIndex((block) => block.id === beforeId);
      if (beforeIndex < 0) return [...withoutMoving, moving];
      return [...withoutMoving.slice(0, beforeIndex), moving, ...withoutMoving.slice(beforeIndex)];
    });
    setSelectedId(fromId);
  };

  const updateSelectedBlock = (patch: Partial<EmailBlock>) => {
    if (!selectedBlock) return;
    setBlocks((current) => current.map((block) => (block.id === selectedBlock.id ? { ...block, ...patch } : block)));
  };

  const duplicateSelectedBlock = () => {
    if (!selectedBlock) return;
    const clone = { ...selectedBlock, id: `${selectedBlock.kind}-${Date.now()}` };
    setBlocks((current) => {
      const selectedIndex = current.findIndex((block) => block.id === selectedBlock.id);
      return [...current.slice(0, selectedIndex + 1), clone, ...current.slice(selectedIndex + 1)];
    });
    setSelectedId(clone.id);
  };

  const deleteSelectedBlock = () => {
    if (!selectedBlock || blocks.length <= 1) return;
    setBlocks((current) => current.filter((block) => block.id !== selectedBlock.id));
    setSelectedId(blocks.find((block) => block.id !== selectedBlock.id)?.id ?? "");
  };

  return (
    <div className="flex h-[calc(100vh-56px)] min-h-[720px] overflow-hidden bg-[var(--ads-background-subtle)]">
      <ComponentPalette onAddBlock={addBlock} onDragBlockEnd={() => setPaletteDragKind(null)} onDragBlockStart={setPaletteDragKind} />
      <main className="min-w-0 flex-1 overflow-auto">
        <div className="grid min-w-[720px] justify-items-center gap-[var(--ads-spacing-4)] px-[var(--ads-spacing-8)] py-[var(--ads-spacing-5)]">
          <div className="sticky top-4 z-10 flex h-10 items-center rounded-[var(--ads-radius-lg)] bg-[var(--ads-surface-default)] px-[var(--ads-spacing-1)] shadow-ads-card">
            <button className={cn("grid size-8 place-items-center rounded-[var(--ads-radius-md)]", device === "desktop" ? "bg-[var(--ads-background-subtle)] text-[color:var(--ads-text-default)]" : "text-[color:var(--ads-text-muted)]")} onClick={() => setDevice("desktop")} type="button">
              <Icon name="monitor" />
            </button>
            <button className={cn("grid size-8 place-items-center rounded-[var(--ads-radius-md)]", device === "mobile" ? "bg-[var(--ads-background-subtle)] text-[color:var(--ads-text-default)]" : "text-[color:var(--ads-text-muted)]")} onClick={() => setDevice("mobile")} type="button">
              <Icon name="mobile" />
            </button>
          </div>
          <div className="grid gap-[var(--ads-spacing-4)]">
            <EmailCanvas
              blocks={blocks}
              className={cn(device === "mobile" && "w-[375px]")}
              isPaletteDragging={Boolean(paletteDragKind)}
              onAddBlock={addBlock}
              onInsertBlockBefore={insertBlockBefore}
              onMoveBlock={moveBlockBefore}
              onSelectBlock={setSelectedId}
              selectedId={selectedBlock?.id}
            />
            <GhostPreview />
          </div>
        </div>
      </main>
      <InspectorPanel block={selectedBlock} onDelete={deleteSelectedBlock} onDuplicate={duplicateSelectedBlock} onUpdate={updateSelectedBlock} />
    </div>
  );
}

export function BuilderTopNav({
  onBack,
  onImport,
  onSendFinal,
  onSendTest,
}: {
  onBack?: () => void;
  onImport?: () => void;
  onSendFinal?: () => void;
  onSendTest?: () => void;
}) {
  return (
    <header className="flex h-[56px] items-center justify-between gap-[var(--ads-spacing-4)] border-b border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] px-[var(--ads-spacing-5)]">
      <div className="flex min-w-0 items-center gap-[var(--ads-spacing-3)]">
        <button className="grid size-8 shrink-0 place-items-center rounded-[var(--ads-radius-md)] text-[color:var(--ads-text-secondary)] hover:bg-[var(--ads-background-page)]" onClick={onBack} type="button">
          <Icon name="arrowLeft" size={20} />
        </button>
        <Breadcrumbs items={["Campaigns", "Lunar New Year 2025", "Edit Content"]} />
      </div>
      <div className="flex shrink-0 items-center gap-[var(--ads-spacing-2)]">
        <Button variant="ghost">Preview</Button>
        <Button variant="ghost">Save Draft</Button>
        <Button variant="ghost" onClick={onImport}>Import HTML</Button>
        <Button variant="border" onClick={onSendTest}>Send Test</Button>
        <Button onClick={onSendFinal}>Send Final</Button>
      </div>
    </header>
  );
}

export function BuilderScreen({
  onBack,
  onSendFinal,
  onSendTest,
}: {
  onBack?: () => void;
  onSendFinal?: () => void;
  onSendTest?: () => void;
}) {
  const [showImport, setShowImport] = useState(false);
  const [importedBlocks, setImportedBlocks] = useState<EmailBlock[]>([]);

  return (
    <div className="relative min-h-screen bg-[var(--ads-background-subtle)]">
      <BuilderTopNav onBack={onBack} onImport={() => setShowImport(true)} onSendFinal={onSendFinal} onSendTest={onSendTest} />
      <BuilderShell importedBlocks={importedBlocks} />
      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImported={(block) => {
            setImportedBlocks((current) => [...current, block]);
          }}
        />
      )}
    </div>
  );
}
