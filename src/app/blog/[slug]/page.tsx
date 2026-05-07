import Link from "next/link";
import { notFound } from "next/navigation";
import { GITHUB_OWNER, BLOG_REPO } from "@/lib/github";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import Markdown from "@/components/markdown";
import Reveal from "@/components/reveal";
import ErrorState from "@/components/errorState";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const formatDate = (iso: string | null): string => {
  if (!iso) return "DRAFT";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.toUpperCase();
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    .toUpperCase();
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params;
  const result = await getBlogPost(slug);
  if (!result.ok) return { title: "Post not found" };
  return {
    title: `${result.data.title} :: LOG_STREAM`,
    description: result.data.summary ?? undefined,
  };
};

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const result = await getBlogPost(slug);

  if (!result.ok) {
    if (result.reason === "not_found") notFound();
    return (
      <article className="px-margin-mobile md:px-margin-desktop py-12 max-w-3xl mx-auto w-full pt-20">
        <ErrorState
          reason={result.reason}
          resource={`./${slug}`}
          resetInSeconds={result.resetInSeconds}
          retryHref={`/blog/${slug}`}
          externalHref={`https://github.com/${GITHUB_OWNER}/${BLOG_REPO}`}
        />
      </article>
    );
  }

  const post = result.data;

  return (
    <article className="px-margin-mobile md:px-margin-desktop py-12 max-w-3xl mx-auto w-full pt-20 flex flex-col gap-8">
      <Reveal y={8}>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 w-fit font-mono text-[11px] text-outline hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[14px] transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          [RETURN_TO_LOG]
        </Link>
      </Reveal>

      <Reveal y={12}>
        <header className="flex flex-col gap-3 border-b border-outline-variant/30 pb-6">
          <span className="font-mono text-[11px] text-primary tracking-widest">
            POST :: {formatDate(post.date)}
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
            {post.title}
          </h1>
          {post.summary && (
            <p className="font-sans text-base text-on-surface-variant leading-relaxed max-w-2xl">
              {post.summary}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((t) => (
                <span key={t} className="tech-tag">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </header>
      </Reveal>

      <Reveal delay={0.1} y={20}>
        <section className="glass-card p-6 md:p-10 rounded-lg">
          <Markdown markdown={post.markdown} repo={BLOG_REPO} />
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <footer className="flex justify-between items-center pt-6 border-t border-outline-variant/30 font-mono text-[11px] text-on-surface-variant">
          <Link
            href={`https://github.com/${GITHUB_OWNER}/${BLOG_REPO}/blob/HEAD/${post.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            EDIT_ON_GITHUB
          </Link>
          <Link href="/blog" className="hover:text-primary transition-colors">
            [BACK_TO_INDEX]
          </Link>
        </footer>
      </Reveal>
    </article>
  );
};

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  if (!posts.ok) return [];
  return posts.data.map((p) => ({ slug: p.slug }));
};

export const dynamicParams = true;

export default BlogPostPage;
