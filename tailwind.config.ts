import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ads: {
          brand: "var(--ads-background-brand)",
          "brand-hover": "var(--ads-action-primary-bg-hover)",
          "brand-press": "var(--ads-action-primary-bg-press)",
          surface: "var(--ads-surface-default)",
          muted: "var(--ads-background-muted)",
          subtle: "var(--ads-surface-subtle)",
          sidebar: "var(--ads-sidebar-bg)",
          border: "var(--ads-border-default)",
          text: "var(--ads-text-default)",
          "text-subtle": "var(--ads-text-subtle)",
          inverse: "var(--ads-text-inverse)",
        },
        status: {
          live: "var(--status-live)",
          active: "var(--status-active)",
          ended: "var(--status-ended)",
          draft: "var(--status-draft)",
          scheduled: "var(--status-scheduled)",
        },
      },
      borderRadius: {
        "ads-sm": "var(--ads-radius-sm)",
        ads: "var(--ads-radius-md)",
        "ads-lg": "var(--ads-radius-lg)",
        "ads-xl": "var(--ads-radius-xl)",
        "ads-pill": "var(--radius-99)",
      },
      boxShadow: {
        "ads-primary": "var(--ads-shadow-action-primary)",
        "ads-hover": "var(--ads-shadow-hover)",
        "ads-card": "var(--ads-shadow-card)",
      },
      fontFamily: {
        ads: "var(--ads-font-family)",
      },
    },
  },
  plugins: [],
};

export default config;
