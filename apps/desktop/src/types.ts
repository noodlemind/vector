export type AppSection =
  | "dashboard"
  | "workspaceBoard"
  | "profileVault"
  | "reviewCenter"
  | "settings";

export type BoardColumn =
  | "inbox"
  | "evaluating"
  | "recommended"
  | "consider"
  | "preparing"
  | "needsReview"
  | "ready"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected"
  | "skipped"
  | "archived";

export type WorkspaceState =
  | "created"
  | "parsing"
  | "parsed"
  | "evaluatingStrategicFit"
  | "evaluatingReadiness"
  | "researching"
  | "evaluated"
  | "tailoringResume"
  | "draftingArtifacts"
  | "critiquing"
  | "awaitingReview"
  | "ready"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected"
  | "archived";

export interface AppInfo {
  name: string;
  version: string;
  tagline: string;
}

export interface WorkspaceSummary {
  id: string;
  title: string;
  company?: string;
  column: BoardColumn;
  state: WorkspaceState;
}

export const APP_SECTIONS: { id: AppSection; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "workspaceBoard", label: "Board" },
  { id: "profileVault", label: "Vault" },
  { id: "reviewCenter", label: "Review" },
  { id: "settings", label: "Settings" },
];
