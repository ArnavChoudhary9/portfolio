import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import Markdown from "@/components/markdown";
import Reveal from "@/components/reveal";
import type { GithubRepo } from "@/lib/github";
import { displayTitle, guessStatus } from "@/lib/projectOrder";
import { relativeTime } from "@/lib/time";

interface Props {
  repo: GithubRepo;
  readme: { markdown: string; defaultBranch: string } | null;
  banner: string | null;
}

const ProjectDetails = ({ repo, readme, banner }: Props) => {
  const title = displayTitle(repo);
  const status = guessStatus(repo);

  return (
    <article className="px-margin-mobile md:px-margin-desktop py-12 max-w-[1200px] mx-auto w-full flex flex-col gap-8 pt-20">
      <Reveal y={8}>
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 w-fit font-mono text-[11px] text-outline hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[14px] transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          [RETURN_TO_SRC]
        </Link>
      </Reveal>

      <Reveal y={12}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
          <div>
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
              <span className="text-primary">SRC://</span>
              {title.toUpperCase()}
            </h1>
            <p className="font-mono text-[11px] text-on-surface-variant opacity-80 mt-2">
              github.com/{repo.full_name} · status:{" "}
              <span className="text-primary">{status}</span> · updated{" "}
              {relativeTime(repo.pushed_at)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {repo.language && (
              <span className="inline-flex items-center px-2 py-1 border border-outline-variant/50 rounded-sm bg-surface-container-low font-mono text-[11px] text-primary">
                <span className="relative w-1.5 h-1.5 rounded-full bg-primary mr-2">
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                </span>
                {repo.language}
              </span>
            )}
            {repo.topics?.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-2 py-1 border border-outline-variant/50 rounded-sm bg-surface-container-low font-mono text-[11px] text-on-surface-variant transition-colors hover:text-primary hover:border-primary/40"
              >
                {t}
              </span>
            ))}
            <span className="inline-flex items-center gap-1 px-2 py-1 border border-outline-variant/50 rounded-sm bg-surface-container-low font-mono text-[11px] text-tertiary">
              <FaStar /> {repo.stargazers_count}
            </span>
          </div>
        </div>
      </Reveal>

      {banner && (
        <Reveal delay={0.05} y={20}>
          <section className="w-full relative rounded border border-outline-variant/30 bg-surface-container-low overflow-hidden group hover:border-primary/40 transition-colors duration-300">
            <div className="absolute top-0 right-0 z-10 p-2 font-mono text-[11px] text-outline border-b border-l border-outline-variant/30 bg-surface-container">
              [SYS_BANNER]
            </div>
            <div className="w-full h-[280px] md:h-[400px] relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(173,198,255,0.08),_rgba(19,19,19,1)_70%)] z-[1] pointer-events-none" />
              <Image
                src={banner}
                alt={`${title} banner`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                priority
              />
              <div className="absolute bottom-4 left-4 z-[2] font-mono text-[11px] text-primary flex flex-col gap-1">
                <span>&gt; LOADING_README... OK</span>
                <span>&gt; SOURCE: {repo.full_name}</span>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <Reveal delay={0.1} y={12}>
        <div className="flex flex-wrap gap-3">
          <Link
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group"
          >
            <FaGithub className="transition-transform group-hover:rotate-12" />
            VIEW_SOURCE
          </Link>
          {repo.homepage && (
            <Link
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost group"
            >
              <FaExternalLinkAlt className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              LIVE_DEMO
            </Link>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.15} y={20}>
        <section className="glass-card p-6 md:p-10 rounded-lg">
          {readme ? (
            <Markdown markdown={readme.markdown} repo={repo.name} branch={readme.defaultBranch} />
          ) : (
            <div className="font-mono text-[13px] text-on-surface-variant py-12 text-center flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-outline">
                description
              </span>
              <span>No README found in repository root.</span>
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline mt-2"
              >
                Browse source on GitHub →
              </Link>
            </div>
          )}
        </section>
      </Reveal>
    </article>
  );
};

export default ProjectDetails;
