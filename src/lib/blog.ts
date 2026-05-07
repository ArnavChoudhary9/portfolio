import { getBlogContents, getBlogFile, type Result } from "@/lib/github";

export interface BlogPostMeta {
  slug: string;
  filename: string;
  title: string;
  date: string | null;
  summary: string | null;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  markdown: string;
}

const FRONTMATTER_RE = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/;

interface ParsedFrontmatter {
  data: Record<string, string | string[]>;
  body: string;
}

/** Tiny YAML-ish frontmatter parser. Handles `key: value` and `key: [a, b]` and bare lists. */
const parseFrontmatter = (raw: string): ParsedFrontmatter => {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string | string[]> = {};
  const yaml = match[1];
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = value;
    }
  }
  return { data, body: raw.slice(match[0].length) };
};

const slugFromFilename = (filename: string) =>
  filename.replace(/\.mdx?$/i, "").toLowerCase();

/** Extract a fallback summary: first non-heading paragraph, capped at ~180 chars. */
const fallbackSummary = (body: string): string | null => {
  for (const block of body.split(/\n\s*\n/)) {
    const trimmed = block.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("```")) continue;
    return trimmed.length > 180 ? trimmed.slice(0, 177) + "..." : trimmed;
  }
  return null;
};

/** Title-cased filename: "my-first-post" -> "My First Post". */
const fallbackTitle = (filename: string) =>
  filename
    .replace(/\.mdx?$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const buildMeta = (
  filename: string,
  data: Record<string, string | string[]>,
  body: string,
  fallbackDate?: string
): BlogPostMeta => {
  const tagsRaw = data.tags;
  const tags: string[] = Array.isArray(tagsRaw)
    ? tagsRaw
    : typeof tagsRaw === "string" && tagsRaw.length > 0
    ? tagsRaw.split(/,\s*/)
    : [];
  return {
    slug: slugFromFilename(filename),
    filename,
    title: (typeof data.title === "string" && data.title) || fallbackTitle(filename),
    date:
      (typeof data.date === "string" && data.date) ||
      fallbackDate ||
      null,
    summary:
      (typeof data.summary === "string" && data.summary) ||
      (typeof data.description === "string" && data.description) ||
      fallbackSummary(body),
    tags,
  };
};

const isMarkdownFile = (name: string) =>
  /\.mdx?$/i.test(name) && !/^readme\.mdx?$/i.test(name);

export const getBlogPosts = async (): Promise<Result<BlogPostMeta[]>> => {
  const list = await getBlogContents();
  if (!list.ok) return list;
  if (!Array.isArray(list.data)) {
    return { ok: false, reason: "not_found" };
  }

  const mdFiles = list.data.filter((c) => c.type === "file" && isMarkdownFile(c.name));

  const posts = await Promise.all(
    mdFiles.map(async (f) => {
      const file = await getBlogFile(f.name);
      if (!file.ok) {
        return buildMeta(f.name, {}, "", undefined);
      }
      const { data, body } = parseFrontmatter(file.data);
      return buildMeta(f.name, data, body);
    })
  );

  posts.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });

  return { ok: true, data: posts };
};

export const getBlogPost = async (slug: string): Promise<Result<BlogPost>> => {
  const list = await getBlogContents();
  if (!list.ok) return list;
  if (!Array.isArray(list.data)) return { ok: false, reason: "not_found" };

  const file = list.data.find(
    (c) => c.type === "file" && isMarkdownFile(c.name) && slugFromFilename(c.name) === slug
  );
  if (!file) return { ok: false, reason: "not_found" };

  const raw = await getBlogFile(file.name);
  if (!raw.ok) return raw;

  const { data, body } = parseFrontmatter(raw.data);
  const meta = buildMeta(file.name, data, body);
  return { ok: true, data: { ...meta, markdown: body } };
};
