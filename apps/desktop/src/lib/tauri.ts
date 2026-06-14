import { invoke } from "@tauri-apps/api/core";
import type { AppInfo, WorkspaceSummary } from "../types";

export function getAppInfo(): Promise<AppInfo> {
  return invoke<AppInfo>("get_app_info");
}

export function listWorkspaces(): Promise<WorkspaceSummary[]> {
  return invoke<WorkspaceSummary[]>("list_workspaces");
}
