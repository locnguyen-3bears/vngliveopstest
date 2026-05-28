import { useState } from "react";
import type { ReactElement } from "react";
import { Sidebar, type SidebarRoute } from "./design-system";
import { ComponentReview } from "./pages/ComponentReview";
import {
  AnalyticsPage,
  BuilderPage,
  CampaignsPage,
  CreateCampaignPage,
  DashboardPage,
  PromotionsPage,
  SendReviewPage,
  SegmentsPage,
  TemplatesPage,
} from "./pages/ProductPages";

type AppRoute = SidebarRoute | "createCampaign" | "sendReview";

const productPages: Record<Exclude<AppRoute, "components">, (props: { activeId: SidebarRoute; onNavigate: (id: AppRoute) => void }) => ReactElement> = {
  analytics: AnalyticsPage,
  builder: BuilderPage,
  campaigns: CampaignsPage,
  createCampaign: CreateCampaignPage,
  dashboard: DashboardPage,
  promotions: PromotionsPage,
  sendReview: SendReviewPage,
  segments: SegmentsPage,
  templates: TemplatesPage,
};

export default function App() {
  const [activePage, setActivePage] = useState<AppRoute>("components");

  if (activePage === "components") {
    return (
      <div className="flex min-h-screen">
        <Sidebar activeId="components" includeComponents viewport onNavigate={setActivePage} />
        <ComponentReview />
      </div>
    );
  }

  const Page = productPages[activePage];
  const activeSidebarId: SidebarRoute = activePage === "createCampaign" || activePage === "sendReview" ? "campaigns" : activePage;

  return <Page activeId={activeSidebarId} onNavigate={setActivePage} />;
}
