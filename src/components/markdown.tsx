import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { rawUrl, blobUrl, GITHUB_OWNER } from "@/lib/github";

const isAbsolute = (url: string) =>
  /^(https?:|mailto:|tel:|data:|#)/i.test(url);

const resolveUrl = (
  url: string,
  repo: string,
  branch: string,
  asImage: boolean
): string => {
  if (!url) return url;
  if (isAbsolute(url)) {
    if (url.startsWith(`https://github.com/${GITHUB_OWNER}/${repo}/blob/`)) {
      return url
        .replace(`/blob/`, `/raw/`);
    }
    return url;
  }
  const clean = url.replace(/^\.\//, "");
  return asImage ? rawUrl(repo, clean, branch) : blobUrl(repo, clean, branch);
};

interface Props {
  markdown: string;
  repo: string;
  branch?: string;
}

const Markdown = ({ markdown, repo, branch = "HEAD" }: Props) => (
  <div className="prose-engine max-w-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      urlTransform={(url) => url}
      components={{
        a: ({ href, children, ...rest }) => {
          const resolved = resolveUrl(href ?? "", repo, branch, false);
          const external = isAbsolute(resolved) && !resolved.startsWith("#");
          return (
            <a
              href={resolved}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              {...rest}
            >
              {children}
            </a>
          );
        },
        img: ({ src, alt, ...rest }) => {
          const resolved =
            typeof src === "string" ? resolveUrl(src, repo, branch, true) : src;
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={resolved as string} alt={alt ?? ""} loading="lazy" {...rest} />;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  </div>
);

export default Markdown;
