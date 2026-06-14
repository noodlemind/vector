export type AppSection =
  | "dashboard"
  | "workspaceBoard"
  | "profileVault"
  | "reviewCenter"
  | "settings";

export interface AppInfo {
  name: string;
  version: string;
  tagline: string;
}

export interface WorkspaceSummary {
  id: string;
  title: string;
  company?: string;
  column: string;
  state: string;
}

export const APP_SECTIONS: { id: AppSection; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "workspaceBoard", label: "Board" },
  { id: "profileVault", label: "Vault" },
  { id: "reviewCenter", label: "Review" },
  { id: "settings", label: "Settings" },
];
