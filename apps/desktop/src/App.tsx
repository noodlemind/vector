import { useEffect, useState } from "react";
import { SectionPanel } from "./components/SectionPanel";
import { Sidebar } from "./components/Sidebar";
import { getAppInfo } from "./lib/tauri";
import type { AppInfo, AppSection } from "./types";

export default function App() {
  const [section, setSection] = useState<AppSection>("dashboard");
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);

  useEffect(() => {
    getAppInfo()
      .then(setAppInfo)
      .catch((error) => {
        console.error("Failed to load app info from core", error);
      });
  }, []);

  return (
    <div className="flex h-full flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-surface"
      >
        Skip to main content
      </a>

      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div>
          <p className="text-lg font-semibold">{appInfo?.name ?? "Vector"}</p>
          <p className="text-sm text-muted">{appInfo?.tagline ?? "Loading…"}</p>
        </div>
        {appInfo ? (
          <p className="text-xs text-muted" aria-label="Application version">
            v{appInfo.version}
          </p>
        ) : null}
      </header>

      <div className="flex min-h-0 flex-1">
        <Sidebar active={section} onNavigate={setSection} />
        <main id="main-content" className="min-w-0 flex-1 overflow-auto p-6">
          <SectionPanel section={section} />
        </main>
      </div>
    </div>
  );
}
