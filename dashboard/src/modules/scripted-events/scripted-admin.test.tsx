import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScriptedEventsAdminPanel } from "./ScriptedEventsAdminPanel";
import { ScriptedEventsProvider } from "./ScriptedEventsProvider";

describe("ScriptedEventsAdminPanel", () => {
  it("renders lane controls and event toggles", () => {
    render(
      <ScriptedEventsProvider>
        <ScriptedEventsAdminPanel />
      </ScriptedEventsProvider>,
    );

    expect(screen.getByText("Scripted Event Control Plane")).toBeTruthy();
    const laneCheckbox = screen.getByLabelText("Show Clyffy visible lane");
    fireEvent.click(laneCheckbox);
    expect((laneCheckbox as HTMLInputElement).checked).toBe(false);

    const eventToggle = screen.getByLabelText("Enable clyffy-welcome-tooltip");
    fireEvent.click(eventToggle);
    expect((eventToggle as HTMLInputElement).checked).toBe(false);
  });
});

