import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NeedsYouRow } from "./NeedsYouRow";
import type { NeedItem } from "../../lib/home";

const decide: NeedItem = {
  id: "a",
  role: "Senior Product Designer",
  org: "Anthropic · Remote",
  kind: "decide",
  signal: { type: "fit", band: "Strong Apply", tone: "good", fit: "4.6 / 5.0" },
};

describe("NeedsYouRow", () => {
  it("renders a fit (decide) row", () => {
    render(<NeedsYouRow item={decide} />);
    expect(screen.getByText("Senior Product Designer")).toBeInTheDocument();
    expect(screen.getByText("Strong Apply")).toBeInTheDocument();
    expect(screen.getByText(/Strategic Fit 4\.6 \/ 5\.0/)).toBeInTheDocument();
    expect(screen.getByText("Decide")).toBeInTheDocument();
  });

  it("renders a readiness (review) row", () => {
    render(
      <NeedsYouRow
        item={{
          id: "b",
          role: "Staff Product Designer",
          org: "Linear · Remote",
          kind: "review",
          signal: { type: "readiness", readiness: 78, checklistDone: 4, checklistTotal: 5 },
        }}
      />,
    );
    expect(screen.getByText(/Readiness 78 \/ 100/)).toBeInTheDocument();
    expect(screen.getByText(/Checklist 4 of 5/)).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("renders an outcome (record) row", () => {
    render(
      <NeedsYouRow
        item={{
          id: "c",
          role: "Product Designer",
          org: "Ramp · Hybrid",
          kind: "record",
          signal: { type: "outcome", appliedDaysAgo: 6 },
        }}
      />,
    );
    expect(screen.getByText(/Applied 6 days ago/)).toBeInTheDocument();
    expect(screen.getByText("Record")).toBeInTheDocument();
  });
});
