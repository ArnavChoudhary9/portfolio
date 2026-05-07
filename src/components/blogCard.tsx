import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

const formatDate = (iso: string | null): string => {
  if (!iso) return "DRAFT";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.toUpperCase();
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
};

interface Props {
  index: number;
  post: BlogPostMeta;
}

const BlogCard = ({ index, post }: Props) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group glass-card glow-border-strong rounded p-6 flex flex-col gap-3 h-full transition-transform duration-300 hover:-translate-y-0.5"
  >
    <div className="flex justify-between items-center font-mono text-[11px] text-on-surface-variant border-b border-white/10 pb-2">
      <span>POST_[{index.toString(16).padStart(2, "0").toUpperCase()}]</span>
      <span className="text-outline">{formatDate(post.date)}</span>
    </div>

    <h3 className="font-sans text-xl font-semibold text-on-surface group-hover:text-primary transition-colors leading-tight">
      {post.title}
    </h3>

    {post.summary && (
      <p className="font-mono text-[13px] text-on-surface-variant leading-relaxed line-clamp-3 flex-grow">
        {post.summary}
      </p>
    )}

    {post.tags.length > 0 && (
      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5 mt-auto">
        {post.tags.slice(0, 3).map((t) => (
          <span key={t} className="tech-tag">
            #{t}
          </span>
        ))}
      </div>
    )}

    <span className="font-mono text-[11px] text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
      OPEN_POST
      <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-1">
        arrow_forward
      </span>
    </span>
  </Link>
);

export default BlogCard;
