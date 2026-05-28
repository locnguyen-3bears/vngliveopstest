import type { ReactNode } from "react";
import {
  Badge,
  BuilderPanelPropertyRow,
  BuilderPanelSectionHeader,
  BuilderPanelToggleRow,
  BuilderShell,
  Button,
  ButtonBuilder,
  Checkbox,
  DataTable,
  DropZone,
  Dropdown,
  DropdownOption,
  FeaturedItemCard,
  FilterTabs,
  IconButton,
  PageHeader,
  Pagination,
  SearchField,
  Sidebar,
  StatCard,
  TableActionsCell,
  TableBadgeCell,
  TableBasicCell,
  TableCheckboxCell,
  TableHeaderCell,
  TableProgress,
  TableTextSub,
  TextField,
  Textarea,
  TimerDigit,
  Topbar,
  figmaSource,
  tokens,
} from "../design-system";

const buttonVariants = ["primary", "secondary", "border", "soft", "ghost", "ghostSoft"] as const;
const buttonSizes = ["sm", "md", "lg", "xl"] as const;
const statuses = [
  ["live", "Live"],
  ["active", "Active"],
  ["ended", "Ended"],
  ["draft", "Draft"],
  ["scheduled", "Scheduled"],
] as const;

const tabItems = [
  { id: "all", label: "Tat ca", count: 24 },
  { id: "running", label: "Dang Chay", count: 8 },
  { id: "draft", label: "Ban Nhap", count: 6 },
  { id: "scheduled", label: "Da Len Lich", count: 5 },
  { id: "ended", label: "Da Ket Thuc", count: 5 },
];

function TokenSwatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-md)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-3)]">
      <span className="size-8 shrink-0 rounded-[var(--ads-radius-md)] border border-[var(--ads-border-default)]" style={{ background: value }} />
      <span className="grid min-w-0 gap-0.5">
        <span className="truncate text-[length:var(--ads-font-size-13)] font-medium">{label}</span>
        <span className="truncate text-[length:var(--ads-font-size-11)] text-[color:var(--ads-text-subtle)]">{value}</span>
      </span>
    </div>
  );
}

function Section({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="grid gap-[var(--ads-spacing-4)]">
      <div className="flex items-end justify-between gap-[var(--ads-spacing-4)]">
        <h2 className="text-[length:var(--ads-font-size-20)] font-semibold leading-[var(--ads-line-height-28)]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function ComponentReview() {
  return (
    <main className="min-w-0 flex-1 overflow-auto">
      <header className="border-b border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] px-[var(--ads-spacing-8)] py-[var(--ads-spacing-6)]">
        <div className="flex flex-wrap items-start justify-between gap-[var(--ads-spacing-4)]">
          <div className="grid gap-[var(--ads-spacing-2)]">
            <p className="text-[length:var(--ads-font-size-12)] font-semibold uppercase text-[color:var(--ads-text-subtle)]">Component review</p>
            <h1 className="text-[24px] font-semibold leading-[var(--ads-line-height-32)]">LiveOps Design System</h1>
            <p className="max-w-[720px] text-[length:var(--ads-font-size-14)] text-[color:var(--ads-text-subtle)]">
              Preview every reusable component built from the Figma Components page and the shared patterns found in Screens.
            </p>
          </div>
          <div className="rounded-[var(--ads-radius-lg)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-subtle)] px-[var(--ads-spacing-4)] py-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-12)] text-[color:var(--ads-text-subtle)]">
            Figma page <span className="font-semibold text-[color:var(--ads-text-default)]">{figmaSource.pages.components}</span>
          </div>
        </div>
      </header>

      <div className="grid gap-[var(--ads-spacing-8)] p-[var(--ads-spacing-8)]">
        <Section title="Foundation Tokens">
          <div className="ds-grid">
            <TokenSwatch label="Action / Primary" value={tokens.color.action.primaryBg} />
            <TokenSwatch label="Action / Border" value={tokens.color.action.borderStroke} />
            <TokenSwatch label="Surface / Default" value={tokens.color.surface.default} />
            <TokenSwatch label="Background / Muted" value={tokens.color.background.muted} />
            <TokenSwatch label="Status / Live" value={tokens.color.status.live} />
            <TokenSwatch label="Text / Default" value={tokens.color.text.default} />
          </div>
        </Section>

        <Section title="Buttons">
          <div className="ds-panel grid gap-[var(--ads-spacing-5)] rounded-[var(--ads-radius-lg)] p-[var(--ads-spacing-5)]">
            <div className="flex flex-wrap items-center gap-[var(--ads-spacing-3)]">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
              <Button disabled>Disabled</Button>
              <IconButton variant="border">
                <span className="block size-4 rounded-[var(--radius-2)] bg-current" />
              </IconButton>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--ads-spacing-3)]">
              {buttonSizes.map((size) => (
                <Button key={size} size={size} variant="primary">
                  {size.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Navigation & Page Shell">
          <div className="grid gap-[var(--ads-spacing-4)] lg:grid-cols-[280px_1fr]">
            <div className="grid grid-cols-[220px_56px] overflow-hidden rounded-[var(--ads-radius-lg)] border border-[var(--ads-border-default)] bg-[var(--ads-sidebar-bg)]">
              <Sidebar />
              <Sidebar mini />
            </div>
            <div className="ds-panel overflow-hidden rounded-[var(--ads-radius-lg)]">
              <Topbar breadcrumbs={["Campaigns", "Lunar New Year 2025", "Edit Content"]} />
              <div className="grid gap-[var(--ads-spacing-5)] p-[var(--ads-spacing-6)]">
                <PageHeader subtitle="Quan ly nhom nguoi choi cho cac chien dich muc tieu." title="Phan Khuc">
                  <Button>+ Phan Khuc Moi</Button>
                </PageHeader>
                <FilterTabs activeId="running" items={tabItems} />
                <div className="grid gap-[var(--ads-spacing-3)] md:grid-cols-3">
                  <StatCard icon="folder" label="Tong Phan Khuc" value="24" />
                  <StatCard accent change="+12.4% thang nay" icon="users" label="Tong Nguoi Choi" value="1,284,390" />
                  <StatCard icon="zap" label="Active in Campaign" value="8" />
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Builder Components">
          <div className="grid gap-[var(--ads-spacing-4)] md:grid-cols-[280px_1fr]">
            <div className="grid gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-lg)] bg-[var(--zinc-300)] p-[var(--ads-spacing-4)]">
              <ButtonBuilder />
              <ButtonBuilder state="hover" />
              <ButtonBuilder state="grabbing" />
              <DropZone />
              <DropZone state="DragOver" />
            </div>
            <div className="ds-panel grid content-start gap-[var(--ads-spacing-4)] rounded-[var(--ads-radius-lg)] p-[var(--ads-spacing-5)]">
              <div className="grid gap-[var(--ads-spacing-4)] rounded-[var(--ads-radius-lg)] bg-[var(--violet-50)] p-[var(--ads-spacing-5)]">
                <div className="flex flex-wrap items-center gap-[40px]">
                  <SearchField state="Default" />
                  <SearchField state="Focused" />
                  <SearchField state="Filled" />
                  <SearchField disabled />
                </div>
                <div className="flex flex-wrap items-center gap-[40px]">
                  <SearchField placeholder="Search component..." size="M" state="Default" />
                  <SearchField placeholder="Search component..." size="M" state="Focused" />
                  <SearchField placeholder="Search component..." size="M" state="Filled" />
                  <SearchField disabled placeholder="Search component..." size="M" />
                </div>
              </div>
              <TextField label="Campaign name" placeholder="Lunar New Year 2025" />
              <div className="flex flex-wrap gap-[var(--ads-spacing-3)]">
                <Checkbox label="Include inactive users" />
                <Checkbox defaultChecked label="Send test first" />
              </div>
              <div className="flex flex-wrap gap-[var(--ads-spacing-2)]">
                {statuses.map(([status, label]) => (
                  <Badge key={status} dot status={status}>
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Form Controls">
          <div className="grid gap-[var(--ads-spacing-4)]">
            <div className="ds-panel grid gap-[var(--ads-spacing-4)] rounded-[var(--ads-radius-lg)] p-[var(--ads-spacing-5)]">
              <div className="flex flex-wrap items-start gap-[var(--ads-spacing-4)]">
                <TextField placeholder="Placeholder text" size="S" />
                <TextField placeholder="Placeholder text" size="M" state="Hover" />
                <TextField defaultValue="Placeholder text" size="M" state="Focused" />
                <TextField defaultValue="Placeholder text" error message="Required field" size="M" />
                <TextField disabled placeholder="Placeholder text" size="M" />
                <TextField defaultValue="Placeholder text" size="L" />
              </div>
              <div className="grid gap-[var(--ads-spacing-4)] md:grid-cols-3">
                <Textarea placeholder="Placeholder text" size="SM" />
                <Textarea placeholder="Placeholder text" size="MD" state="Focused" />
                <Textarea defaultValue="Sample content text..." size="LG" state="Filled" />
              </div>
            </div>
            <div className="ds-panel grid gap-[var(--ads-spacing-5)] rounded-[var(--ads-radius-lg)] p-[var(--ads-spacing-5)] lg:grid-cols-[320px_1fr]">
              <div className="grid content-start gap-[var(--ads-spacing-4)]">
                <Dropdown />
                <Dropdown state="Open" />
                <Dropdown selectedValues={["option-a"]} state="Filled" />
                <Dropdown error />
                <Dropdown disabled />
                <Dropdown selectedValues={["option-a", "option-b", "option-c"]} type="Multi" />
              </div>
              <div className="grid content-start gap-[var(--ads-spacing-2)]">
                <DropdownOption>Ten tuy chon</DropdownOption>
                <DropdownOption state="Hover">Ten tuy chon</DropdownOption>
                <DropdownOption selected>Ten tuy chon</DropdownOption>
                <DropdownOption disabled>Ten tuy chon</DropdownOption>
                <DropdownOption type="Multi">Ten tuy chon</DropdownOption>
                <DropdownOption selected type="Multi">Ten tuy chon</DropdownOption>
                <DropdownOption disabled type="Multi">Ten tuy chon</DropdownOption>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Email Builder Blocks">
          <div className="grid gap-[var(--ads-spacing-4)] xl:grid-cols-[320px_1fr]">
            <div className="ds-panel grid content-start gap-[var(--ads-spacing-4)] rounded-[var(--ads-radius-lg)] p-[var(--ads-spacing-5)]">
              <BuilderPanelSectionHeader title="Hero Image" />
              <BuilderPanelPropertyRow label="Alt Text">
                <TextField defaultValue="Lunar New Year promotional art" />
              </BuilderPanelPropertyRow>
              <BuilderPanelToggleRow label="Show countdown timer" />
            </div>
            <div className="ds-panel grid gap-[var(--ads-spacing-5)] rounded-[var(--ads-radius-lg)] p-[var(--ads-spacing-5)]">
              <div className="flex flex-wrap items-start gap-[var(--ads-spacing-5)]">
                <FeaturedItemCard />
                <div className="grid gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-lg)] bg-[var(--gaming-surface-deep)] p-[var(--ads-spacing-5)]">
                  <p className="text-[length:var(--ads-font-size-12)] font-bold uppercase text-[color:var(--ads-feedback-warning-icon)]">Timer Digit</p>
                  <TimerDigit />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Email Builder Shell">
          <BuilderShell />
        </Section>

        <Section title="Table System">
          <div className="grid gap-[var(--ads-spacing-4)]">
            <div className="ds-panel overflow-x-auto rounded-[var(--ads-radius-lg)] p-[var(--ads-spacing-5)]">
              <div className="flex min-w-[760px] flex-wrap items-start gap-[var(--ads-spacing-4)]">
                <TableHeaderCell>Label</TableHeaderCell>
                <TableHeaderCell type="checkbox" width="w-[40px]" />
                <TableCheckboxCell />
                <TableTextSub />
                <TableBasicCell>Strong cell</TableBasicCell>
                <TableBasicCell emphasis="medium">Medium cell</TableBasicCell>
                {statuses.map(([status]) => (
                  <TableBadgeCell key={status} status={status} />
                ))}
                <TableProgress />
                <TableActionsCell />
              </div>
            </div>
            <div className="overflow-x-auto">
              <DataTable />
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
