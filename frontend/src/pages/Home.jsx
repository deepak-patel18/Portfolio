import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { getProjects, sendContact } from "../api/api";
import profile from "../assets/profile.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const skills = [
  "HTML","CSS","JavaScript","React","Python","Java",
  "Node.js","MongoDB","Express","TailwindCSS",
  "SQL","Bootstrap","React Native","Android Developer",
];

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendContact(form);
    alert("Message sent successfully 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  // ================= ADMIN ADD PROJECT =================
  const handleAddProject = async () => {
    const newProject = {
      title: "New Project",
      description: "Project Description",
    };

    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProject),
    });

    const data = await res.json();
    setProjects([...projects, data]);
  };

  // ================= ADMIN DELETE =================
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProjects(projects.filter((p) => p._id !== id));
  };

  return (
    <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white scroll-smooth">

      {/* ================= PARTICLES ================= */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-10"
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.5 },
          },
        }}
      />

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 backdrop-blur-lg bg-white/10 border border-white/20 px-10 py-3 rounded-full flex gap-8 z-50">
        <a href="#projects" className="hover:text-blue-400">Projects</a>
        <a href="#skills" className="hover:text-blue-400">Skills</a>
        <a href="#contact" className="hover:text-blue-400">Contact</a>
      </nav>

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left px-6 gap-16">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-blue-500">Deepak Patel</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-xl">
            Full-Stack Developer with a passion for building modern, scalable, and user-friendly web applications. Experienced in React, Node.js, MongoDB, and modern frontend technologies, with a strong focus on clean code and performance.
          </p>
        </div>

        <div className="p-[2px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-4 shadow-2xl">
            <img
              src={profile}
              alt="Deepak Patel"
              className="w-72 h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="py-20 px-10">
        <h2 className="text-4xl font-bold mb-10 text-center">Projects</h2>

        {/* ADMIN ADD BUTTON */}
        {token && (
          <div className="text-center mb-8">
            <button
              onClick={handleAddProject}
              className="px-6 py-2 bg-green-600 rounded-full"
            >
              + Add Project
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.05 }}
              className="relative backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-semibold mb-3">
                {project.title}
              </h3>

              <p className="text-gray-300 line-clamp-3">
                {project.description}
              </p>

              {/* ADMIN DELETE BUTTON */}
              {token && (
                <button
                  onClick={() => handleDelete(project._id)}
                  className="mt-4 px-4 py-1 bg-red-600 rounded"
                >
                  Delete
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="py-20 px-10 bg-black/40">
        <h2 className="text-4xl font-bold mb-10 text-center">Skills</h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient"
            >
              <div className="backdrop-blur-lg bg-black/70 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold">{skill}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-20 px-10 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20"
          />
          <textarea
            placeholder="Message"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20"
          />
          <button className="px-8 py-3 bg-blue-600 rounded-full">
            Send Message
          </button>
        </form>
      </section>

      {/* ================= FOOTER ================= */}
<footer className="py-12 mt-20 border-t border-white/10 text-center bg-black/60 backdrop-blur-lg">

  <h3 className="text-2xl font-semibold mb-4">Deepak Patel</h3>

  <p className="text-gray-400 mb-6">
    Full Stack Developer | React | Node | MongoDB
  </p>

  {/* SOCIAL LINKS */}
  <div className="flex justify-center gap-6 text-2xl mb-6">

    <a
      href="https://github.com/deepak-patel18"
      target="_blank"
      rel="noreferrer"
      className="hover:text-blue-500 transition"
    >
      <FaGithub />
    </a>

    <a
      href="https://www.linkedin.com/in/deepak-patel-63378a21b/"
      target="_blank"
      rel="noreferrer"
      className="hover:text-blue-500 transition"
    >
      <FaLinkedin />
    </a>

  </div>

  <p className="text-gray-500 text-sm">
    © {new Date().getFullYear()} Deepak Patel. All rights reserved.
  </p>

</footer>
    </div>
  );
};

export default Home;