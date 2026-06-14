import type { AppSection } from "../types";
import { APP_SECTIONS } from "../types";

interface SidebarProps {
  active: AppSection;
  onNavigate: (section: AppSection) => void;
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside
      aria-label="Primary navigation"
      className="flex w-56 shrink-0 flex-col border-r border-border bg-surface-raised"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">Vector</p>
        <p className="text-sm text-zinc-300">Career workspace</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {APP_SECTIONS.map((section) => {
          const isActive = section.id === active;
          return (
            <button
              key={section.id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate(section.id)}
              className={[
                "rounded-lg px-3 py-2 text-left text-sm transition-colors",
                isActive
                  ? "bg-accent-soft text-accent"
                  : "text-zinc-300 hover:bg-zinc-800/80 hover:text-white",
              ].join(" ")}
            >
              {section.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
