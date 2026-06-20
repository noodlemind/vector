import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { AppShell } from "./AppShell";

function renderShell() {
  return render(
    <ThemeProvider>
      <AppShell>
        <p>surface content</p>
      </AppShell>
    </ThemeProvider>,
  );
}

describe("AppShell", () => {
  it("renders the brand, the controls, and the surface in a main landmark", () => {
    renderShell();
    expect(screen.getByText("Vector")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("surface content");
  });

  it("toggles the theme from dark to light", async () => {
    renderShell();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    await userEvent.click(
      screen.getByRole("button", { name: /theme/i }),
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
