"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ScriptedEvent } from "./contracts";
import { defaultScriptedEvents } from "./defaults";
import { buildScriptedEventComparison, partitionScriptedEvents } from "./orchestrator";

const STORAGE_KEY = "wardenclyffe-scripted-events-v1";

type LaneFilters = {
  clyffyVisible: boolean;
  councilVisible: boolean;
  includeBackground: boolean;
};

interface ScriptedEventsContextValue {
  events: ScriptedEvent[];
  filteredEvents: ScriptedEvent[];
  laneFilters: LaneFilters;
  setLaneFilters: React.Dispatch<React.SetStateAction<LaneFilters>>;
  setEventEnabled: (eventId: string, enabled: boolean) => void;
  resetDefaults: () => void;
  comparison: ReturnType<typeof buildScriptedEventComparison>;
}

const ScriptedEventsContext = createContext<ScriptedEventsContextValue | null>(null);

const toRenderableText = (event: ScriptedEvent) => {
  if (event.kind === "announcement") return event.announcement?.text ?? "";
  if (event.kind === "tooltip") return event.tooltip?.text ?? "";
  return event.popup?.body ?? "";
};

export const ScriptedEventsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [events, setEvents] = useState<ScriptedEvent[]>(defaultScriptedEvents);
  const [laneFilters, setLaneFilters] = useState<LaneFilters>({
    clyffyVisible: true,
    councilVisible: true,
    includeBackground: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ScriptedEvent[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setEvents(parsed);
      }
    } catch {
      // ignore local cache errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // ignore local cache errors
    }
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => event.enabled !== false)
      .filter((event) => {
        if (event.visibility === "background" && !laneFilters.includeBackground) {
          return false;
        }
        if (event.visibility === "visible" && event.actor === "clyffy" && !laneFilters.clyffyVisible) {
          return false;
        }
        if (event.visibility === "visible" && event.actor === "council" && !laneFilters.councilVisible) {
          return false;
        }
        return true;
      })
      .filter((event) => toRenderableText(event).trim().length > 0)
      .sort((a, b) => b.priority - a.priority);
  }, [events, laneFilters]);

  const comparison = useMemo(
    () => buildScriptedEventComparison(events.filter((event) => event.enabled !== false)),
    [events],
  );

  const setEventEnabled = (eventId: string, enabled: boolean) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, enabled } : event)),
    );
  };

  const resetDefaults = () => {
    setEvents(defaultScriptedEvents);
    setLaneFilters({
      clyffyVisible: true,
      councilVisible: true,
      includeBackground: false,
    });
  };

  const value: ScriptedEventsContextValue = {
    events,
    filteredEvents,
    laneFilters,
    setLaneFilters,
    setEventEnabled,
    resetDefaults,
    comparison,
  };

  return (
    <ScriptedEventsContext.Provider value={value}>
      {children}
    </ScriptedEventsContext.Provider>
  );
};

export const useScriptedEvents = () => {
  const value = useContext(ScriptedEventsContext);
  if (!value) {
    throw new Error("useScriptedEvents must be used within ScriptedEventsProvider");
  }
  return value;
};

export const useScriptedEventLanes = () => {
  const { filteredEvents } = useScriptedEvents();
  return partitionScriptedEvents(filteredEvents);
};

