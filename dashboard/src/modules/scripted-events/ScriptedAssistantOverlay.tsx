"use client";

import { CanonicalCard } from "@/components/canonical/CanonicalCard";
import { PersistentAssistantOverlay } from "@/components/canonical/PersistentAssistantOverlay";
import { useScriptedEventLanes, useScriptedEvents } from "./ScriptedEventsProvider";

const eventText = (event: {
  kind: "announcement" | "tooltip" | "popup";
  announcement?: { text: string };
  tooltip?: { text: string; title?: string };
  popup?: { title: string; body: string };
}) => {
  if (event.kind === "announcement") return event.announcement?.text ?? "";
  if (event.kind === "tooltip") return event.tooltip?.text ?? "";
  return event.popup?.body ?? "";
};

export const ScriptedAssistantOverlay = () => {
  const { comparison } = useScriptedEvents();
  const lanes = useScriptedEventLanes();
  const featured = lanes.visible[0] ?? lanes.background[0];

  return (
    <PersistentAssistantOverlay title="Clyffy + Council Overlay" defaultDock="left">
      <div className="flex flex-col gap-[var(--wc-space-2)]">
        <CanonicalCard
          heading="Live Guidance"
          subtitle="Machine signals + AI narrative blended from scripted events."
        >
          {featured ? (
            <div className="space-y-1">
              <p className="wc-fluid-text-xs uppercase tracking-wide text-wardenclyffe-300">
                {featured.actor} · {featured.source} · {featured.focus}
              </p>
              <p className="text-nb-gray-100 wc-fluid-text-sm">{eventText(featured)}</p>
            </div>
          ) : (
            <p className="text-nb-gray-300">No active events are enabled.</p>
          )}
        </CanonicalCard>

        <CanonicalCard heading="Lane Metrics" subtitle="Comparison-ready counters">
          <ul className="grid grid-cols-2 gap-[var(--wc-space-1)] text-nb-gray-200">
            <li>Total events: {comparison.total}</li>
            <li>Visible: {comparison.visible}</li>
            <li>Background: {comparison.background}</li>
            <li>Data sinks: {comparison.dataSinks}</li>
          </ul>
        </CanonicalCard>
      </div>
    </PersistentAssistantOverlay>
  );
};

