import { use } from 'react';
import ProjectDetails from '@/components/projectDetails';
import projectsData from '@/data/projects.json';

const ProjectPage = (
  { params }: {
    params: Promise<{ projectName: string }>
  }) => {
  const { projectName } = use(params);
  const project = projectsData.find((p) => p.name === projectName);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <main className="relative z-[10] flex min-h-screen flex-col items-center justify-between px-4 py-16">
      <ProjectDetails project={project} />
    </main>
  );
};

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    projectName: project.name,
  }));
}

export default ProjectPage;
