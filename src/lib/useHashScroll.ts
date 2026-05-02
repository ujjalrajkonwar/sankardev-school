"use client";

import { useEffect } from "react";

function scrollToId(id: string | null) {
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export default function useHashScroll() {
  useEffect(() => {
    let retryCounts: Record<string, number> = {};

    const tryScroll = (hash: string | null) => {
      const id = hash?.startsWith("#") ? hash.slice(1) : hash;
      if (!id) return;

      const attempt = () => {
        const ok = scrollToId(id);
        if (!ok) {
          retryCounts[id] = (retryCounts[id] || 0) + 1;
          if (retryCounts[id] < 5) {
            setTimeout(attempt, 120);
          }
        }
      };

      attempt();
    };

    const handleHash = () => tryScroll(window.location.hash);

    // Try once on mount
    handleHash();

    // Listen for future hashchanges
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);
}
