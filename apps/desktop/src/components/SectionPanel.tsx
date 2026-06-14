import type { AppSection } from "../types";

interface SectionPanelProps {
  section: AppSection;
}

const SECTION_COPY: Record<
  AppSection,
  { title: string; description: string; placeholder: string }
> = {
  dashboard: {
    title: "Dashboard",
    description: "Overview of opportunities, readiness, and what needs your attention.",
    placeholder: "Workspace summaries and next actions will appear here.",
  },
  workspaceBoard: {
    title: "Workspace Board",
    description: "Every job opportunity as a reviewable application workspace.",
    placeholder: "Board columns: Inbox, Evaluating, Recommended, Preparing, and more.",
  },
  profileVault: {
    title: "Profile Vault",
    description: "Your structured career memory — resumes, proof points, and voice.",
    placeholder: "Import a resume and approve structured profile data to get started.",
  },
  reviewCenter: {
    title: "Review Center",
    description: "Packages waiting for your approval before export.",
    placeholder: "Fit recommendations, diffs, and quality checks land here.",
  },
  settings: {
    title: "Settings",
    description: "Agent runtimes, privacy routing, and app preferences.",
    placeholder: "Connect an ACP-compatible agent runtime to enable AI workflows.",
  },
};

export function SectionPanel({ section }: SectionPanelProps) {
  const copy = SECTION_COPY[section];

  return (
    <section
      aria-labelledby={`section-${section}-title`}
      className="flex h-full flex-col gap-6"
    >
      <header className="space-y-2">
        <h1 id={`section-${section}-title`} className="text-2xl font-semibold tracking-tight">
          {copy.title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">{copy.description}</p>
      </header>

      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-surface-raised/50 p-8">
        <p className="max-w-md text-center text-sm text-muted">{copy.placeholder}</p>
      </div>
    </section>
  );
}
