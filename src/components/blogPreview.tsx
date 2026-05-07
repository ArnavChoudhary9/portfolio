import Link from "next/link";
import { GITHUB_OWNER, BLOG_REPO } from "@/lib/github";
import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/blogCard";
import SectionHeader from "@/components/sectionHeader";
import Reveal from "@/components/reveal";
import ErrorState from "@/components/errorState";

const BlogPreview = async () => {
  const result = await getBlogPosts();

  return (
    <section
      id="log"
      className="relative z-10 px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto w-full"
    >
      <Reveal>
        <SectionHeader title="// ./log" icon="article" trail="[BLOG]" />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
              LOG_STREAM
            </h2>
            <p className="font-mono text-[13px] text-on-surface-variant mt-2 max-w-2xl">
              &gt; Notes, write-ups, and the occasional rant. Sourced from{" "}
              <span className="text-primary">github.com/{GITHUB_OWNER}/{BLOG_REPO}</span>.
            </p>
          </div>
          <Link href="/blog" className="btn-ghost group">
            ALL_POSTS
            <span className="material-symbols-outlined text-base leading-none transition-transform group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </Link>
        </div>
      </Reveal>

      {!result.ok ? (
        result.reason === "not_found" ? (
          <Reveal delay={0.1}>
            <div className="glass-card p-8 text-center font-mono text-[13px] text-on-surface-variant flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-outline">edit_note</span>
              <span>The blog repo isn&apos;t set up yet.</span>
              <span className="text-outline">
                Create <span className="text-primary">github.com/{GITHUB_OWNER}/{BLOG_REPO}</span>{" "}
                with .md files in the root and they&apos;ll show up here.
              </span>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <ErrorState
              reason={result.reason}
              resource="blog posts"
              resetInSeconds={result.resetInSeconds}
              retryHref="/#log"
              externalHref={`https://github.com/${GITHUB_OWNER}/${BLOG_REPO}`}
            />
          </Reveal>
        )
      ) : result.data.length === 0 ? (
        <Reveal delay={0.1}>
          <div className="glass-card p-8 text-center font-mono text-[13px] text-on-surface-variant">
            No posts published yet. Check back soon.
          </div>
        </Reveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.data.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <BlogCard index={i + 1} post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogPreview;
