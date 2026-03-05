import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow-lg p-5 rounded-lg"
          >
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
            <a
              href={project.link}
              className="text-blue-500"
              target="_blank"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Projects;