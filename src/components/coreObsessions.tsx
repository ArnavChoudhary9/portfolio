import SectionHeader from "@/components/sectionHeader";
import Reveal from "@/components/reveal";

interface Obsession {
  icon: string;
  tag: string;
  title: string;
  body: string;
  color: "primary" | "tertiary" | "secondary";
}

const items: Obsession[] = [
  {
    icon: "light_mode",
    tag: "[RTX]",
    title: "Ray Tracing",
    body: "BVH acceleration, path tracing, Monte Carlo integration. Built one in Rust, currently extending it with importance sampling.",
    color: "primary",
  },
  {
    icon: "memory",
    tag: "[GPU]",
    title: "GPU Pipelines",
    body: "OpenGL today, learning Vulkan. Comfortable with shader pipelines, framebuffers, and the usual graphics-debugger workflow.",
    color: "tertiary",
  },
  {
    icon: "public",
    tag: "[SIM]",
    title: "Engines & Physics",
    body: "Two game engines (Pi, Photon) with their own editors and a rigid-body physics library written in C++ as a study project.",
    color: "secondary",
  },
];

const colorClass = {
  primary: "text-primary",
  tertiary: "text-tertiary",
  secondary: "text-secondary",
} as const;

const stackGroups: [string, string][] = [
  ["LANGUAGES", "C, C++, Rust, Python, TypeScript"],
  ["GRAPHICS", "OpenGL, Vulkan (learning), ImGui"],
  ["WEB", "Next.js, React, Flask, Django"],
  ["TOOLS", "Linux, Git, ffmpeg, mdbook"],
];

const CoreObsessions = () => (
  <section
    id="skills"
    className="relative z-10 px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto w-full"
  >
    <Reveal>
      <SectionHeader title="core_focus" icon="data_object" trail="[STACK]" />
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.08}>
          <div className="glass-card glow-border-strong p-6 flex flex-col gap-4 h-64 group transition-transform duration-300 hover:-translate-y-0.5">
            <div className="flex justify-between items-start">
              <span
                className={`material-symbols-outlined text-3xl ${colorClass[it.color]} transition-transform duration-300 group-hover:scale-110`}
              >
                {it.icon}
              </span>
              <span className="font-mono text-[11px] text-outline">{it.tag}</span>
            </div>
            <h3 className="font-sans text-2xl font-semibold text-on-surface">
              {it.title}
            </h3>
            <p className="font-mono text-[13px] text-on-surface-variant mt-auto leading-relaxed">
              {it.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>

    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
      {stackGroups.map(([k, v], i) => (
        <Reveal key={k} delay={0.05 + i * 0.05}>
          <div className="glass-card p-4 flex flex-col gap-1 h-full transition-colors duration-200 hover:border-primary/40">
            <span className="font-mono text-[11px] text-on-surface-variant">{k}</span>
            <span className="font-mono text-[12px] text-on-surface leading-relaxed">{v}</span>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default CoreObsessions;
