interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    technologies: string[];
    // imageUrl: string;
    // githubUrl: string;
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      {/* <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-6" /> */}
      <p className="text-lg mb-4">{project.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Technologies Used:</h2>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <li key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{tech}</li>
          ))}
        </ul>
      </div>
      {/* <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        View on GitHub
      </a> */}
    </div>
  );
};

export default ProjectDetails;
