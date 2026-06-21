import type { ReactNode } from "react";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-surface"
      >
        Skip to main content
      </a>
      <TopBar />
      <main id="main-content" className="flex min-h-0 flex-1 px-9 pb-8">
        {children}
      </main>
    </div>
  );
}
