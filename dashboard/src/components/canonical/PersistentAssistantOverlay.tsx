"use client";

import { Minus, PanelLeft, PanelTop, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { CanonicalButton } from "./CanonicalButton";

type OverlayDock = "left" | "top";

interface PersistentAssistantOverlayProps {
  title?: string;
  children: ReactNode;
  defaultDock?: OverlayDock;
}

export const PersistentAssistantOverlay = ({
  title = "Clyffy Assistant",
  children,
  defaultDock = "left",
}: PersistentAssistantOverlayProps) => {
  const [open, setOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [dock, setDock] = useState<OverlayDock>(defaultDock);

  if (!open) return null;

  const dockClass =
    dock === "left"
      ? "left-[var(--wc-space-3)] top-[var(--wc-shell-top)] w-[min(30rem,92vw)]"
      : "left-1/2 top-[var(--wc-space-3)] -translate-x-1/2 w-[min(48rem,96vw)]";

  return (
    <aside
      className={`wc-shell-frame fixed z-40 ${dockClass} border p-[var(--wc-space-2)] shadow-2xl`}
      role="dialog"
      aria-label={title}
    >
      <header className="mb-[var(--wc-space-2)] flex items-center justify-between gap-2">
        <div className="wc-fluid-text-sm text-nb-gray-100">{title}</div>
        <div className="flex items-center gap-1">
          <CanonicalButton
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={dock === "left" ? "Dock to top" : "Dock to left"}
            onClick={() => setDock((d) => (d === "left" ? "top" : "left"))}
          >
            {dock === "left" ? <PanelTop size={16} /> : <PanelLeft size={16} />}
          </CanonicalButton>
          <CanonicalButton
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={minimized ? "Expand assistant" : "Minimize assistant"}
            onClick={() => setMinimized((v) => !v)}
          >
            <Minus size={16} />
          </CanonicalButton>
          <CanonicalButton
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="Close assistant"
            onClick={() => setOpen(false)}
          >
            <X size={16} />
          </CanonicalButton>
        </div>
      </header>

      {!minimized && <div className="max-h-[min(70vh,42rem)] overflow-auto">{children}</div>}
    </aside>
  );
};

