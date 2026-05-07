"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CodeforcesUser {
  rating?: number;
  rank?: string;
  maxRating?: number;
}

const Row = ({
  k,
  v,
  mono = "text-on-surface",
  delay = 0,
  reduced,
}: {
  k: string;
  v: string;
  mono?: string;
  delay?: number;
  reduced: boolean | null;
}) => (
  <motion.div
    initial={reduced ? false : { opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.19, 1, 0.22, 1] }}
    className="flex justify-between items-center"
  >
    <span className="font-mono text-[11px] text-on-surface-variant">{k}</span>
    <span className={`font-mono text-[12px] ${mono}`}>{v}</span>
  </motion.div>
);

const Telemetry = () => {
  const reduced = useReducedMotion();
  const [cf, setCf] = useState<CodeforcesUser | null>(null);
  const [cfStatus, setCfStatus] = useState<"loading" | "ok" | "err">("loading");

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://codeforces.com/api/user.info?handles=arnavchoudhary.6969", {
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const u = data?.result?.[0];
        if (u) {
          setCf({ rating: u.rating, rank: u.rank, maxRating: u.maxRating });
          setCfStatus("ok");
        } else {
          setCfStatus("err");
        }
      })
      .catch(() => setCfStatus("err"));
    return () => ctrl.abort();
  }, []);

  const cfDisplay =
    cfStatus === "loading"
      ? "FETCHING..."
      : cfStatus === "err"
      ? "OFFLINE"
      : cf?.rating
      ? `${(cf.rank ?? "user").toUpperCase()} (${cf.rating})`
      : "UNRATED";

  return (
    <div className="w-full lg:w-80 glass-card glow-border p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="font-mono text-[11px] text-on-surface-variant">TELEMETRY</span>
        <span className="font-mono text-[11px] text-outline">[0x01]</span>
      </div>

      <div className="flex flex-col gap-3">
        <Row reduced={reduced} delay={0.0} k="LOCATION" v="IIT DELHI" />
        <Row reduced={reduced} delay={0.05} k="MAJOR" v="APPLIED MECH" />
        <Row reduced={reduced} delay={0.1} k="CODEFORCES" v={cfDisplay} mono="text-primary" />
        <Row reduced={reduced} delay={0.15} k="UPTIME" v="99.9%" mono="text-secondary" />
      </div>
    </div>
  );
};

export default Telemetry;
