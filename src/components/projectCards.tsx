import { GITHUB_OWNER, getRepos, getPortfolioBanner } from "@/lib/github";
import {
  applyOrdering,
  displayTitle,
  getOverride,
  guessStatus,
} from "@/lib/projectOrder";
import ProjectGrid, { type CardData } from "@/components/projectGrid";
import SectionHeader from "@/components/sectionHeader";
import Reveal from "@/components/reveal";
import ErrorState from "@/components/errorState";

const ProjectCards = async () => {
  const reposResult = await getRepos();

  if (!reposResult.ok) {
    return (
      <section
        id="projects"
        className="relative z-10 px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto w-full"
      >
        <SectionHeader title="// ./src/projects" icon="folder_open" trail="[REGISTRY]" />
        <ErrorState
          reason={reposResult.reason}
          resource="project registry"
          resetInSeconds={reposResult.resetInSeconds}
          retryHref="/#projects"
          externalHref={`https://github.com/${GITHUB_OWNER}?tab=repositories`}
        />
      </section>
    );
  }

  const ordered = applyOrdering(reposResult.data);

  const cards: CardData[] = await Promise.all(
    ordered.map(async (r, i) => {
      const ovr = getOverride(r.name);
      const probed = await getPortfolioBanner(r.name);
      const banner = probed ?? ovr.banner ?? null;
      return {
        id: r.id,
        index: i + 1,
        title: displayTitle(r),
        repoName: r.name,
        banner,
        description: r.description ?? "",
        language: r.language,
        topics: r.topics ?? [],
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
        status: guessStatus(r),
      };
    })
  );

  return (
    <section
      id="projects"
      className="relative z-10 px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto w-full"
    >
      <Reveal>
        <SectionHeader title="// ./src/projects" icon="folder_open" trail="[REGISTRY]" />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mb-8">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
            PROJECT_REGISTRY
          </h2>
          <p className="font-mono text-[13px] text-on-surface-variant mt-2 max-w-2xl">
            &gt; Pulled live from{" "}
            <span className="text-primary">github.com/{GITHUB_OWNER}</span>.{" "}
            <span className="text-primary">{cards.length}</span> public repos found, refreshed hourly.
          </p>
        </div>
      </Reveal>

      {cards.length === 0 ? (
        <div className="glass-card p-8 text-center font-mono text-[13px] text-on-surface-variant">
          No public repositories visible after applying overrides.
        </div>
      ) : (
        <ProjectGrid cards={cards} initialLimit={6} />
      )}
    </section>
  );
};

export default ProjectCards;
