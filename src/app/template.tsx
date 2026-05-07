"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * App Router `template.tsx` — remounts on every route change. Used here as a
 * lightweight page-enter animation: a quick fade + tiny upward slide, scoped
 * per-route. Hero/Reveal staggers still play on top after the page settles.
 */
const Template = ({ children }: { children: ReactNode }) => {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Template;
