"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which #section is most prominently in the viewport. Returns the id of the
 * section whose top is closest to the viewport's anchor line (40% from top).
 */
export const useActiveSection = (ids: string[], anchorPct = 0.4): string | null => {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compute = () => {
      const anchorY = window.innerHeight * anchorPct;
      let best: { id: string; dist: number } | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const dist = Math.abs(r.top - anchorY);
        if (!best || dist < best.dist) best = { id, dist };
      }
      if (best && best.id !== active) setActive(best.id);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids, anchorPct, active]);

  return active;
};
