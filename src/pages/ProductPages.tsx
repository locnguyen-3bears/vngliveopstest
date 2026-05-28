import { useState, type ReactNode } from "react";
import {
  Badge,
  BuilderScreen,
  Button,
  Checkbox,
  DataTable,
  EmailCanvas,
  FilterTabs,
  Icon,
  IconButton,
  PageHeader,
  Pagination,
  Sidebar,
  StatCard,
  TableActionsCell,
  TableBasicCell,
  TableHeaderCell,
  TableProgress,
  TableStatusCell,
  TableTextSub,
  TextField,
  Textarea,
  Topbar,
  type SidebarRoute,
} from "../design-system";
import { cn } from "../design-system/utils";

type ProductPageProps = {
  activeId: SidebarRoute;
  onNavigate: (id: SidebarRoute | "createCampaign" | "sendReview") => void;
};

const routeTitles: Record<Exclude<SidebarRoute, "components">, string> = {
  analytics: "Analytics",
  builder: "Builder",
  campaigns: "Campaigns",
  dashboard: "Dashboard",
  promotions: "Promotions",
  segments: "Segments",
  templates: "Templates",
};

function ProductShell({ activeId, children, onNavigate }: ProductPageProps & { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--ads-background-subtle)]">
      <Sidebar activeId={activeId} mini viewport onNavigate={onNavigate} />
      <main className="min-w-0 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

function InputBox({ label, placeholder, textarea = false }: { label: string; placeholder: string; textarea?: boolean }) {
  return (
    <label className="grid gap-[var(--ads-spacing-2)]">
      <span className="font-medium">{label}</span>
      <span className={cn("flex items-start rounded-[var(--ads-radius-lg)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] px-[var(--ads-spacing-4)] py-[var(--ads-spacing-3)] text-[color:var(--ads-text-subtle)]", textarea ? "h-[100px]" : "h-11")}>
        {placeholder}
      </span>
    </label>
  );
}

function RadioRow({ checked = false, label }: { checked?: boolean; label: string }) {
  return (
    <div className="flex items-center gap-[var(--ads-spacing-2)]">
      <span className={cn("grid size-[18px] place-items-center rounded-full border", checked ? "border-[var(--ads-border-brand)]" : "border-[var(--ads-border-strong)]")}>
        {checked && <span className="size-2 rounded-full bg-[var(--ads-background-brand)]" />}
      </span>
      <span>{label}</span>
    </div>
  );
}

function ImportSection({ cta = "Import", subtitle, title }: { cta?: string; subtitle: string; title: string }) {
  return (
    <section className="rounded-[var(--ads-radius-xl)] border border-dashed border-[var(--ads-border-brand)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-5)]">
      <div className="flex items-center gap-[var(--ads-spacing-4)]">
        <div className="grid size-12 place-items-center rounded-full bg-[var(--ads-feedback-brand-border)] text-[color:var(--ads-text-brand)]">
          <Icon name="filePlus" size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">{subtitle}</p>
        </div>
        <Button size="sm">{cta}</Button>
      </div>
    </section>
  );
}

function ScreenFrame({ children, title }: { children: ReactNode; title: string }) {
  return (
    <>
      <Topbar
        actions={
          <>
            <TextField aria-label={`Search ${title}`} className="w-[320px]" placeholder={`Search ${title.toLowerCase()}...`} />
            <Button variant="ghost">+ New</Button>
          </>
        }
        title={title}
      />
      <div className="grid gap-[var(--ads-spacing-4)] p-[var(--ads-spacing-6)]">
        {children}
      </div>
    </>
  );
}

function MetricGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-[var(--ads-spacing-3)] md:grid-cols-3">{children}</div>;
}

function CardsRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-[var(--ads-spacing-3)] md:grid-cols-3">{children}</div>;
}

function TemplateCard({ label, subtitle, tone = "brand" }: { label: string; subtitle: string; tone?: "brand" | "dark" | "success" }) {
  return (
    <article className="grid gap-[var(--ads-spacing-4)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-4)]">
      <div
        className={cn(
          "h-[140px] rounded-[var(--ads-radius-lg)]",
          tone === "brand" && "bg-[linear-gradient(135deg,var(--violet-200),var(--ads-background-brand))]",
          tone === "dark" && "bg-[linear-gradient(135deg,var(--zinc-900),var(--zinc-600))]",
          tone === "success" && "bg-[linear-gradient(135deg,var(--green-100),var(--ads-feedback-success-icon))]",
        )}
      />
      <div>
        <h3 className="font-semibold">{label}</h3>
        <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">{subtitle}</p>
      </div>
      <Button variant="border">Use Template</Button>
    </article>
  );
}

function PromotionCard({ status = "active", title }: { status?: "active" | "draft" | "scheduled"; title: string }) {
  return (
    <article className="grid gap-[var(--ads-spacing-4)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-4)]">
      <div className="flex items-start justify-between gap-[var(--ads-spacing-3)]">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">Reward offer across selected games</p>
        </div>
        <Badge status={status === "active" ? "success" : status === "draft" ? "neutral" : "brand"}>{status}</Badge>
      </div>
      <div className="h-2 rounded-full bg-[var(--ads-background-muted)]">
        <div className="h-2 w-2/3 rounded-full bg-[var(--ads-background-brand)]" />
      </div>
      <div className="flex justify-between text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">
        <span>12,430 players</span>
        <span>68% claimed</span>
      </div>
    </article>
  );
}

function DashboardTopbar({ onNewCampaign }: { onNewCampaign?: () => void }) {
  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-[var(--ads-spacing-3)] border-b border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] px-[clamp(16px,2.3vw,32px)] py-[var(--ads-spacing-3)]">
      <h1 className="min-w-[180px] text-[length:var(--ads-font-size-18)] font-semibold leading-[var(--ads-line-height-28)]">Campaign Platform</h1>
      <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-[var(--ads-spacing-3)]">
        <TextField aria-label="Search campaigns" className="h-[38px] w-full min-w-[220px] sm:w-[300px]" leading={<Icon name="search" size={16} />} placeholder="Search campaigns..." />
        <Button className="h-10 min-h-10 rounded-[8px] px-[18px]" onClick={onNewCampaign}>+ New Campaign</Button>
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--yellow-100),var(--orange-900))] ring-2 ring-[var(--ads-surface-default)]">
          <span className="size-7 rounded-full bg-[linear-gradient(135deg,var(--yellow-300),var(--yellow-950))]" />
        </div>
      </div>
    </header>
  );
}

function DashboardMetricCard({ change, direction = "up", label, value }: { change: string; direction?: "down" | "stable" | "up"; label: string; value: string }) {
  const tone = direction === "down" ? "bg-[var(--red-100)] text-[color:var(--ads-feedback-error-text)]" : direction === "stable" ? "bg-[var(--blue-100)] text-[color:var(--ads-feedback-info-text)]" : "bg-[var(--emerald-100)] text-[color:var(--ads-feedback-success-text)]";

  return (
    <article className="grid min-h-[112px] content-start gap-[8px] rounded-[8px] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] px-[16px] py-[18px] shadow-ads-card">
      <p className="text-[11px] font-medium uppercase leading-[16px] text-[color:var(--ads-text-muted)]">{label}</p>
      <p className="text-[26px] font-semibold leading-[32px] text-[color:var(--ads-text-default)]">{value}</p>
      <span className={cn("w-fit max-w-full rounded-[4px] px-[6px] py-[2px] text-[12px] font-medium leading-[16px]", tone)}>{change}</span>
    </article>
  );
}

function DashboardPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-[12px] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] shadow-ads-card", className)}>{children}</section>;
}

function EmailPerformanceChart() {
  return (
    <DashboardPanel className="min-h-[336px] p-[clamp(16px,2vw,24px)]">
      <div className="flex flex-wrap items-start justify-between gap-[var(--ads-spacing-3)]">
        <div>
          <h2 className="text-[16px] font-semibold leading-[24px] text-[color:var(--ads-text-default)]">Email Performance</h2>
          <p className="mt-[4px] text-[14px] leading-[20px] text-[color:var(--ads-text-subtle)]">Open Rate vs Click Rate - last 30 days</p>
        </div>
        <div className="flex rounded-[8px] bg-[var(--ads-background-subtle)] p-[4px] text-[12px] font-medium text-[color:var(--ads-text-subtle)]">
          <button className="h-8 rounded-[6px] px-[14px]" type="button">7D</button>
          <button className="h-8 rounded-[6px] bg-[var(--ads-surface-default)] px-[14px] text-[color:var(--ads-text-brand)] shadow-[var(--ads-shadow-control)]" type="button">30D</button>
          <button className="h-8 rounded-[6px] px-[14px]" type="button">90D</button>
        </div>
      </div>
      <div className="relative mt-[18px] h-[208px]">
        <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 952 208">
          {[20, 65, 110, 155, 200].map((y) => <line key={y} stroke="var(--ads-border-default)" strokeWidth="1" x1="0" x2="952" y1={y} y2={y} />)}
          <path d="M0 178 C120 132 190 120 265 86 C355 48 455 64 560 38 C665 12 760 33 952 0" fill="none" stroke="var(--ads-background-brand)" strokeLinecap="round" strokeWidth="3" />
          <path d="M0 180 C115 135 190 119 272 96 C370 69 455 65 562 42 C675 18 785 22 952 1" fill="none" stroke="var(--ads-feedback-info-icon)" strokeLinecap="round" strokeWidth="3" />
        </svg>
      </div>
      <div className="mt-[4px] flex flex-wrap gap-x-[24px] gap-y-[8px] text-[13px] leading-[20px] text-[color:var(--ads-text-default)]">
        <span className="flex items-center gap-[8px]"><span className="size-[10px] rounded-[2px] bg-[var(--ads-background-brand)]" />Open Rate 42.6%</span>
        <span className="flex items-center gap-[8px]"><span className="size-[10px] rounded-[2px] bg-[var(--ads-feedback-info-icon)]" />Click Rate 8.4%</span>
      </div>
    </DashboardPanel>
  );
}

const campaignRows = [
  ["Dragon Skin Flash Sale", "Jan 22", "Valor Strike", "Live", "44.2% open", 72, "$12,600"],
  ["New Year Bundle", "Jan 22", "Valor Strike", "Live", "41.8% open", 66, "$8,400"],
  ["Weekend Warrior Pack", "Jan 22", "Tất Cả Game", "Ended", "38.6% open", 54, "-"],
  ["New Player Welcome", "Jan 22", "Tất Cả Game", "Scheduled", "Preview", 18, "$6,800"],
  ["VIP Loyalty Reward", "Jan 22", "CyberRun", "Draft", "Draft", 10, "-"],
] as const;

const dashboardStatus = {
  Draft: "draft",
  Ended: "ended",
  Live: "live",
  Scheduled: "scheduled",
} as const;

function EmailCampaignsTable() {
  return (
    <DashboardPanel className="min-h-[460px] p-[clamp(16px,2vw,24px)]">
      <div className="flex flex-wrap items-center justify-between gap-[var(--ads-spacing-3)]">
        <h2 className="text-[16px] font-semibold leading-[24px] text-[color:var(--ads-text-default)]">Email Campaigns</h2>
        <button className="text-[14px] font-medium leading-[20px] text-[color:var(--ads-text-brand)]" type="button">Export CSV ↓</button>
      </div>
      <FilterTabs
        activeId="live"
        className="mt-[14px]"
        items={[
          { count: 24, id: "all", label: "All" },
          { count: 8, id: "live", label: "Live" },
          { count: 5, id: "scheduled", label: "Scheduled" },
          { count: 7, id: "draft", label: "Draft" },
          { count: 4, id: "ended", label: "Ended" },
        ]}
      />
      <div className="mt-[12px] overflow-x-auto rounded-[6px] border border-[var(--ads-border-default)]">
        <div className="min-w-[800px]">
          <div className="flex bg-[var(--ads-surface-subtle)]">
            <TableHeaderCell width="w-[240px]">Campaign</TableHeaderCell>
            <TableHeaderCell width="w-[150px]">Game</TableHeaderCell>
            <TableHeaderCell width="w-[88px]">Status</TableHeaderCell>
            <TableHeaderCell width="w-[150px]">Performance</TableHeaderCell>
            <TableHeaderCell width="w-[130px]">Revenue</TableHeaderCell>
            <TableHeaderCell width="w-[40px]" />
          </div>
          {campaignRows.map(([name, date, game, status, performance, progress, revenue]) => (
            <div className="flex border-t border-[var(--ads-border-subtle)] bg-[var(--ads-surface-default)] transition-colors hover:bg-[var(--ads-surface-subtle)]" key={name}>
              <TableTextSub primary={name} secondary={date} />
              <TableBasicCell emphasis="medium" width="w-[150px]">{game}</TableBasicCell>
              <TableStatusCell label={status} status={dashboardStatus[status]} />
              <TableProgress progress={progress} value={performance} />
              <TableBasicCell width="w-[130px]">{revenue}</TableBasicCell>
              <TableActionsCell />
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}

function UpcomingEmails() {
  const emails = [["VS", "VIP Surge", "Valor Strike", "Jan 25", "bg-[var(--ads-background-brand)]"], ["CR", "Legendary Drops", "CyberRun", "Jan 28", "bg-[var(--ads-feedback-info-icon)]"], ["AG", "New Player Welcome", "All Games", "Feb 2", "bg-[var(--special-reward-bg)]"]];

  return (
    <DashboardPanel className="min-h-[216px] p-[20px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-semibold leading-[24px]">Upcoming Emails</h2>
        <span className="rounded-full bg-[var(--ads-feedback-success-bg)] px-[12px] py-[4px] text-[14px] font-semibold leading-[20px] text-[color:var(--ads-feedback-success-icon)]">3 scheduled</span>
      </div>
      <div className="mt-[18px] grid gap-[12px]">
        {emails.map(([initials, name, game, date, color]) => (
          <div className="grid grid-cols-[36px_1fr_auto] items-center gap-[12px]" key={name}>
            <span className={cn("grid size-9 place-items-center rounded-full text-[12px] font-medium text-[color:var(--ads-text-inverse)]", color)}>{initials}</span>
            <span className="grid"><span className="text-[14px] font-semibold leading-[20px] text-[color:var(--ads-text-default)]">{name}</span><span className="text-[11px] leading-[16px] text-[color:var(--ads-text-muted)]">{game}</span></span>
            <span className="text-[12px] leading-[16px] text-[color:var(--ads-text-default)]">{date}</span>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}

function BestSendTimes() {
  const rows = [["9:00 AM", "Tuesday", "51.2%", "w-[82%]"], ["7:00 PM", "Friday", "48.7%", "w-[77%]"], ["12:00 PM", "Wednesday", "44.3%", "w-[61%]"]];

  return (
    <DashboardPanel className="min-h-[224px] p-[20px]">
      <h2 className="text-[16px] font-semibold leading-[24px]">Best Send Times</h2>
      <p className="mt-[4px] text-[12px] leading-[16px] text-[color:var(--ads-text-muted)]">Highest open rates, last 30 days</p>
      <div className="mt-[18px] grid gap-[12px]">
        {rows.map(([time, day, value, width]) => (
          <div className="grid gap-[8px]" key={time}>
            <div className="flex items-center justify-between"><span className="text-[14px] font-semibold leading-[20px] text-[color:var(--ads-text-default)]">{time} <span className="ml-[8px] font-normal text-[color:var(--ads-text-muted)]">{day}</span></span><span className="text-[14px] leading-[20px] text-[color:var(--ads-text-brand)]">{value}</span></div>
            <span className="h-[5px] rounded-full bg-[var(--ads-background-subtle)]"><span className={cn("block h-full rounded-full bg-[var(--ads-background-brand)]", width)} /></span>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}

function EmailHealth() {
  const rows = [["Deliverability", "98.5%"], ["Spam Score", "0.12%"], ["List Growth", "+3.2%"]];

  return (
    <DashboardPanel className="min-h-[263px] p-[20px]">
      <div className="flex items-start justify-between">
        <h2 className="mt-[28px] text-[16px] font-semibold leading-[24px]">Email Health</h2>
        <div className="grid justify-items-center gap-[4px]"><span className="grid size-[52px] place-items-center rounded-full border-[3px] border-[var(--ads-feedback-success-icon)] text-[24px] font-semibold leading-[32px] text-[color:var(--ads-feedback-success-icon)]">97</span><span className="text-[12px] font-semibold leading-[16px] text-[color:var(--ads-feedback-success-icon)]">Healthy</span></div>
      </div>
      <div className="mt-[30px] grid">
        {rows.map(([label, value]) => (
          <div className="flex h-[48px] items-center justify-between border-b border-[var(--ads-border-default)] text-[14px] leading-[20px] last:border-b-0" key={label}>
            <span className="flex items-center gap-[8px] text-[color:var(--ads-text-default)]"><span className="size-2 rounded-full bg-[var(--ads-feedback-success-icon)]" />{label}</span>
            <span className="text-[color:var(--ads-feedback-success-icon)]">{value}</span>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}

export function DashboardPage(props: ProductPageProps) {
  return (
    <ProductShell {...props}>
      <DashboardTopbar onNewCampaign={() => props.onNavigate("createCampaign")} />
      <div className="grid w-full gap-[16px] p-[clamp(16px,2vw,24px)] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-[16px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[8px]">
            <DashboardMetricCard change="↑ 12.5% this month" label="Emails Sent" value="284,300" />
            <DashboardMetricCard change="↑ +3.2pts" label="Open Rate" value="42.6%" />
            <DashboardMetricCard change="↑ -0.8pts" direction="down" label="Click Rate (CTR)" value="8.4%" />
            <DashboardMetricCard change="↑ -0.04pts" label="Conversion" value="0.31%" />
            <DashboardMetricCard change="~ stable" direction="stable" label="Bounce Rate" value="1.2%" />
            <DashboardMetricCard change="↑ +18% vs last month" label="Email Revenue" value="$48,200" />
          </div>
          <EmailPerformanceChart />
          <EmailCampaignsTable />
        </div>
        <aside className="grid content-start gap-[16px] md:grid-cols-3 xl:grid-cols-1 xl:gap-[24px]">
          <UpcomingEmails />
          <BestSendTimes />
          <EmailHealth />
        </aside>
      </div>
    </ProductShell>
  );
}

export function CampaignsPage(props: ProductPageProps) {
  return (
    <ProductShell {...props}>
      <ScreenFrame title="Campaigns">
        <PageHeader subtitle="Danh sach email marketing campaigns, trang thai gui, audience va hieu qua phan hoi." title="Campaigns">
          <Button onClick={() => props.onNavigate("createCampaign")}>+ New Campaign</Button>
        </PageHeader>
        <MetricGrid>
          <StatCard icon="campaign" label="Total Campaigns" value="42" />
          <StatCard accent icon="zap" label="Sending Today" value="9" />
          <StatCard icon="analytics" label="Avg Open Rate" value="41.2%" />
        </MetricGrid>
        <div className="rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)]">
          <div className="flex items-center justify-between p-[var(--ads-spacing-5)]">
            <FilterTabs activeId="all" items={[{ id: "all", label: "All" }, { id: "live", label: "Live" }, { id: "draft", label: "Draft" }, { id: "scheduled", label: "Scheduled" }]} />
            <Button variant="ghost">Export CSV</Button>
          </div>
          <div className="overflow-hidden border-t border-[var(--ads-border-default)]">
            {[
              ["Lunar New Year 2025", "Promotional", "Ready", "248,392", "42.8%", "11.6%"],
              ["VIP Comeback Flow", "Retention", "Draft", "18,240", "-", "-"],
              ["Weekend Reward Drop", "Reward", "Scheduled", "92,100", "39.1%", "8.4%"],
              ["Patch 2.8 Announcement", "Announcement", "Sent", "410,820", "48.2%", "13.2%"],
            ].map((row) => (
              <button className="grid w-full grid-cols-[1.4fr_120px_100px_120px_100px_100px] items-center gap-[var(--ads-spacing-3)] border-b border-[var(--ads-border-default)] px-[var(--ads-spacing-5)] py-[var(--ads-spacing-4)] text-left text-[length:var(--ads-font-size-13)] hover:bg-[var(--ads-background-page)]" key={row[0]} type="button">
                <span className="font-medium">{row[0]}</span>
                <span className="text-[color:var(--ads-text-subtle)]">{row[1]}</span>
                <Badge status={row[2] === "Ready" ? "success" : row[2] === "Draft" ? "neutral" : "brand"}>{row[2]}</Badge>
                <span>{row[3]}</span>
                <span>{row[4]}</span>
                <span>{row[5]}</span>
              </button>
            ))}
          </div>
          <Pagination label="Showing 1-5 of 42 campaigns" />
        </div>
      </ScreenFrame>
    </ProductShell>
  );
}

export function PromotionsPage(props: ProductPageProps) {
  return (
    <ProductShell {...props}>
      <ScreenFrame title="Promotions">
        <PageHeader subtitle="Manage reward offers, game bundles, and player incentives." title="Promotions">
          <Button>+ New Promotion</Button>
        </PageHeader>
        <ImportSection cta="Create" subtitle="Upload reward catalog, CSV, or connect promotion inventory." title="Import Promotion Assets" />
        <CardsRow>
          <PromotionCard title="Lunar Skin Bundle" />
          <PromotionCard status="scheduled" title="Weekend Double XP" />
          <PromotionCard status="draft" title="VIP Comeback Offer" />
        </CardsRow>
      </ScreenFrame>
    </ProductShell>
  );
}

export function SegmentsPage(props: ProductPageProps) {
  return (
    <ProductShell {...props}>
      <ScreenFrame title="Segments">
        <PageHeader subtitle="Manage player groups for targeted campaigns." title="Segments">
          <Button>+ New Segment</Button>
        </PageHeader>
        <MetricGrid>
          <StatCard icon="folder" label="Total Segments" value="24" />
          <StatCard accent change="+12.4% this month" icon="users" label="Total Players" value="1,284,390" />
          <StatCard icon="zap" label="Active in Campaign" value="8" />
        </MetricGrid>
        <ImportSection cta="Browse" subtitle="Drag and drop .xlsx, .csv, or pick a file to upload." title="Import Segment From Excel" />
        <div className="rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)]">
          <div className="flex items-center justify-between p-[var(--ads-spacing-5)]">
            <FilterTabs activeId="active" items={[{ id: "all", label: "All" }, { id: "active", label: "Active" }, { id: "draft", label: "Draft" }, { id: "archived", label: "Archived" }]} />
            <Button variant="ghost">Export CSV ↓</Button>
          </div>
          <DataTable />
          <Pagination />
        </div>
      </ScreenFrame>
    </ProductShell>
  );
}

export function TemplatesPage(props: ProductPageProps) {
  return (
    <ProductShell {...props}>
      <ScreenFrame title="Templates">
        <PageHeader subtitle="Reusable campaign and email layouts built from the builder blocks." title="Templates">
          <Button>+ New Template</Button>
        </PageHeader>
        <CardsRow>
          <TemplateCard label="Lunar Sale Email" subtitle="Gaming commerce email template" />
          <TemplateCard label="Welcome Back Flow" subtitle="Retention campaign layout" tone="success" />
          <TemplateCard label="Dark Event Blast" subtitle="High intensity event announcement" tone="dark" />
        </CardsRow>
        <section className="rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-5)]">
          <h2 className="mb-[var(--ads-spacing-4)] font-semibold">Email Preview</h2>
          <div className="overflow-auto rounded-[var(--ads-radius-lg)] bg-[var(--ads-background-subtle)] p-[var(--ads-spacing-5)]">
            <EmailCanvas className="scale-[0.72] origin-top" />
          </div>
        </section>
      </ScreenFrame>
    </ProductShell>
  );
}

export function AnalyticsPage(props: ProductPageProps) {
  return (
    <ProductShell {...props}>
      <ScreenFrame title="Analytics">
        <PageHeader subtitle="Monitor player reach, campaign conversion, and promotion engagement." title="Analytics">
          <Button variant="border">Export Report</Button>
        </PageHeader>
        <MetricGrid>
          <StatCard accent change="+6.8%" icon="analytics" label="Conversion Rate" value="18.4%" />
          <StatCard icon="users" label="Reached Players" value="824,120" />
          <StatCard icon="promotions" label="Reward Claims" value="64,882" />
        </MetricGrid>
        <div className="grid gap-[var(--ads-spacing-4)] lg:grid-cols-2">
          <section className="rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-5)]">
            <h2 className="mb-[var(--ads-spacing-4)] font-semibold">Channel Split</h2>
            <div className="grid gap-[var(--ads-spacing-3)]">
              {[
                ["Email", 72],
                ["Push", 58],
                ["In-game", 84],
                ["Web", 39],
              ].map(([label, value]) => (
                <div className="grid gap-[var(--ads-spacing-2)]" key={label}>
                  <div className="flex justify-between text-[length:var(--ads-font-size-13)]"><span>{label}</span><span>{value}%</span></div>
                  <div className="h-2 rounded-full bg-[var(--ads-background-muted)]"><div className="h-2 rounded-full bg-[var(--ads-background-brand)]" style={{ width: `${value}%` }} /></div>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-5)]">
            <h2 className="mb-[var(--ads-spacing-4)] font-semibold">Top Segments</h2>
            <DataTable />
          </section>
        </div>
      </ScreenFrame>
    </ProductShell>
  );
}

export function BuilderPage(props: ProductPageProps) {
  return <BuilderScreen onBack={() => props.onNavigate("campaigns")} onSendFinal={() => props.onNavigate("sendReview")} onSendTest={() => props.onNavigate("sendReview")} />;
}

function ChoiceCard({
  active,
  children,
  onClick,
  subtitle,
  title,
}: {
  active?: boolean;
  children?: ReactNode;
  onClick: () => void;
  subtitle: string;
  title: string;
}) {
  return (
    <button
      className={cn(
        "grid min-h-[78px] gap-[var(--ads-spacing-1)] rounded-[var(--ads-radius-lg)] border p-[var(--ads-spacing-3)] text-left transition-colors",
        active ? "border-[var(--ads-border-brand)] bg-[var(--ads-feedback-brand-border)] text-[color:var(--ads-text-brand)]" : "border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] hover:border-[var(--ads-border-brand)]",
      )}
      onClick={onClick}
      type="button"
    >
      <span className="flex items-center justify-between gap-[var(--ads-spacing-2)]">
        <span className="font-semibold text-[color:var(--ads-text-default)]">{title}</span>
        {children}
      </span>
      <span className="text-[length:var(--ads-font-size-11)] leading-[var(--ads-line-height-16)] text-[color:var(--ads-text-subtle)]">{subtitle}</span>
    </button>
  );
}

export function CreateCampaignPage(props: ProductPageProps) {
  const [audience, setAudience] = useState("All Users");
  const [campaignName, setCampaignName] = useState("Lunar New Year Sale 2025");
  const [campaignType, setCampaignType] = useState("Promotional");
  const [description, setDescription] = useState("Limited-time email campaign for Lunar New Year rewards and premium bundles.");
  const [game, setGame] = useState("Valor Strike");
  const [scheduleMode, setScheduleMode] = useState<"later" | "now">("now");
  const [scheduleTime, setScheduleTime] = useState("2026-05-25T19:00");
  const [sendTestFirst, setSendTestFirst] = useState(true);
  const matchedUsers = audience === "VIP Players" ? "18,240" : audience === "Inactive 30 Days" ? "92,100" : "248,392";
  const canContinue = campaignName.trim().length > 2 && game.trim().length > 1;

  return (
    <ProductShell {...props} activeId="campaigns">
      <Topbar breadcrumbs={["Content Builder", "Create Campaign"]} />
      <div className="grid justify-center gap-[var(--ads-spacing-6)] p-[clamp(16px,3vw,32px)]">
        <div className="flex flex-wrap items-center justify-center gap-x-[var(--ads-spacing-10)] gap-y-[var(--ads-spacing-3)]">
          {["Campaign Details", "Design Template", "Review & Send"].map((step, index) => (
            <div className="flex items-center gap-[var(--ads-spacing-2)]" key={step}>
              <span className={cn("grid size-6 place-items-center rounded-full text-[length:var(--ads-font-size-13)] font-semibold", index === 0 ? "bg-[var(--ads-background-brand)] text-[color:var(--ads-action-primary-text)]" : "bg-[var(--ads-background-muted)] text-[color:var(--ads-text-subtle)]")}>{index + 1}</span>
              <span className={cn(index === 0 ? "font-semibold" : "text-[color:var(--ads-text-subtle)]")}>{step}</span>
            </div>
          ))}
        </div>

        <div className="grid w-[min(100%,1120px)] gap-[var(--ads-spacing-5)] xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-[var(--ads-spacing-5)]">
            <section className="grid gap-[var(--ads-spacing-6)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[clamp(20px,3vw,32px)]">
              <PageHeader subtitle="Basic settings for your new campaign" title="Campaign Info" />
              <div className="grid gap-[var(--ads-spacing-4)] md:grid-cols-2">
                <TextField label="Campaign Name *" onChange={(event) => setCampaignName(event.target.value)} placeholder="e.g. Lunar New Year Sale 2025" value={campaignName} />
                <TextField label="Game" onChange={(event) => setGame(event.target.value)} placeholder="Valor Strike" value={game} />
              </div>
              <Textarea label="Description" onChange={(event) => setDescription(event.target.value)} placeholder="Short description of this campaign..." size="MD" value={description} />
              <div className="grid gap-[var(--ads-spacing-3)]">
                <p className="font-medium">Campaign Type</p>
                <div className="grid gap-[var(--ads-spacing-3)] sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Promotional", "Sales, offers, deals"],
                    ["Announcement", "Events, updates"],
                    ["Retention", "Win-back inactive"],
                    ["Reward", "Milestone rewards"],
                  ].map(([title, subtitle]) => (
                    <ChoiceCard active={campaignType === title} key={title} onClick={() => setCampaignType(title)} subtitle={subtitle} title={title}>
                      {campaignType === title && <Icon name="zap" size={14} />}
                    </ChoiceCard>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-[var(--ads-spacing-6)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[clamp(20px,3vw,32px)]">
              <PageHeader subtitle="Define who will receive this campaign" title="Target Audience" />
              <div className="grid gap-[var(--ads-spacing-3)] md:grid-cols-3">
                {["All Users", "VIP Players", "Inactive 30 Days"].map((segment) => (
                  <ChoiceCard active={audience === segment} key={segment} onClick={() => setAudience(segment)} subtitle={segment === "All Users" ? "Full reachable audience" : segment === "VIP Players" ? "High value players" : "Win-back cohort"} title={segment} />
                ))}
              </div>
              <p className="flex items-center gap-[var(--ads-spacing-2)] rounded-[var(--ads-radius-lg)] bg-[var(--ads-background-page)] p-[var(--ads-spacing-3)] text-[color:var(--ads-text-subtle)]"><Icon name="users" />{matchedUsers} users match this segment</p>
              <div className="grid gap-[var(--ads-spacing-3)]">
                <p className="font-medium">Schedule</p>
                <div className="flex flex-wrap gap-[var(--ads-spacing-4)]">
                  <button className="flex items-center gap-[var(--ads-spacing-2)]" onClick={() => setScheduleMode("now")} type="button"><RadioRow checked={scheduleMode === "now"} label="Send immediately" /></button>
                  <button className="flex items-center gap-[var(--ads-spacing-2)]" onClick={() => setScheduleMode("later")} type="button"><RadioRow checked={scheduleMode === "later"} label="Schedule for later" /></button>
                </div>
                <TextField disabled={scheduleMode === "now"} label="Date and time" onChange={(event) => setScheduleTime(event.target.value)} type="datetime-local" value={scheduleTime} />
              </div>
              <Checkbox checked={sendTestFirst} label="Send test email before final launch" onChange={(event) => setSendTestFirst(event.target.checked)} />
            </section>
          </div>

          <aside className="grid h-max gap-[var(--ads-spacing-4)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[var(--ads-spacing-5)] shadow-ads-card">
            <PageHeader subtitle="Live prototype summary" title="Review" />
            {[
              ["Campaign", campaignName || "Untitled campaign"],
              ["Type", campaignType],
              ["Game", game || "-"],
              ["Audience", `${audience} (${matchedUsers})`],
              ["Schedule", scheduleMode === "now" ? "Send now" : scheduleTime.replace("T", " ")],
              ["Test first", sendTestFirst ? "Enabled" : "Skipped"],
            ].map(([label, value]) => (
              <div className="flex justify-between gap-[var(--ads-spacing-4)] border-b border-[var(--ads-border-default)] pb-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-13)]" key={label}>
                <span className="text-[color:var(--ads-text-subtle)]">{label}</span>
                <span className="text-right font-medium">{value}</span>
              </div>
            ))}
            <div className="rounded-[var(--ads-radius-lg)] bg-[var(--ads-background-page)] p-[var(--ads-spacing-3)] text-[length:var(--ads-font-size-13)] text-[color:var(--ads-text-subtle)]">
              {description || "No description yet."}
            </div>
          </aside>
        </div>

        <div className="flex w-[min(100%,1120px)] justify-end gap-[var(--ads-spacing-4)]">
          <Button variant="ghost" onClick={() => props.onNavigate("campaigns")}>Cancel</Button>
          <Button disabled={!canContinue} size="xl" onClick={() => props.onNavigate("builder")}>Continue to Builder →</Button>
        </div>
      </div>
    </ProductShell>
  );
}

export function SendReviewPage(props: ProductPageProps) {
  const [finalSent, setFinalSent] = useState(false);
  const [notes, setNotes] = useState("Please verify hero image, links, and reward CTA before final send.");
  const [recipient, setRecipient] = useState("loc.nguyen@company.com");
  const [sendMode, setSendMode] = useState<"final" | "test">("test");
  const [subject, setSubject] = useState("[TEST] Lunar New Year Sale 2025");
  const [testSent, setTestSent] = useState(false);
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const canSendTest = recipient.includes("@") && subject.trim().length > 3;
  const readiness = [
    ["Subject line added", subject.trim().length > 3],
    ["Valid test recipient", recipient.includes("@")],
    ["Email content validated", true],
    ["Recipients configured", true],
    ["Tracking enabled", trackingEnabled],
  ] as const;

  return (
    <ProductShell {...props} activeId="campaigns">
      <Topbar breadcrumbs={["Campaigns", "Lunar New Year 2025", "Review & Send"]} />
      <div className="grid gap-[var(--ads-spacing-6)] p-[clamp(16px,3vw,32px)] xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="grid content-start gap-[var(--ads-spacing-5)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[clamp(20px,3vw,32px)]">
          <PageHeader subtitle="Send a test email before launching the campaign." title="Send Test" />
          <div className="grid gap-[var(--ads-spacing-4)] md:grid-cols-2">
            <TextField label="Recipient email" onChange={(event) => setRecipient(event.target.value)} placeholder="you@company.com" value={recipient} />
            <TextField label="Subject line" onChange={(event) => setSubject(event.target.value)} placeholder="[TEST] Lunar New Year 2025" value={subject} />
          </div>
          <Textarea label="Internal QA notes" onChange={(event) => setNotes(event.target.value)} size="MD" value={notes} />
          <div className="flex flex-wrap items-center gap-[var(--ads-spacing-3)]">
            <Checkbox checked={trackingEnabled} label="Enable open and click tracking" onChange={(event) => setTrackingEnabled(event.target.checked)} />
            {testSent && <Badge status="success">Test sent</Badge>}
          </div>
          <div className="rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-background-page)] p-[var(--ads-spacing-5)]">
            <div className="mx-auto grid max-w-[520px] overflow-hidden rounded-[var(--ads-radius-lg)] bg-[var(--ads-surface-default)] shadow-ads-card">
              <div className="bg-[var(--gaming-surface-deep)] p-[var(--ads-spacing-6)] text-[color:var(--ads-text-inverse)]">
                <p className="text-[length:var(--ads-font-size-12)] text-[color:var(--violet-200)]">Preview</p>
                <h2 className="mt-[var(--ads-spacing-2)] text-[length:var(--ads-font-size-20)] font-bold">{subject.replace("[TEST] ", "")}</h2>
              </div>
              <div className="grid gap-[var(--ads-spacing-3)] p-[var(--ads-spacing-5)]">
                <p className="text-[color:var(--ads-text-subtle)]">Lunar rewards are ready for VIP players. Test recipient: <span className="font-medium text-[color:var(--ads-text-default)]">{recipient || "not set"}</span></p>
                <Button size="sm">Open Game & Claim Now</Button>
              </div>
            </div>
          </div>
          <Button disabled={!canSendTest} size="xl" onClick={() => { setSendMode("test"); setTestSent(true); }}>Send Test Email</Button>
        </section>

        <section className="grid content-start gap-[var(--ads-spacing-5)] rounded-[var(--ads-radius-xl)] border border-[var(--ads-border-default)] bg-[var(--ads-surface-default)] p-[clamp(20px,3vw,32px)]">
          <PageHeader subtitle="Review campaign readiness and send to the selected audience." title="Send Final" />
          <div className="grid gap-[var(--ads-spacing-4)]">
            {[
              ["Campaign name", "Lunar New Year 2025"],
              ["Status", finalSent ? "Sent" : "Ready to Send"],
              ["Recipients", "All Users (248,392)"],
              ["Schedule", "Send Now"],
              ["Last action", sendMode === "test" && testSent ? "Test email sent" : finalSent ? "Final campaign sent" : "Waiting for review"],
            ].map(([label, value]) => (
              <div className="flex justify-between border-b border-[var(--ads-border-default)] pb-[var(--ads-spacing-3)]" key={label}>
                <span className="text-[color:var(--ads-text-subtle)]">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-[var(--ads-spacing-3)] rounded-[var(--ads-radius-lg)] bg-[var(--ads-feedback-success-bg)] p-[var(--ads-spacing-4)] text-[color:var(--ads-feedback-success-icon)]">
            {readiness.map(([item, ready]) => (
              <p className={cn("flex items-center gap-[var(--ads-spacing-2)]", !ready && "text-[color:var(--ads-feedback-error-icon)]")} key={item}>
                <Icon name={ready ? "zap" : "x"} />{item}
              </p>
            ))}
          </div>
          <Button disabled={!readiness.every(([, ready]) => ready) || finalSent} size="xl" onClick={() => { setSendMode("final"); setFinalSent(true); }}>{finalSent ? "Campaign Sent" : "Send Campaign"}</Button>
          <p className="text-center text-[length:var(--ads-font-size-13)] text-[color:var(--ads-feedback-error-icon)]">This action cannot be undone</p>
        </section>
      </div>
    </ProductShell>
  );
}
