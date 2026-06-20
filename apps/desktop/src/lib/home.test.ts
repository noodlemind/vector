import { describe, expect, it } from "vitest";
import { getHomeView } from "./home";

describe("getHomeView", () => {
  it("returns a catch-up line, the needs list, and underway counts", async () => {
    const view = await getHomeView();
    expect(view.catchUp).toBeTruthy();
    expect(view.needs.length).toBeGreaterThan(0);
    expect(view.needs.map((n) => n.kind)).toContain("decide");
    expect(view.underway.resolved).toBeGreaterThanOrEqual(0);
  });
});
