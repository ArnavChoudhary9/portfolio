import Link from "next/link";

export type FetchErrorReason = "rate_limited" | "not_found" | "network" | "unknown";

interface Props {
  reason: FetchErrorReason;
  resource: string;
  resetInSeconds?: number;
  retryHref?: string;
  externalHref?: string;
}

const formatReset = (seconds?: number) => {
  if (!seconds || seconds <= 0) return null;
  const m = Math.ceil(seconds / 60);
  return m === 1 ? "1 minute" : `${m} minutes`;
};

const ErrorState = ({
  reason,
  resource,
  resetInSeconds,
  retryHref,
  externalHref,
}: Props) => {
  const config = {
    rate_limited: {
      icon: "schedule",
      tone: "tertiary" as const,
      title: "RATE_LIMIT_HIT",
      body: (() => {
        const t = formatReset(resetInSeconds);
        return t
          ? `GitHub rate limit reached fetching ${resource}. Resets in ~${t}.`
          : `GitHub rate limit reached fetching ${resource}. Set GITHUB_TOKEN to lift the cap.`;
      })(),
    },
    not_found: {
      icon: "search_off",
      tone: "outline" as const,
      title: "404_NOT_FOUND",
      body: `Couldn't find ${resource}. It may have been renamed, deleted, or made private.`,
    },
    network: {
      icon: "cloud_off",
      tone: "error" as const,
      title: "NETWORK_FAULT",
      body: `Couldn't reach GitHub to load ${resource}. Check your connection and retry.`,
    },
    unknown: {
      icon: "error",
      tone: "error" as const,
      title: "UNHANDLED_FAULT",
      body: `Something went wrong loading ${resource}.`,
    },
  }[reason];

  const toneClass =
    config.tone === "error"
      ? "text-error border-error/30"
      : config.tone === "tertiary"
      ? "text-tertiary border-tertiary/30"
      : "text-outline border-outline/30";

  return (
    <div
      role="status"
      className={`glass-card p-8 flex flex-col items-center gap-3 text-center border-l-2 ${toneClass}`}
    >
      <span className={`material-symbols-outlined text-4xl ${toneClass.split(" ")[0]}`}>
        {config.icon}
      </span>
      <span className={`font-mono text-[11px] tracking-widest ${toneClass.split(" ")[0]}`}>
        {config.title}
      </span>
      <p className="font-mono text-[13px] text-on-surface-variant max-w-md">
        {config.body}
      </p>
      <div className="flex gap-3 mt-2">
        {retryHref && (
          <Link href={retryHref} className="btn-ghost">
            <span className="material-symbols-outlined text-base leading-none">refresh</span>
            RETRY
          </Link>
        )}
        {externalHref && (
          <Link
            href={externalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <span className="material-symbols-outlined text-base leading-none">open_in_new</span>
            VIEW_ON_GITHUB
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
