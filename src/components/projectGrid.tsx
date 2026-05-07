"use client";

import { useState, useRef } from "react";
import ProjectCard from "@/components/projectCard";
import Reveal from "@/components/reveal";
import type { ProjectStatus } from "@/lib/projectOrder";

export interface CardData {
  id: number;
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

interface Props {
  cards: CardData[];
  initialLimit?: number;
}

const ProjectGrid = ({ cards, initialLimit = 6 }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const visible = expanded ? cards : cards.slice(0, initialLimit);
  const hidden = Math.max(0, cards.length - initialLimit);
  const canExpand = hidden > 0;

  const onToggle = () => {
    if (expanded && sectionRef.current) {
      // Scroll back so the user isn't stranded mid-page after collapsing.
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setExpanded((v) => !v);
  };

  return (
    <div ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((c, i) => (
          <Reveal key={c.id} delay={Math.min((i % initialLimit) * 0.04, 0.32)}>
            <ProjectCard
              index={c.index}
              title={c.title}
              repoName={c.repoName}
              banner={c.banner}
              description={c.description}
              language={c.language}
              topics={c.topics}
              stars={c.stars}
              pushedAt={c.pushedAt}
              status={c.status}
            />
          </Reveal>
        ))}
      </div>

      {canExpand && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={onToggle}
            type="button"
            className="btn-ghost group"
            aria-expanded={expanded}
          >
            <span
              className={`material-symbols-outlined text-base leading-none transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
            {expanded ? "SHOW_LESS" : `SHOW_ALL (${hidden} MORE)`}
          </button>
          <span className="font-mono text-[10px] text-outline">
            [{visible.length}/{cards.length}]
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
