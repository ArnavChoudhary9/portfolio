"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Telemetry from "@/components/telemetry";

const Hero = () => {
  const reduced = useReducedMotion();

  const stagger = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] as const },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-margin-mobile md:px-margin-desktop pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 items-start lg:items-center">
        <div className="flex-1 flex flex-col gap-6">
          <motion.div
            {...stagger(0)}
            className="inline-flex items-center gap-2 bg-surface-container-high/80 backdrop-blur-sm px-3 py-1 rounded border border-white/10 w-max"
          >
            <span className="relative w-2 h-2 rounded-full bg-secondary">
              <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-60" />
            </span>
            <span className="font-mono text-[11px] text-secondary">SYS_STATUS: ONLINE</span>
          </motion.div>

          <motion.h1
            {...stagger(1)}
            className="font-sans text-5xl md:text-[56px] leading-[1.05] tracking-tight font-bold text-on-surface"
          >
            Arnav <span className="text-primary">Choudhary</span>
          </motion.h1>

          <motion.p
            {...stagger(2)}
            className="font-mono text-[12px] text-on-surface-variant uppercase tracking-widest"
          >
            graphics &amp; engine programmer · IIT Delhi
          </motion.p>

          <motion.p
            {...stagger(3)}
            className="font-sans text-base md:text-lg leading-relaxed text-on-surface-variant max-w-2xl"
          >
            I build renderers, ray tracers, and small game engines &mdash; mostly in C++,
            Rust, and Python. Currently a freshman at IIT Delhi studying Applied
            Mechanics, working on a real-time ray-traced engine on the side.
          </motion.p>

          <motion.div {...stagger(4)} className="flex flex-wrap gap-3 pt-2">
            <Link href="#projects" className="btn-primary group">
              <span className="material-symbols-outlined text-base leading-none transition-transform group-hover:translate-x-0.5">
                code
              </span>
              VIEW_SOURCE
            </Link>
            <Link href="#about" className="btn-ghost group">
              <span className="material-symbols-outlined text-base leading-none transition-transform group-hover:translate-x-0.5">
                description
              </span>
              READ_DOCS
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
          className="w-full lg:w-auto"
        >
          <Telemetry />
        </motion.div>
      </div>

      <Link
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-surface/60 backdrop-blur-sm text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300 animate-bounce"
        style={{ animationDuration: "2.4s" }}
      >
        <span className="material-symbols-outlined text-xl">keyboard_arrow_down</span>
      </Link>
    </section>
  );
};

export default Hero;
