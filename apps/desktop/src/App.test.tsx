import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the shell and the home surface", async () => {
    render(<App />);
    expect(screen.getByText("Vector")).toBeInTheDocument();
    expect(await screen.findByText("Needs you")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
