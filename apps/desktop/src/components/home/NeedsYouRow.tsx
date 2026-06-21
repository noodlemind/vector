import type { NeedItem, NeedKind, NeedSignal } from "../../lib/home";
import { Band } from "../ui/Band";
import { ArrowRight } from "../ui/ArrowRight";

const actionVerb: Record<NeedKind, string> = {
  decide: "Decide",
  review: "Review",
  record: "Record",
};

function Sep() {
  return <span className="text-separator">·</span>;
}

function Signal({ signal }: { signal: NeedSignal }) {
  switch (signal.type) {
    case "fit":
      return (
        <span className="flex items-center gap-2">
          <Band tone={signal.tone}>{signal.band}</Band>
          Strategic Fit {signal.fit}
        </span>
      );
    case "readiness":
      return (
        <span className="flex items-center gap-2">
          Package drafted <Sep /> Readiness {signal.readiness} / 100 <Sep /> Checklist{" "}
          {signal.checklistDone} of {signal.checklistTotal}
        </span>
      );
    case "outcome":
      return (
        <span className="flex items-center gap-2">
          Applied {signal.appliedDaysAgo} days ago <Sep /> any word back?
        </span>
      );
  }
}

export function NeedsYouRow({ item }: { item: NeedItem }) {
  return (
    <button
      type="button"
      className="group flex items-center justify-between gap-[18px] rounded-lg border-b border-border-faint px-1.5 py-5 text-left transition-colors hover:bg-foreground/[0.018]"
    >
      <span className="block">
        <span className="block text-[16.5px] font-semibold leading-snug text-foreground">
          {item.role}
        </span>
        <span className="mt-1 block text-[13px] text-muted-dim">{item.org}</span>
        <span className="mt-[9px] flex items-center gap-2 text-[13px] text-muted">
          <Signal signal={item.signal} />
        </span>
      </span>
      <span className="flex flex-none items-center gap-[7px] text-[13.5px] text-muted-dim transition-colors group-hover:text-accent">
        {actionVerb[item.kind]}
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
