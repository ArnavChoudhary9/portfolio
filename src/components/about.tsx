import SectionHeader from "@/components/sectionHeader";
import Reveal from "@/components/reveal";

const eduRows = [
  { label: "10TH (2022)", value: "90%" },
  { label: "12TH (2024)", value: "88.6%" },
  { label: "B.TECH APPLIED MECH", value: "IIT DELHI · 7.07 CGPA" },
];

const About = () => (
  <section
    id="about"
    className="relative z-10 px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto w-full"
  >
    <Reveal>
      <SectionHeader title="// readme" icon="terminal" trail="[ABOUT]" />
    </Reveal>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Reveal delay={0.05} className="lg:col-span-2">
        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-3xl md:text-4xl font-semibold text-on-surface tracking-tight">
            About <span className="text-primary">me</span>
          </h3>

          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            I&apos;m an Applied Mechanics undergrad at IIT Delhi who spends most of his
            free time on graphics and engine code. My main projects right now are
            <span className="text-on-surface"> Photon</span>, a Python game engine, and a
            Rust ray tracer I&apos;m extending into a small renderer.
          </p>

          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            I work mostly in C++, Rust, and Python, with a bit of TypeScript when I need a
            UI. I like systems programming, the math behind rendering, and finding excuses
            to write things from scratch instead of pulling in a library.
          </p>

          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            On the web side I&apos;ve shipped full-stack apps with{" "}
            <span className="text-on-surface">Next.js, React, Flask, and Django</span>{" "}
            &mdash; OAuth flows, SQL-backed dashboards, marketplaces, and a couple of small auth
            services. I&apos;m comfortable with the deploy side too:{" "}
            <span className="text-on-surface">Docker, Linux, GitHub Actions, Vercel,</span>{" "}
            and Nginx for self-hosted bits.
          </p>

          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            On the side I grind Codeforces and pick up the occasional freelance web project.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <aside className="glass-card p-6 flex flex-col gap-4 h-full">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="font-mono text-[11px] text-on-surface-variant">EDUCATION</span>
            <span className="font-mono text-[11px] text-outline">[0x02]</span>
          </div>
          <div className="flex flex-col gap-3">
            {eduRows.map((r) => (
              <div key={r.label} className="flex flex-col gap-0.5">
                <span className="font-mono text-[11px] text-on-surface-variant">
                  {r.label}
                </span>
                <span className="font-mono text-[12px] text-on-surface">{r.value}</span>
              </div>
            ))}
          </div>
        </aside>
      </Reveal>
    </div>
  </section>
);

export default About;
