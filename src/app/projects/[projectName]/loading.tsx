import Skeleton from "@/components/skeleton";

const Loading = () => (
  <article className="px-margin-mobile md:px-margin-desktop py-12 max-w-[1200px] mx-auto w-full pt-20 flex flex-col gap-8">
    <Skeleton className="h-4 w-32" />
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-outline-variant/30 pb-6">
      <div className="flex flex-col gap-3 flex-1">
        <Skeleton className="h-12 w-2/3 max-w-md" />
        <Skeleton className="h-3 w-1/2 max-w-xs" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
    <Skeleton className="h-[280px] md:h-[400px] w-full rounded" />
    <div className="flex gap-3">
      <Skeleton className="h-10 w-36 rounded" />
      <Skeleton className="h-10 w-32 rounded" />
    </div>
    <div className="glass-card p-6 md:p-10 rounded-lg flex flex-col gap-4">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-full" />
    </div>
  </article>
);

export default Loading;
