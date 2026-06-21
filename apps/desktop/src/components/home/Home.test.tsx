import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Home } from "./Home";

vi.mock("../../lib/home", () => ({
  getHomeView: () =>
    Promise.resolve({
      catchUp: "Since Tuesday — 2 evaluations finished, 1 package ready to review.",
      needs: [
        {
          id: "a",
          role: "Senior Product Designer",
          org: "Anthropic · Remote",
          kind: "decide",
          signal: { type: "fit", band: "Strong Apply", tone: "good", fit: "4.6 / 5.0" },
        },
      ],
      underway: { preparing: 3, evaluating: 2, resolved: 19 },
    }),
}));

describe("Home", () => {
  it("shows the catch-up line, the needs list, and the hum", async () => {
    render(<Home />);
    expect(await screen.findByText("Senior Product Designer")).toBeInTheDocument();
    expect(screen.getByText(/Since Tuesday/)).toBeInTheDocument();
    expect(screen.getByText("Needs you")).toBeInTheDocument();
    expect(screen.getByText(/3 preparing/)).toBeInTheDocument();
    expect(screen.getByText(/19 resolved/)).toBeInTheDocument();
  });
});
