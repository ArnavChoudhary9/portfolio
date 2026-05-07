import order from "@/data/project_order.json";
import type { GithubRepo } from "@/lib/github";

export type ProjectStatus = "STABLE" | "BETA" | "COMPILING";

interface ProjectOverride {
  title?: string;
  status?: ProjectStatus;
  banner?: string;
  blurb?: string;
}

interface OrderShape {
  featured: string[];
  hidden: string[];
  overrides: Record<string, ProjectOverride>;
}

const ORDER = order as OrderShape;

export const isHidden = (name: string) =>
  ORDER.hidden.some((h) => h.toLowerCase() === name.toLowerCase());

export const getOverride = (name: string): ProjectOverride => {
  const key = Object.keys(ORDER.overrides).find(
    (k) => k.toLowerCase() === name.toLowerCase()
  );
  return key ? ORDER.overrides[key] : {};
};

const featuredIndex = (name: string): number => {
  const i = ORDER.featured.findIndex(
    (f) => f.toLowerCase() === name.toLowerCase()
  );
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
};

export const applyOrdering = (repos: GithubRepo[]): GithubRepo[] => {
  const visible = repos.filter((r) => !isHidden(r.name) && !r.archived);
  return visible.sort((a, b) => {
    const fa = featuredIndex(a.name);
    const fb = featuredIndex(b.name);
    if (fa !== fb) return fa - fb;
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });
};

export const guessStatus = (
  repo: Pick<GithubRepo, "name" | "pushed_at" | "stargazers_count">
): ProjectStatus => {
  const override = getOverride(repo.name);
  if (override.status) return override.status;
  const daysSincePush =
    (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSincePush < 30) return "COMPILING";
  if (repo.stargazers_count >= 3) return "STABLE";
  return "BETA";
};

export const displayTitle = (repo: GithubRepo) =>
  getOverride(repo.name).title ?? repo.name;
