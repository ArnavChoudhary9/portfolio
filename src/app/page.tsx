import { Suspense } from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import CoreObsessions from "@/components/coreObsessions";
import ProjectCards from "@/components/projectCards";
import BlogPreview from "@/components/blogPreview";
import SectionHeader from "@/components/sectionHeader";
import { ProjectGridSkeleton, BlogListSkeleton } from "@/components/skeleton";

const ProjectsFallback = () => (
  <section
    id="projects"
    className="relative z-10 px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto w-full"
  >
    <SectionHeader title="// ./src/projects" icon="folder_open" trail="[REGISTRY]" />
    <div className="mb-8 flex flex-col gap-2">
      <h2 className="font-sans text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
        PROJECT_REGISTRY
      </h2>
      <p className="font-mono text-[13px] text-on-surface-variant max-w-2xl">
        &gt; Pulling repos from GitHub...
      </p>
    </div>
    <ProjectGridSkeleton count={6} />
  </section>
);

const BlogFallback = () => (
  <section
    id="log"
    className="relative z-10 px-margin-mobile md:px-margin-desktop py-16 max-w-7xl mx-auto w-full"
  >
    <SectionHeader title="// ./log" icon="article" trail="[BLOG]" />
    <div className="mb-8">
      <h2 className="font-sans text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
        LOG_STREAM
      </h2>
      <p className="font-mono text-[13px] text-on-surface-variant mt-2">
        &gt; Loading recent posts...
      </p>
    </div>
    <BlogListSkeleton count={3} />
  </section>
);

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<ProjectsFallback />}>
        <ProjectCards />
      </Suspense>
      <Suspense fallback={<BlogFallback />}>
        <BlogPreview />
      </Suspense>
      <CoreObsessions />
    </>
  );
}
