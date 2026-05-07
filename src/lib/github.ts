import type { FetchErrorReason } from "@/components/errorState";

export const GITHUB_OWNER = "ArnavChoudhary9";
export const BLOG_REPO = "blogs";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
}

interface GithubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: "file" | "dir" | "symlink" | "submodule";
  download_url: string | null;
  html_url: string;
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; reason: FetchErrorReason; resetInSeconds?: number };

const REVALIDATE_DEFAULT = 3600;
const REVALIDATE_BLOG_LIST = 600;
const REVALIDATE_BLOG_POST = 1800;

const headers = (): HeadersInit => {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
};

const classifyError = (res: Response, where: string): Result<never> => {
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("x-ratelimit-reset");
    const resetIn = reset
      ? Math.max(0, Math.round(Number(reset) - Date.now() / 1000))
      : undefined;
    console.error(
      `[github] ${where} rate-limited (${res.status}). ${
        resetIn ? `Resets in ${resetIn}s.` : ""
      } Set GITHUB_TOKEN to lift the 60/hr limit.`
    );
    return { ok: false, reason: "rate_limited", resetInSeconds: resetIn };
  }
  if (res.status === 404) {
    return { ok: false, reason: "not_found" };
  }
  console.error(`[github] ${where} failed: ${res.status} ${res.statusText}`);
  return { ok: false, reason: "unknown" };
};

const safeFetch = async <T>(
  url: string,
  init: RequestInit & { next?: { revalidate?: number; tags?: string[] } },
  where: string,
  parse: (res: Response) => Promise<T>
): Promise<Result<T>> => {
  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (e) {
    console.error(`[github] ${where} network error:`, e);
    return { ok: false, reason: "network" };
  }
  if (!res.ok) return classifyError(res, where);
  try {
    return { ok: true, data: await parse(res) };
  } catch (e) {
    console.error(`[github] ${where} parse error:`, e);
    return { ok: false, reason: "unknown" };
  }
};

// ---- repos ----------------------------------------------------------------

export const getRepos = async (): Promise<Result<GithubRepo[]>> => {
  const url = `https://api.github.com/users/${GITHUB_OWNER}/repos?per_page=100&sort=updated`;
  const r = await safeFetch<GithubRepo[]>(
    url,
    { headers: headers(), next: { revalidate: REVALIDATE_DEFAULT, tags: ["repos"] } },
    "getRepos",
    (res) => res.json() as Promise<GithubRepo[]>
  );
  if (!r.ok) return r;
  return { ok: true, data: r.data.filter((x) => !x.fork && !x.private) };
};

export const getRepo = async (name: string): Promise<Result<GithubRepo>> => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${name}`;
  return safeFetch<GithubRepo>(
    url,
    { headers: headers(), next: { revalidate: REVALIDATE_DEFAULT, tags: ["repos", `repo:${name}`] } },
    `getRepo(${name})`,
    (res) => res.json() as Promise<GithubRepo>
  );
};

export const getReadme = async (name: string): Promise<Result<{ markdown: string; defaultBranch: string }>> => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${name}/readme`;
  const r = await safeFetch<string>(
    url,
    {
      headers: { ...headers(), Accept: "application/vnd.github.raw" },
      next: { revalidate: REVALIDATE_DEFAULT, tags: [`readme:${name}`] },
    },
    `getReadme(${name})`,
    (res) => res.text()
  );
  if (!r.ok) return r;
  // raw.githubusercontent.com resolves "HEAD" to the default branch automatically.
  return { ok: true, data: { markdown: r.data, defaultBranch: "HEAD" } };
};

export const getPortfolioBanner = async (name: string): Promise<string | null> => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${name}/contents`;
  const r = await safeFetch<GithubContent[]>(
    url,
    { headers: headers(), next: { revalidate: REVALIDATE_DEFAULT, tags: [`contents:${name}`] } },
    `getPortfolioBanner(${name})`,
    (res) => res.json() as Promise<GithubContent[]>
  );
  if (!r.ok || !Array.isArray(r.data)) return null;
  const exts = ["png", "jpg", "jpeg", "webp"];
  const match = r.data.find(
    (c) => c.type === "file" && exts.some((e) => c.name.toLowerCase() === `portfolio.${e}`)
  );
  if (!match) return null;
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${name}/HEAD/${match.name}`;
};

// ---- blog -----------------------------------------------------------------

export const getBlogContents = async (): Promise<Result<GithubContent[]>> => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${BLOG_REPO}/contents`;
  return safeFetch<GithubContent[]>(
    url,
    {
      headers: headers(),
      next: { revalidate: REVALIDATE_BLOG_LIST, tags: ["blog", "blog:list"] },
    },
    "getBlogContents",
    (res) => res.json() as Promise<GithubContent[]>
  );
};

export const getBlogFile = async (filename: string): Promise<Result<string>> => {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${BLOG_REPO}/contents/${encodeURIComponent(filename)}`;
  return safeFetch<string>(
    url,
    {
      headers: { ...headers(), Accept: "application/vnd.github.raw" },
      next: { revalidate: REVALIDATE_BLOG_POST, tags: ["blog", `blog:${filename}`] },
    },
    `getBlogFile(${filename})`,
    (res) => res.text()
  );
};

// ---- helpers --------------------------------------------------------------

export const rawUrl = (repo: string, path: string, branch = "HEAD") =>
  `https://raw.githubusercontent.com/${GITHUB_OWNER}/${repo}/${branch}/${path.replace(/^\/+/, "")}`;

export const blobUrl = (repo: string, path: string, branch = "HEAD") =>
  `https://github.com/${GITHUB_OWNER}/${repo}/blob/${branch}/${path.replace(/^\/+/, "")}`;
