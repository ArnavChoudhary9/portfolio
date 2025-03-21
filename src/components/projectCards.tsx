import Card from "@/components/card";

import projectsData from '@/data/projects.json'

const ProjectCards = () => {
  return (
    <div id="projects" className="grid gap-6 w-full max-w-5xl sm:grid-cols-3">
      {projectsData.map((project) => (
        <Card
          key={project.name}
          title={project.title}
          description={project.description}
          image={project.imageUrl}
          link={`/projects/${project.name}`}
        />
      ))}
    </div>
  );
}

export default ProjectCards;
