interface Props {
  className?: string;
  /** Render N copies side by side / stacked, useful for grid placeholders. */
  count?: number;
}

const Skeleton = ({ className = "", count = 1 }: Props) => {
  if (count === 1) return <div className={`skeleton ${className}`} />;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${className}`} />
      ))}
    </>
  );
};

export default Skeleton;

const ProjectCardSkeleton = () => (
  <div className="glass-card flex flex-col h-full overflow-hidden rounded">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-6 flex flex-col gap-4 flex-grow">
      <div className="flex justify-between items-start gap-3">
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-6 w-16 rounded" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-4 border-t border-white/5">
        <Skeleton className="h-6 w-14 rounded" />
        <Skeleton className="h-6 w-14 rounded" />
      </div>
      <Skeleton className="h-1 w-full mt-2 rounded-full" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  </div>
);

export const ProjectGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </div>
);

const BlogCardSkeleton = () => (
  <div className="glass-card p-6 flex flex-col gap-3 rounded">
    <div className="flex justify-between items-center">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-16" />
    </div>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

export const BlogListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <BlogCardSkeleton key={i} />
    ))}
  </div>
);
