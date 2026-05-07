import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projectDetails";
import ErrorState from "@/components/errorState";
import SectionHeader from "@/components/sectionHeader";
import { GITHUB_OWNER, getRepo, getReadme, getPortfolioBanner, getRepos } from "@/lib/github";
import { isHidden, getOverride } from "@/lib/projectOrder";

interface PageProps {
  params: Promise<{ projectName: string }>;
}

const ProjectPage = async ({ params }: PageProps) => {
  const { projectName } = await params;
  if (isHidden(projectName)) notFound();

  const repoResult = await getRepo(projectName);

  if (!repoResult.ok) {
    if (repoResult.reason === "not_found") notFound();
    return (
      <article className="px-margin-mobile md:px-margin-desktop py-12 max-w-[1200px] mx-auto w-full pt-20">
        <SectionHeader title={`src://${projectName}`} icon="folder_open" trail="[FAULT]" />
        <ErrorState
          reason={repoResult.reason}
          resource={`./${projectName}`}
          resetInSeconds={repoResult.resetInSeconds}
          retryHref={`/projects/${projectName}`}
          externalHref={`https://github.com/${GITHUB_OWNER}/${projectName}`}
        />
      </article>
    );
  }

  const [readmeResult, probedBanner] = await Promise.all([
    getReadme(projectName),
    getPortfolioBanner(projectName),
  ]);

  const ovr = getOverride(projectName);
  const banner = probedBanner ?? ovr.banner ?? null;
  const readme = readmeResult.ok ? readmeResult.data : null;

  return <ProjectDetails repo={repoResult.data} readme={readme} banner={banner} />;
};

export const generateStaticParams = async () => {
  const result = await getRepos();
  if (!result.ok) return [];
  return result.data
    .filter((r) => !isHidden(r.name) && !r.archived)
    .map((r) => ({ projectName: r.name }));
};

export const dynamicParams = true;

export default ProjectPage;
