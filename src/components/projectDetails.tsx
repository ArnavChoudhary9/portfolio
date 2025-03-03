import Image from "next/image";

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl: string;
  };
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className="m-4 w-full rounded-lg border bg-neutral-900/50">
      <div className="relative z-[100] w-full h-[250px] overflow-hidden">
        <Image
          className="rounded-t-lg object-cover items-center"
          fill
          src={project.imageUrl}
          alt={project.title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="flex flex-col mx-8 p-6">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Technologies Used:</h2>
          <ul className="flex flex-wrap gap-2 transition-transform">
            {project.technologies.map((tech, index) => (
              <li key={index} className="border px-3 py-1 rounded-full text-sm hover:scale-105 hover:bg-gray-900 duration-300">{tech}</li>
            ))}
          </ul>
        </div>
        <p className="text-lg mb-4">{project.description}</p>
        {/* <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          View on GitHub
        </a> */}
      </div>
    </div>
  );
};

export default ProjectDetails;
