import type { BandTone } from "./tones";

export type NeedKind = "decide" | "review" | "record";

export type NeedSignal =
  | { type: "fit"; band: string; tone: BandTone; fit: string }
  | { type: "readiness"; readiness: number; checklistDone: number; checklistTotal: number }
  | { type: "outcome"; appliedDaysAgo: number };

export interface NeedItem {
  id: string;
  role: string;
  org: string;
  kind: NeedKind;
  signal: NeedSignal;
}

export interface HomeView {
  catchUp: string | null;
  needs: NeedItem[];
  underway: { preparing: number; evaluating: number; resolved: number };
}

// TODO(core): replace the body with `invoke<HomeView>("get_home_view")`
// once the Rust core exposes the dashboard view-model. Signature stays identical.
export function getHomeView(): Promise<HomeView> {
  return Promise.resolve({
    catchUp: "Since Tuesday — 2 evaluations finished, 1 package ready to review.",
    needs: [
      {
        id: "ws-anthropic-spd",
        role: "Senior Product Designer",
        org: "Anthropic · Remote",
        kind: "decide",
        signal: { type: "fit", band: "Strong Apply", tone: "good", fit: "4.6 / 5.0" },
      },
      {
        id: "ws-linear-staff",
        role: "Staff Product Designer",
        org: "Linear · Remote",
        kind: "review",
        signal: { type: "readiness", readiness: 78, checklistDone: 4, checklistTotal: 5 },
      },
      {
        id: "ws-ramp-pd",
        role: "Product Designer",
        org: "Ramp · Hybrid",
        kind: "record",
        signal: { type: "outcome", appliedDaysAgo: 6 },
      },
    ],
    underway: { preparing: 3, evaluating: 2, resolved: 19 },
  });
}
