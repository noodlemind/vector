import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./IconButton";
import { Eyebrow } from "./Eyebrow";
import { Band } from "./Band";

describe("IconButton", () => {
  it("exposes its label and fires onClick", async () => {
    const onClick = vi.fn();
    render(
      <IconButton label="Settings" onClick={onClick}>
        <svg />
      </IconButton>,
    );
    const btn = screen.getByRole("button", { name: "Settings" });
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("Eyebrow", () => {
  it("renders its text", () => {
    render(<Eyebrow>Needs you</Eyebrow>);
    expect(screen.getByText("Needs you")).toBeInTheDocument();
  });
});

describe("Band", () => {
  it("renders the band label", () => {
    render(<Band tone="good">Strong Apply</Band>);
    expect(screen.getByText("Strong Apply")).toBeInTheDocument();
  });
});
