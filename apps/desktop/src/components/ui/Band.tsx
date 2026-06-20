import type { ReactNode } from "react";

export type BandTone = "good" | "neutral";

const toneClasses: Record<BandTone, string> = {
  good: "text-good bg-good-soft border-good-border",
  neutral: "text-muted bg-surface-raised border-border",
};

export function Band({ tone, children }: { tone: BandTone; children: ReactNode }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full border px-[9px] py-[3px] text-[11.5px] font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
