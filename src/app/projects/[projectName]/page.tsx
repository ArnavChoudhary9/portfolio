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
    <div className="relative z-[10] flex items-center justify-between px-4 py-16">
      <ProjectDetails project={project} />
    </div>
  );
};

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    projectName: project.name,
  }));
}

export default ProjectPage;
