# ENGINE_CORE :: Portfolio

Personal portfolio for [Arnav Choudhary](https://github.com/ArnavChoudhary9). Built with Next.js 15 (App Router), React Three Fiber, Tailwind, and the GitHub REST API for live project + blog content.

## Stack

- Next.js 15 + React 19 (App Router, Turbopack dev, ISR)
- Tailwind CSS 3
- React Three Fiber + Three.js for the hero scene
- `react-markdown` + `remark-gfm` + `rehype-highlight` + `rehype-raw`
- Framer Motion for section reveals and micro-interactions

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in tokens
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required? | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | strongly recommended | Lifts the GitHub API rate limit from 60/hr (anonymous) to 5000/hr. Without it the page will rate-limit quickly during dev. Use a fine-grained PAT with public read access. |
| `REVALIDATE_TOKEN` | required for webhook | Shared secret for `/api/revalidate`. Used both as the GitHub webhook secret and as the `?token=...` query param for manual cache flushes. Generate with `openssl rand -hex 32`. |

## Project registry — `src/data/project_order.json`

Repos auto-fetched from `https://api.github.com/users/ArnavChoudhary9/repos`. Per-repo curation:

```json
{
  "featured": ["Photon", "RayTracing", "pi"],
  "hidden": ["dotfiles", "old-fork"],
  "overrides": {
    "Photon": {
      "title": "Photon Engine",
      "status": "BETA",
      "banner": "/images/projects/photon.png"
    }
  }
}
```

- `featured` — repo names rendered first, in this order. Everything else follows by `pushed_at` desc.
- `hidden` — repo names excluded from the grid AND blocked at the detail route (returns 404).
- `overrides[repoName]` — optional per-repo `title`, `status` (`STABLE` / `BETA` / `COMPILING`), `banner` (local `/images/...` path or absolute URL).

### Banner detection

For each project, the site looks for `portfolio.png|jpg|jpeg|webp` in the repo root. If found, it's used as the card/banner image. If absent, it falls back to the override in `project_order.json`, then to a stylized `no_banner.bin` placeholder (no fake stock image).

## Blog

The blog reads from a separate repo: `github.com/ArnavChoudhary9/blogs`.

- Drop `.md` (or `.mdx`) files in the **root** of that repo. Filename → slug. Example: `building-a-bvh.md` → `/blog/building-a-bvh`.
- `README.md` is excluded.
- Optional YAML frontmatter:

```markdown
---
title: Building a BVH from scratch
date: 2026-05-07
summary: Why naive ray-AABB intersection costs you 10x and how to fix it.
tags: [graphics, rust, ray-tracing]
---

(post body in markdown)
```

If frontmatter is missing, the title falls back to a title-cased filename and the summary to the first paragraph.

## Caching & freshness

ISR with per-resource revalidation windows:

| Resource | Cache TTL |
| --- | --- |
| Repo list, individual repos, READMEs, banners | 1 hour |
| Blog post list | 10 minutes |
| Individual blog post | 30 minutes |

For instant updates after a push, configure the GitHub webhook below.

## Webhook setup (instant cache flush)

In **each** repo you want to flush on push (`ArnavChoudhary9/blogs`, plus any project repo you push frequently):

1. Settings → Webhooks → **Add webhook**
2. **Payload URL:** `https://<your-domain>/api/revalidate`
3. **Content type:** `application/json`
4. **Secret:** the value of your `REVALIDATE_TOKEN` env var
5. **Events:** Just the `push` event
6. Save

The route handler verifies the HMAC-SHA256 signature, parses `repository.name` from the payload, and selectively flushes the relevant Next.js cache tags (`repo:<name>`, `readme:<name>`, `contents:<name>`, plus `repos`/`blog` lists).

### Manual flush

```bash
curl -X POST 'https://<your-domain>/api/revalidate?token=<REVALIDATE_TOKEN>&repo=blogs'
```

Or with no `repo` param to flush everything cheaply.

## Deploy (Vercel)

1. Import the repo in Vercel.
2. Add `GITHUB_TOKEN` and `REVALIDATE_TOKEN` to the project's Environment Variables (all environments).
3. Deploy. Configure the webhook(s) above pointing at the deployed URL.
