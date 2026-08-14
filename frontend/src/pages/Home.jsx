import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  getProjects,
  sendContact,
  createProject,
  deleteProject,
} from "../api/api";

import profile from "../assets/profile.png";

import {
  FaGithub,
  FaLinkedin,
  FaArrowUp,
  FaExternalLinkAlt,
} from "react-icons/fa";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Python",
  "Java",
  "Node.js",
  "MongoDB",
  "Express",
  "SQL",
  "Bootstrap",
  "React Native",
  "Android",
];

const Home = () => {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");

  const token = localStorage.getItem("token");

  // =====================================================
  // GET PROJECTS
  // =====================================================

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);

        const data = await getProjects();

        console.log("Projects received:", data);

        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // =====================================================
  // CONTACT FORM
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSendingMessage(true);
    setMessageStatus("");

    try {
      await sendContact(form);

      setMessageStatus(
        "Message sent successfully! Thank you for contacting me. "
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact error:", error);

      setMessageStatus(
        error?.message || "Failed to send message. Please try again."
      );
    } finally {
      setSendingMessage(false);
    }
  };

  // =====================================================
  // ADMIN ADD PROJECT
  // =====================================================

  const handleAddProject = async () => {
    if (!token) {
      alert("Please login as admin.");
      return;
    }

    const newProject = {
      title: "New Project",
      description: "Project Description",
      githubLink: "",
      liveLink: "",
    };

    try {
      const data = await createProject(newProject, token);

      setProjects((prev) => [...prev, data]);

      alert("Project added successfully 🚀");
    } catch (error) {
      console.error("Add project error:", error);

      alert(error?.message || "Failed to add project.");
    }
  };

  // =====================================================
  // ADMIN DELETE PROJECT
  // =====================================================

  const handleDelete = async (id) => {
    if (!token) {
      alert("Please login as admin.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProject(id, token);

      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );

      alert("Project deleted successfully 🗑️");
    } catch (error) {
      console.error("Delete project error:", error);

      alert(error?.message || "Failed to delete project.");
    }
  };

  return (
    <div
      id="home"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white scroll-smooth"
    >

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">

        <div className="flex items-center gap-4 md:gap-7 px-5 md:px-8 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">

          <a
            href="#home"
            className="text-sm md:text-base font-medium hover:text-blue-400 transition"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-sm md:text-base font-medium hover:text-blue-400 transition"
          >
            About
          </a>

          <a
            href="#projects"
            className="text-sm md:text-base font-medium hover:text-blue-400 transition"
          >
            Projects
          </a>

          <a
            href="#skills"
            className="text-sm md:text-base font-medium hover:text-blue-400 transition"
          >
            Skills
          </a>

          <a
            href="#contact"
            className="text-sm md:text-base font-medium hover:text-blue-400 transition"
          >
            Contact
          </a>

        </div>

      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left px-6 pt-32 md:pt-20 gap-16 max-w-7xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="flex-1"
        >

          <p className="text-blue-400 font-semibold tracking-[0.25em] uppercase mb-4">
            Hello, I'm
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            Deepak{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Patel
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6">
            MERN Stack Developer
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
            MCA graduate and passionate Full-Stack Developer focused on
            building modern, scalable, and user-friendly web applications
            using React, Node.js, Express.js, and MongoDB.
          </p>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">

            <a
              href="#projects"
              className="px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg shadow-blue-500/20"
            >
              View My Projects →
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition font-semibold"
            >
              Download Resume
            </a>

          </div>

          {/* SOCIAL LINKS */}

          <div className="flex gap-5 justify-center md:justify-start">

            <a
              href="https://github.com/deepak-patel18"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 hover:text-white text-3xl transition hover:scale-110"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/deepak-patel-63378a21/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-400 text-3xl transition hover:scale-110"
            >
              <FaLinkedin />
            </a>

          </div>

          {/* TECHNOLOGIES */}

          <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">

            {[
              "React",
              "Node.js",
              "Express",
              "MongoDB",
            ].map((tech) => (

              <span
                key={tech}
                className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-gray-300"
              >
                {tech}
              </span>

            ))}

          </div>

        </motion.div>

        {/* PROFILE IMAGE */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="flex-1 flex justify-center items-center"
        >

          <div className="relative flex justify-center items-center">

            <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-blue-500/20 blur-3xl" />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-[320px] h-[320px] md:w-[370px] md:h-[370px] rounded-full border border-blue-500/20 border-dashed"
            />

            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full p-[4px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl">

              <div className="w-full h-full rounded-full overflow-hidden bg-black">

                <img
                  src={profile}
                  alt="Deepak Patel"
                  className="w-full h-full object-cover object-top scale-[1.15]"
                />

              </div>

            </div>

          </div>

        </motion.div>

      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        className="py-24 px-6 md:px-10 bg-black/30"
      >

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">

            <p className="text-blue-400 font-semibold tracking-widest uppercase mb-3">
              Get To Know Me
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              About Me
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
            >

              <h3 className="text-2xl font-semibold mb-5">
                I'm a Full-Stack Developer
              </h3>

              <p className="text-gray-400 leading-relaxed mb-5">
                I'm Deepak Patel, an MCA graduate and passionate software
                developer focused on building modern and user-friendly web
                applications.
              </p>

              <p className="text-gray-400 leading-relaxed mb-5">
                I work primarily with the MERN stack and enjoy developing
                complete applications from frontend interfaces to backend
                APIs and database integration.
              </p>

              <p className="text-gray-400 leading-relaxed">
                I continuously improve my development skills by building
                real-world projects and learning modern technologies.
              </p>

            </motion.div>

            <div className="grid grid-cols-2 gap-5">

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-3xl mb-3">💻</div>

                <h4 className="text-xl font-semibold mb-2">
                  Full-Stack
                </h4>

                <p className="text-gray-400 text-sm">
                  Building complete web applications.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-3xl mb-3">⚛️</div>

                <h4 className="text-xl font-semibold mb-2">
                  React
                </h4>

                <p className="text-gray-400 text-sm">
                  Creating modern user interfaces.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-3xl mb-3">🚀</div>

                <h4 className="text-xl font-semibold mb-2">
                  Node.js
                </h4>

                <p className="text-gray-400 text-sm">
                  Developing backend APIs.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-3xl mb-3">🗄️</div>

                <h4 className="text-xl font-semibold mb-2">
                  MongoDB
                </h4>

                <p className="text-gray-400 text-sm">
                  Working with NoSQL databases.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section
        id="projects"
        className="py-24 px-6 md:px-10"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <p className="text-blue-400 font-semibold tracking-widest uppercase mb-3">
              My Work
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Featured Projects
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Explore my projects, source code and live applications.
            </p>

          </div>

          {/* ADMIN ADD */}

          {token && (

            <div className="text-center mb-10">

              <button
                onClick={handleAddProject}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full transition font-semibold"
              >
                + Add Project
              </button>

            </div>

          )}

          {/* PROJECTS */}

          {loadingProjects ? (

            <div className="text-center text-gray-400">
              Loading projects...
            </div>

          ) : projects.length === 0 ? (

            <div className="text-center text-gray-400">
              No projects available.
            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {projects.map((project, index) => {

                const githubUrl = project.githubLink?.trim();
                const liveUrl = project.liveLink?.trim();

                return (

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
                    whileHover={{
                      y: -8,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="group relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-blue-500/40 transition"
                  >

                    {/* HOVER EFFECT */}

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />

                    <div className="relative">

                      {/* ICON */}

                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400 text-2xl">
                        💻
                      </div>

                      {/* TITLE */}

                      <h3 className="text-2xl font-semibold mb-3">
                        {project.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="text-gray-400 leading-relaxed min-h-[90px]">
                        {project.description}
                      </p>

                      {/* =================================================
                          PROJECT LINKS
                      ================================================= */}

                      <div className="flex flex-wrap gap-3 mt-6">

                        {githubUrl && (

                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition font-medium"
                          >
                            <FaGithub />
                            <span>GitHub</span>
                          </a>

                        )}

                        {liveUrl && (

                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
                          >
                            <FaExternalLinkAlt />
                            <span>Live Demo</span>
                          </a>

                        )}

                      </div>

                      {/* NO LINKS */}

                      {!githubUrl && !liveUrl && (

                        <p className="mt-6 text-sm text-gray-500">
                          Project links will be added soon.
                        </p>

                      )}

                      {/* ADMIN DELETE */}

                      {token && (

                        <button
                          onClick={() => handleDelete(project._id)}
                          className="mt-5 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                        >
                          Delete
                        </button>

                      )}

                    </div>

                  </motion.div>

                );
              })}

            </div>

          )}

        </div>

      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}

      <section
        id="skills"
        className="py-24 px-6 md:px-10 bg-black/40"
      >

        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">

            <p className="text-blue-400 font-semibold tracking-widest uppercase mb-3">
              Technologies
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              My Skills
            </h2>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {skills.map((skill, i) => (

              <motion.div
                key={skill}
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
                  duration: 0.4,
                  delay: i * 0.04,
                }}
                whileHover={{
                  scale: 1.04,
                }}
                className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40"
              >

                <div className="bg-black/70 rounded-2xl p-6 text-center h-full">

                  <h3 className="font-semibold text-gray-200">
                    {skill}
                  </h3>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        className="py-24 px-6 md:px-10"
      >

        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">

            <p className="text-blue-400 font-semibold tracking-widest uppercase mb-3">
              Get In Touch
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Contact Me
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project, job opportunity, or simply want to connect?
              Send me a message and I'll get back to you.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7 md:p-10"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition"
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition"
              />

            </div>

            <textarea
              placeholder="Your Message"
              required
              rows="6"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className="w-full mt-5 p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition resize-none"
            />

            <button
              type="submit"
              disabled={sendingMessage}
              className="w-full mt-5 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition font-semibold"
            >
              {sendingMessage
                ? "Sending..."
                : "Send Message "}
            </button>

            {messageStatus && (

              <p className="mt-5 text-center text-gray-300">
                {messageStatus}
              </p>

            )}

          </form>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="py-12 border-t border-white/10 text-center bg-black/60 backdrop-blur-lg">

        <h3 className="text-2xl font-semibold mb-3">
          Deepak Patel
        </h3>

        <p className="text-gray-400 mb-6">
          Full Stack Developer | React | Node | MongoDB
        </p>

        <div className="flex justify-center gap-6 text-2xl mb-7">

          <a
            href="https://github.com/deepak-patel18"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-white transition hover:scale-110"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/deepak-patel-63378a21/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-blue-400 transition hover:scale-110"
          >
            <FaLinkedin />
          </a>

        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Deepak Patel. All rights reserved.
        </p>

      </footer>

      {/* =====================================================
          BACK TO TOP
      ===================================================== */}

      <a
        href="#home"
        aria-label="Back to top"
        className="fixed bottom-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition"
      >
        <FaArrowUp />
      </a>

    </div>
  );
};

export default Home;