# LiveOps Design System - Context Handoff

Last updated: 2026-05-27

## 1. Project Summary

This project is a React + Tailwind implementation of the LiveOps / email campaign design system from Figma.

Primary Figma file:

- File: Test LiveOps Design
- File key: `FZhUp392NLvuTl611bidrx`
- Screens page node: `268:1695`
- Components page node: `268:1696`
- Token page node: `291:717`

Local stack:

- React `19`
- TypeScript
- Vite
- Tailwind CSS
- `lucide-react` for generic icons
- Custom SVG paths are used where Figma icons need to match exactly.

Important local files:

- App shell: `src/App.tsx`
- Design system exports: `src/design-system/index.ts`
- CSS variables and Figma token mapping: `src/styles/tokens.css`
- Token source metadata: `src/design-system/tokens.ts`
- Token JSON export: `src/design-system/figma-tokens.json`
- Component review page: `src/pages/ComponentReview.tsx`
- Product screens: `src/pages/ProductPages.tsx`
- Email builder: `src/design-system/Builder.tsx`

Run commands:

- Dev server: `npm run dev`
- Build check: `npm run build`

## 2. Product Flow

The product is an email marketing / LiveOps campaign platform.

Primary flow:

1. Dashboard
   - Shows email sending and user response metrics.
   - Includes metrics such as Emails Sent, Open Rate, CTR, Conversion, Bounce Rate, Email Revenue.
   - Includes Email Campaigns table, chart, activity, and best send times.

2. Campaign
   - Shows list of campaigns.
   - User starts a new campaign from `+ New Campaign`.

3. Create Campaign
   - Uses frame/design named Create Campaign.
   - Prototype supports real inputs and selections:
     - campaign name
     - campaign type
     - audience
     - schedule
     - send test first
   - Continue button leads to Builder.

4. Builder
   - User builds email marketing layout/theme.
   - Supports importing HTML by file or link.
   - Supports drag/drop from left component palette to canvas.
   - Supports selecting, editing, duplicating, deleting blocks.
   - Supports Send Test and Send Final.

5. Send Test / Send Final
   - Prototype supports input state and button enable/disable.
   - Test send and final send simulate completion state.

## 3. App Routing Model

The app starts on `components` route so the first screen is the Component Review page.

Routes in `src/App.tsx`:

- `components`
- `dashboard`
- `campaigns`
- `promotions`
- `segments`
- `templates`
- `analytics`
- `builder`
- `createCampaign`
- `sendReview`

`createCampaign` and `sendReview` are campaign-flow subpages and keep the sidebar active state on `campaigns`.

## 4. Design System Principles

Use tokens first.

Preferred order:

1. Use semantic `--ads-*` tokens in components.
2. If a Figma variable is component-specific, create a semantic alias in `src/styles/tokens.css`.
3. Avoid hard-coded colors if the value exists in tokens.
4. Keep component dimensions and spacing token-driven.
5. Use `lucide-react` only when the icon does not need exact Figma fidelity.
6. Use custom icon paths for navigation/dashboard icons that Figma defines exactly.

Current CSS variable layers:

- Foundation: `--gray-*`, `--violet-*`, `--zinc-*`, `--teal-*`, etc.
- Semantic: `--background-*`, `--text-*`, `--border-*`, `--icon-*`, `--action-*`, `--sidebar-*`
- App aliases: `--ads-*`
- Component aliases:
  - `--ads-search-field-*`
  - `--ads-builder-button-*`
  - `--ads-drop-zone-*`

## 5. Figma Nodes Already Inspected

Stored in `src/design-system/tokens.ts`:

- Button: `83:419`
- Button primary medium: `83:269`
- Button border medium: `221:1206`
- Button Builder: `2:564`
- Table: `339:2348`
- Table row default: `331:532`
- Badge live: `331:490`
- Navigation: `217:1175`
- Menu item: `203:831`
- Sidebar: `203:946`
- Segments screen: `240:2184`
- Builder screen: `8:9`
- Pagination: `344:5289`
- Dropdown: `149:456`
- Dropdown option: `149:478`
- TextField: `212:852`
- Textarea: `291:1544`

Additional inspected nodes from recent work:

- SearchField: `414:4722`
- Button Builder: `2:564`
- Builder sidebar components: `453:7577`
- Builder toolbar/sidebar detail: `453:7593`
- DropZone: `460:1633`
- Dashboard screen/design reference: `2:11`

## 6. Component Inventory

Core design system components:

- `Badge`
- `Button`
- `IconButton`
- `ButtonBuilder`
- `Checkbox`
- `DropZone`
- `Dropdown`
- `DropdownOption`
- `SearchField`
- `Sidebar`
- `StatCard`
- `FilterTabs`
- `Pagination`
- `DataTable`
- table cells:
  - `TableHeaderCell`
  - `TableCheckboxCell`
  - `TableTextSub`
  - `TableBasicCell`
  - `TableBadgeCell`
  - `TableStatusCell`
  - `TableProgress`
  - `TableActionsCell`
- `TextField`
- `Textarea`
- layout helpers:
  - `Topbar`
  - `PageHeader`
  - `Breadcrumbs`

Builder-specific components:

- `ComponentPalette`
- `BuilderSection`
- `BuilderPanelSectionHeader`
- `BuilderPanelPropertyRow`
- `BuilderPanelToggleRow`
- `InspectorPanel`
- `EmailCanvas`
- `BuilderShell`
- `BuilderTopNav`
- `BuilderScreen`
- `FeaturedItemCard`
- `ProductCard`
- `TimerDigit`
- `Countdown`
- `GhostPreview`

## 7. Component Review Page

`src/pages/ComponentReview.tsx` is the canonical preview page.

It should keep showing:

- Foundation tokens
- Buttons and sizes
- Navigation and shell
- Builder components
- SearchField states
- TextField / Textarea states
- Dropdown and DropdownOption states
- Email builder blocks
- Builder shell prototype
- Table system

Whenever a new component is built from Figma, add it here so the review page remains the single place to inspect all reusable components.

## 8. SearchField Context

Figma node: `414:4722`

Variants:

- Size: `S`, `M`
- State: `Default`, `Focused`, `Filled`, `Disabled`
- Props:
  - `hasClear`
  - `hasLeading`
  - `placeholder`

Important Figma values:

- Width: `208px`
- S height: `32px`
- M height: `40px`
- Gap: `6px`
- S padding X/Y: `8px / 6px`
- M padding X/Y: `12px / 10px`
- Radius: `6px`
- Default border: `1px`
- Focus border: `1.5px`
- Default border color: `sidebar/border/default` = `#3f3f46`
- Focus border color: `sidebar/border/focus` = `#6366f1`
- Placeholder/subtle text: `#9ca3af`
- Disabled opacity: `40%`

Implementation:

- File: `src/design-system/SearchField.tsx`
- Tokens: `--ads-search-field-*`
- Builder search uses `clearVisibility="auto"` so clear icon only appears after input has value.
- Component review defaults can keep clear icon visible to match Figma variants.

## 9. Button Builder Context

Figma node: `2:564`

States:

- `Default`
- `Hover`
- `Grapping` in Figma, mapped to `grabbing` in code

Important Figma values:

- Width: `208px`
- Height: `72px`
- Padding: `12px`
- Gap: `8px`
- Radius: `6px`
- Default background: `sidebar-bg`
- Hover background: `sidebar-bg-active`
- Hover shadow: `shadow-hover`
- Default border: `sidebar-border`
- Grabbing border: `2px`, `sidebar-badge-bg`

Implementation:

- File: `src/design-system/ButtonBuilder.tsx`
- Tokens: `--ads-builder-button-*`
- Hover is an actual CSS hover state, not only a preview prop.
- In Builder drag state, do not override with generic `border-brand`; use `grabbing` state.

## 10. DropZone Context

Figma node: `460:1633`

States:

- `Idle`
- `DragOver`

Important Figma values:

- Default component width: `240px`
- Height: `80px`
- Max width: `800px`
- Gap: `6px`
- Radius: `8px`
- Border: `1.5px dashed`
- Idle background: `rgba(255,255,255,0.03)`
- Idle border: `rgba(153,153,166,0.3)`
- Idle icon: `rgba(153,153,166,0.4)`
- Idle text: `rgba(153,153,166,0.5)`
- DragOver accent: `builder/accent-highlight` = `#2dd4bf`

Implementation:

- File: `src/design-system/DropZone.tsx`
- Tokens: `--ads-drop-zone-*`
- Standalone preview uses the Figma default width `240px`.
- Canvas usage must use `fullWidth`.
- Canvas slot is in `CanvasDropSlot` inside `src/design-system/Builder.tsx`.

Important behavior:

- When dragging a component from the left builder sidebar, the canvas shows DropZone slots.
- Slots appear before the first block and after each block.
- Hovering a slot switches the DropZone state to `DragOver`.
- Dropping on a slot inserts the new block before that slot's next block, or at the end.
- Existing block move behavior still works through `application/x-builder-existing`.

## 11. Navigation / Sidebar Context

Figma nodes:

- Navigation: `217:1175`
- Menu item: `203:831`
- Sidebar: `203:946`

Implementation:

- File: `src/design-system/Sidebar.tsx`
- Sidebar supports full and mini modes.
- Prototype supports toggling full/mini via arrow button.
- Dashboard navigation icons were corrected with custom SVG paths where needed.

Routes:

- Dashboard
- Campaign
- Promotion
- Segments
- Template
- Analytics
- Builder
- Components, when `includeComponents` is true

## 12. Dashboard Context

Important Figma reference:

- Dashboard screen: `2:11`
- Earlier dashboard component reference: `217:1175`

Implementation:

- File: `src/pages/ProductPages.tsx`
- Main export: `DashboardPage`

Key requirements already addressed:

- Layout should be responsive on large screens, including `1920px`.
- Main content should not leave a broken/hollow right side on wide screens.
- Dashboard cards and content should adapt with `clamp`, `minmax`, and responsive grids.
- Search Campaigns should keep its default border from the design system.
- Dashboard nav icons must match Figma, not generic lucide approximations.

## 13. Builder Prototype Context

Implementation:

- File: `src/design-system/Builder.tsx`
- Page entry: `BuilderPage` in `src/pages/ProductPages.tsx`

Expected prototype behavior:

- Left sidebar has Components and Templates tabs.
- Components are draggable.
- Dragging a component switches its `ButtonBuilder` state to `grabbing`.
- Canvas shows full-width DropZone slots while dragging.
- Drop into canvas inserts blocks.
- Existing blocks can be dragged to reorder.
- Selecting a block opens InspectorPanel content fields.
- Inputs in InspectorPanel update selected block content.
- Duplicate and delete actions work.
- Import HTML modal simulates URL/file import.
- Send Test and Send Final navigate to review/send page.

Current block types:

- `fullWidth`
- `twoColumns`
- `threeColumns`
- `text`
- `image`
- `button`
- `embed`
- `divider`
- `video`
- `countdown`
- `reward`
- `rewardTiers`
- `progress`
- `spinWheel`
- `skinPreview`
- `products`
- `footer`
- `hero`

## 14. Screens Built From Figma Screens Page

Screens should be built from the Figma `Screens` page, not improvised from the component page alone.

Current product pages:

- `DashboardPage`
- `CampaignsPage`
- `PromotionsPage`
- `SegmentsPage`
- `TemplatesPage`
- `AnalyticsPage`
- `CreateCampaignPage`
- `BuilderPage`
- `SendReviewPage`

Design expectation:

- Operational SaaS UI, not marketing landing page.
- Dense but clean layout.
- Data tables, filters, tabs, input states, and empty/hover/selected states should feel real.
- Avoid decorative-only cards if the screen is meant to be an operational tool.

## 15. Token Maintenance Rules

When Figma variables change:

1. Re-export or update `src/design-system/figma-tokens.json`.
2. Update foundation and semantic values in `src/styles/tokens.css`.
3. Keep component aliases near related aliases.
4. Components should reference `--ads-*` aliases.
5. Avoid embedding raw hex/rgb values in components unless the variable does not exist yet.
6. Add a semantic alias first if the value is component-specific.
7. Re-run `npm run build`.
8. Verify visually on localhost.

Important component aliases added during recent work:

- SearchField:
  - `--ads-search-field-gap`
  - `--ads-search-field-padding-x-s`
  - `--ads-search-field-padding-y-s`
  - `--ads-search-field-padding-x-m`
  - `--ads-search-field-padding-y-m`
  - `--ads-search-field-size-s`
  - `--ads-search-field-size-m`
  - `--ads-search-field-radius`
  - `--ads-search-field-border-default`
  - `--ads-search-field-border-focus`

- Button Builder:
  - `--ads-builder-button-width`
  - `--ads-builder-button-height`
  - `--ads-builder-button-gap`
  - `--ads-builder-button-padding`
  - `--ads-builder-button-bg-default`
  - `--ads-builder-button-bg-hover`
  - `--ads-builder-button-border-selected-color`

- DropZone:
  - `--builder-accent-highlight`
  - `--ads-drop-zone-width`
  - `--ads-drop-zone-height`
  - `--ads-drop-zone-max-width`
  - `--ads-drop-zone-gap`
  - `--ads-drop-zone-radius`
  - `--ads-drop-zone-border`
  - `--ads-drop-zone-bg-idle`
  - `--ads-drop-zone-border-idle`
  - `--ads-drop-zone-icon-idle`
  - `--ads-drop-zone-text-idle`
  - `--ads-drop-zone-accent`

## 16. Working With Figma

Use Figma design context for implementation, not screenshots alone.

Recommended read flow:

1. Inspect the target Figma node with design context.
2. Note states, variants, dimensions, bound variables, and visible text.
3. Compare against local component code.
4. Add or update tokens first.
5. Update component code.
6. Add preview to `ComponentReview`.
7. Build and verify locally.

Important: Figma node IDs are the source of truth. If a component is updated in Figma, re-read that specific node before editing code.

## 17. Verification Checklist

After each design-system change:

- Run `npm run build`.
- Check localhost:
  - component review page loads
  - target component appears in expected states
  - builder interactions still work
  - no text overflow in compact controls
  - no obvious layout shift at desktop and large width

For Builder-specific changes:

- Drag from sidebar to canvas.
- Confirm DropZone appears.
- Confirm DropZone is full width in canvas.
- Confirm `DragOver` state appears when hovering slot.
- Drop and confirm block inserts into expected position.
- Confirm selecting the inserted block updates InspectorPanel.

## 18. Known Context / Follow-Up Notes

- The app currently starts on the Component Review page by design.
- `BuilderShell` is embedded inside Component Review, so heavy changes to Builder can affect the review page layout.
- Browser tooling may print noisy Statsig/Cloudflare logs; the useful result is usually at the bottom.
- Some Figma API console calls may fail with an expired token; `get_design_context` has still been the reliable source for component specs.
- Keep generated `dist` out of conceptual review unless the user asks specifically about build output.
- There is no git repository initialized in this workspace at the time of this handoff.

