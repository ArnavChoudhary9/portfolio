import { Suspense } from "react";
import Link from "next/link";
import { GITHUB_OWNER, BLOG_REPO } from "@/lib/github";
import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/blogCard";
import SectionHeader from "@/components/sectionHeader";
import Reveal from "@/components/reveal";
import ErrorState from "@/components/errorState";
import { BlogListSkeleton } from "@/components/skeleton";

export const metadata = {
  title: "LOG_STREAM :: Arnav Choudhary",
  description: "Notes, write-ups, and the occasional rant.",
};

const BlogList = async () => {
  const result = await getBlogPosts();

  if (!result.ok) {
    if (result.reason === "not_found") {
      return (
        <div className="glass-card p-8 text-center font-mono text-[13px] text-on-surface-variant flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-outline">edit_note</span>
          <span>The blog repo isn&apos;t set up yet.</span>
          <span className="text-outline">
            Create <span className="text-primary">github.com/{GITHUB_OWNER}/{BLOG_REPO}</span>{" "}
            with .md files in the root and they&apos;ll show up here.
          </span>
        </div>
      );
    }
    return (
      <ErrorState
        reason={result.reason}
        resource="blog posts"
        resetInSeconds={result.resetInSeconds}
        retryHref="/blog"
        externalHref={`https://github.com/${GITHUB_OWNER}/${BLOG_REPO}`}
      />
    );
  }

  if (result.data.length === 0) {
    return (
      <div className="glass-card p-8 text-center font-mono text-[13px] text-on-surface-variant">
        No posts published yet. Check back soon.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {result.data.map((post, i) => (
        <Reveal key={post.slug} delay={Math.min(i * 0.05, 0.3)}>
          <BlogCard index={i + 1} post={post} />
        </Reveal>
      ))}
    </div>
  );
};

const BlogIndexPage = () => (
  <article className="px-margin-mobile md:px-margin-desktop py-12 max-w-7xl mx-auto w-full pt-20 flex flex-col gap-8">
    <Reveal y={8}>
      <Link
        href="/#home"
        className="group inline-flex items-center gap-2 w-fit font-mono text-[11px] text-outline hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined text-[14px] transition-transform group-hover:-translate-x-1">
          arrow_back
        </span>
        [RETURN_TO_ROOT]
      </Link>
    </Reveal>

    <Reveal y={12}>
      <div className="flex flex-col gap-2 border-b border-outline-variant/30 pb-6">
        <SectionHeader title="// ./log" icon="article" trail="[BLOG]" />
        <h1 className="font-sans text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
          <span className="text-primary">LOG://</span>STREAM
        </h1>
        <p className="font-mono text-[13px] text-on-surface-variant max-w-2xl">
          &gt; Notes, write-ups, and the occasional rant. Sourced from{" "}
          <span className="text-primary">
            github.com/{GITHUB_OWNER}/{BLOG_REPO}
          </span>
          . Updates within ~10 minutes of a push (or instantly via webhook).
        </p>
      </div>
    </Reveal>

    <Suspense fallback={<BlogListSkeleton count={6} />}>
      <BlogList />
    </Suspense>
  </article>
);

export default BlogIndexPage;
