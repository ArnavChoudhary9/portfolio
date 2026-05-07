import Skeleton from "@/components/skeleton";

const Loading = () => (
  <article className="px-margin-mobile md:px-margin-desktop py-12 max-w-3xl mx-auto w-full pt-20 flex flex-col gap-8">
    <Skeleton className="h-4 w-32" />
    <div className="flex flex-col gap-3 border-b border-outline-variant/30 pb-6">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <div className="glass-card p-6 md:p-10 rounded-lg flex flex-col gap-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-9/12" />
    </div>
  </article>
);

export default Loading;
