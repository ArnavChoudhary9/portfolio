import SectionHeader from "@/components/sectionHeader";
import { BlogListSkeleton } from "@/components/skeleton";
import Skeleton from "@/components/skeleton";

const Loading = () => (
  <article className="px-margin-mobile md:px-margin-desktop py-12 max-w-7xl mx-auto w-full pt-20 flex flex-col gap-8">
    <Skeleton className="h-4 w-32" />
    <div className="flex flex-col gap-3 border-b border-outline-variant/30 pb-6">
      <SectionHeader title="// ./log" icon="article" trail="[BLOG]" />
      <Skeleton className="h-12 w-2/3 max-w-md" />
      <Skeleton className="h-4 w-3/4 max-w-xl" />
    </div>
    <BlogListSkeleton count={6} />
  </article>
);

export default Loading;
