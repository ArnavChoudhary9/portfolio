import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { revalidateTag, revalidatePath } from "next/cache";
import { BLOG_REPO } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface GithubPushPayload {
  repository?: { name?: string };
}

const verifySignature = (raw: string, signature: string | null, secret: string): boolean => {
  if (!signature) return false;
  const expected =
    "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
};

const flushTagsForRepo = (repoName: string) => {
  if (repoName.toLowerCase() === BLOG_REPO.toLowerCase()) {
    revalidateTag("blog");
    revalidatePath("/blog");
    revalidatePath("/", "page");
    return ["blog", "/blog", "/"];
  }
  revalidateTag(`repo:${repoName}`);
  revalidateTag(`readme:${repoName}`);
  revalidateTag(`contents:${repoName}`);
  revalidateTag("repos");
  revalidatePath("/");
  revalidatePath(`/projects/${repoName}`);
  return [`repo:${repoName}`, `/projects/${repoName}`, "/"];
};

export const POST = async (req: NextRequest) => {
  const raw = await req.text();
  const tokenQuery = req.nextUrl.searchParams.get("token");
  const ghSig = req.headers.get("x-hub-signature-256");
  const ghEvent = req.headers.get("x-github-event");

  const secret = process.env.REVALIDATE_TOKEN;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_TOKEN not configured on the server" },
      { status: 500 }
    );
  }

  // Two auth modes: GitHub webhook HMAC, or simple ?token= for manual / external triggers.
  const authedViaSig = ghSig ? verifySignature(raw, ghSig, secret) : false;
  const authedViaQuery = tokenQuery === secret;
  if (!authedViaSig && !authedViaQuery) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (ghEvent === "ping") {
    return NextResponse.json({ ok: true, pong: true });
  }

  let repoName: string | null = null;
  if (raw) {
    try {
      const payload = JSON.parse(raw) as GithubPushPayload;
      repoName = payload.repository?.name ?? null;
    } catch {
      // body wasn't JSON — fall through, manual triggers may use ?repo=
    }
  }
  if (!repoName) repoName = req.nextUrl.searchParams.get("repo");

  if (!repoName) {
    // Nothing specific to flush — flush everything cheaply.
    revalidateTag("repos");
    revalidateTag("blog");
    revalidatePath("/");
    return NextResponse.json({ ok: true, flushed: ["repos", "blog", "/"] });
  }

  const flushed = flushTagsForRepo(repoName);
  return NextResponse.json({ ok: true, repo: repoName, flushed });
};

export const GET = () =>
  NextResponse.json({
    ok: true,
    usage:
      "POST here with a GitHub webhook (set the secret to REVALIDATE_TOKEN) " +
      "or POST ?token=<REVALIDATE_TOKEN>&repo=<name> to manually flush a repo's cache.",
  });
