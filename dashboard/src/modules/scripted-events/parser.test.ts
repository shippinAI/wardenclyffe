import { describe, expect, it } from "vitest";
import {
  parseScriptedAnnouncementsEnvelope,
  parseScriptedAnnouncementsPayload,
  parseScriptedEventsPayload,
} from "./parser";

describe("parseScriptedAnnouncementsPayload", () => {
  it("accepts legacy announcement arrays", () => {
    const parsed = parseScriptedAnnouncementsPayload([
      {
        tag: "New",
        text: "Feature rollout",
        variant: "important",
        closeable: true,
        isCloudOnly: false,
      },
    ]);

    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.text).toBe("Feature rollout");
  });

  it("accepts envelope payloads with announcements", () => {
    const parsed = parseScriptedAnnouncementsPayload({
      announcements: [
        {
          tag: "",
          text: "Operator notice",
          variant: "default",
          closeable: false,
          isCloudOnly: false,
        },
      ],
      events: [],
    });

    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.variant).toBe("default");
  });

  it("rejects invalid payloads", () => {
    const parsed = parseScriptedAnnouncementsPayload({
      announcements: [{ text: "missing required fields" }],
    });

    expect(parsed).toEqual([]);
  });
});

describe("parseScriptedEventsPayload", () => {
  it("accepts strict MCP response payloads", () => {
    const parsed = parseScriptedEventsPayload({
      requestId: "req-1",
      events: [
        {
          id: "evt-1",
          kind: "tooltip",
          trigger: "hover",
          source: "mcp",
          actor: "clyffy",
          visibility: "visible",
          delivery: "ui",
          focus: "limited_tunnel",
          priority: 10,
          tooltip: {
            id: "tip-1",
            text: "You can drag this node.",
            placement: "right",
          },
        },
      ],
      generatedAt: "2026-01-01T00:00:00.000Z",
    });

    expect(parsed).toHaveLength(1);
    expect(parsed[0]?.kind).toBe("tooltip");
  });

  it("rejects malformed MCP payloads", () => {
    const parsed = parseScriptedEventsPayload({
      requestId: "req-1",
      events: [{ id: "evt-1", kind: "tooltip" }],
    });

    expect(parsed).toEqual([]);
  });

  it("rejects events whose payload shape does not match kind", () => {
    const parsed = parseScriptedEventsPayload({
      requestId: "req-1",
      events: [
        {
          id: "evt-2",
          kind: "popup",
          trigger: "manual",
          source: "mcp",
          actor: "clyffy",
          visibility: "visible",
          delivery: "ui",
          focus: "full",
          priority: 1,
          tooltip: {
            id: "tip-2",
            text: "wrong payload for popup",
          },
        },
      ],
    });

    expect(parsed).toEqual([]);
  });
});

describe("parseScriptedAnnouncementsEnvelope", () => {
  it("returns envelope announcements and renderable events", () => {
    const parsed = parseScriptedAnnouncementsEnvelope({
      announcements: [
        {
          tag: "Did you know",
          text: "You can script contextual help.",
          variant: "default",
          closeable: true,
          isCloudOnly: false,
        },
      ],
      events: [
        {
          id: "evt-3",
          kind: "announcement",
          trigger: "app_load",
          source: "didyouknow",
          actor: "council",
          visibility: "background",
          delivery: "datasink",
          focus: "limited_tunnel",
          priority: 5,
          announcement: {
            tag: "Tip",
            text: "Use smart filters for large tables.",
            variant: "default",
            closeable: true,
            isCloudOnly: false,
          },
        },
      ],
    });

    expect(parsed.announcements).toHaveLength(1);
    expect(parsed.events).toHaveLength(1);
  });
});
