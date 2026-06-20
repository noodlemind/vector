import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.16em] text-muted">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent ring-4 ring-accent/10" />
      {children}
    </p>
  );
}
