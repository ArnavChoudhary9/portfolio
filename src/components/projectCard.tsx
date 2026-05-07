"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { relativeTime } from "@/lib/time";
import type { ProjectStatus } from "@/lib/projectOrder";

interface Props {
  index: number;
  title: string;
  repoName: string;
  banner: string | null;
  description: string;
  language: string | null;
  topics: string[];
  stars: number;
  pushedAt: string;
  status: ProjectStatus;
}

const statusClass = (s: ProjectStatus) => {
  if (s === "STABLE") return "status-stable";
  if (s === "BETA") return "status-beta";
  return "status-compiling";
};

const statusBarColor = (s: ProjectStatus) =>
  s === "STABLE" ? "bg-secondary" : s === "BETA" ? "bg-tertiary" : "bg-primary";

const statusProgress = (s: ProjectStatus) =>
  s === "STABLE" ? 100 : s === "BETA" ? 75 : 60;

const NoBanner = ({ name }: { name: string }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-low">
    <div
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(173,198,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(173,198,255,0.4) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
    <span className="material-symbols-outlined text-primary/40 text-4xl mb-1">
      hide_image
    </span>
    <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60">
      no_banner.bin
    </span>
    <span className="font-mono text-[9px] mt-1 text-outline/60">
      ./{name}
    </span>
  </div>
);

const ProjectCard = ({
  index,
  title,
  repoName,
  banner,
  description,
  language,
  topics,
  stars,
  pushedAt,
  status,
}: Props) => {
  const tags = [language, ...topics.slice(0, 2)].filter(Boolean) as string[];
  const cardRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 4}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 4}deg`);
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Link
      ref={cardRef}
      href={`/projects/${repoName}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        {
          transform:
            "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transition: "transform 200ms ease-out",
        } as React.CSSProperties
      }
      className="group relative flex flex-col h-full overflow-hidden cursor-pointer rounded glass-card glow-border-strong will-change-transform"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(173,198,255,0.12), transparent 50%)",
        }}
      />

      <div className="absolute top-2 right-2 font-mono text-[11px] text-on-surface-variant bg-surface/85 px-2 py-1 border border-white/10 z-10 rounded">
        [{index.toString(16).padStart(2, "0").toUpperCase()}]
      </div>

      <div className="h-48 w-full relative bg-surface-container-high border-b border-white/10 overflow-hidden">
        {banner ? (
          <>
            <Image
              src={banner}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
          </>
        ) : (
          <NoBanner name={repoName} />
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow gap-4">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-sans text-2xl font-semibold text-on-surface group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <span className={`status-pill ${statusClass(status)}`}>
            <span className="dot" />
            {status}
          </span>
        </div>

        <p className="font-mono text-[13px] text-on-surface-variant flex-grow leading-relaxed line-clamp-3">
          {description || "No description provided in repo metadata."}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {tags.map((t, i) => (
              <span key={t} className={`tech-tag ${i === 0 ? "text-primary" : ""}`}>
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="w-full bg-surface-container-highest h-1 mt-2 overflow-hidden rounded-full">
          <div
            className={`${statusBarColor(status)} h-full transition-all duration-700 ease-out group-hover:brightness-125`}
            style={{ width: `${statusProgress(status)}%` }}
          />
        </div>

        <div className="flex justify-between items-center font-mono text-[10px] text-on-surface-variant">
          <span className="flex items-center gap-1">
            <FaStar className="text-tertiary" /> {stars}
          </span>
          <span>UPDATED {relativeTime(pushedAt).toUpperCase()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
