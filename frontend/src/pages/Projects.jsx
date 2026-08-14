import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import API from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-14">
            <p className="text-blue-400 font-semibold tracking-widest uppercase mb-3">
              My Work
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              My Projects
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto mt-4">
              Here are some of the projects I have built using modern
              web development technologies.
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center text-gray-400 py-20">
              Loading projects...
            </div>
          )}

          {/* EMPTY */}
          {!loading && projects.length === 0 && (
            <div className="text-center text-gray-400 py-20">
              No projects available yet.
            </div>
          )}

          {/* PROJECTS */}
          {!loading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:border-blue-500/40 transition-all"
                >

                  {/* GLOW */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  <div className="relative">

                    {/* ICON */}
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl mb-6">
                      💻
                    </div>

                    {/* TITLE */}
                    <h2 className="text-2xl font-bold mb-4">
                      {project.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-gray-400 leading-relaxed min-h-[100px]">
                      {project.description}
                    </p>

                    {/* LINKS */}
                    <div className="flex flex-wrap gap-3 mt-7">

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition"
                        >
                          <FaGithub />
                          GitHub
                        </a>
                      )}

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                        >
                          <FaExternalLinkAlt />
                          Live Demo
                        </a>
                      )}

                    </div>

                  </div>

                </motion.div>
              ))}

            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default Projects;