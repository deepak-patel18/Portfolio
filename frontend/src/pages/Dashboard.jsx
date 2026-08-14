import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  deleteProject,
} from "../api/api";

import {
  FaGithub,
  FaExternalLinkAlt,
  FaTrash,
  FaHome,
} from "react-icons/fa";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================================
  // GET PROJECTS
  // =====================================================

  const fetchProjects = async () => {
    try {
      const data = await getProjects();

      console.log("Dashboard projects:", data);

      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // ADD PROJECT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login as admin.");
      return;
    }

    try {
      setLoading(true);

      await createProject(form, token);

      alert("Project added successfully ");

      setForm({
        title: "",
        description: "",
        githubLink: "",
        liveLink: "",
      });

      await fetchProjects();
    } catch (error) {
      console.error("Add project error:", error);

      alert(
        error?.message ||
          "Failed to add project. Please check admin authentication."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE PROJECT
  // =====================================================

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

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

      alert("Project deleted successfully ");

      await fetchProjects();
    } catch (error) {
      console.error("Delete project error:", error);

      alert(error?.message || "Failed to delete project.");
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="hidden md:block w-64 bg-black border-r border-white/10 p-6">

        <h1 className="text-2xl font-bold mb-10">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-5">

          <a
            href="/"
            className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition"
          >
            <FaHome />
            Home
          </a>

          <a
            href="/dashboard"
            className="text-blue-400 font-semibold"
          >
            Dashboard
          </a>

          <button
            onClick={handleLogout}
            className="text-left text-gray-300 hover:text-red-400 transition"
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="flex-1 p-6 md:p-10">

        {/* HEADER */}

        <div className="mb-10">

          <h2 className="text-4xl font-bold mb-3">
            Manage Projects
          </h2>

          <p className="text-gray-400">
            Add, manage and remove projects displayed on your portfolio.
          </p>

        </div>

        {/* =====================================================
            ADD PROJECT FORM
        ===================================================== */}

        <div className="max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-7 md:p-8 rounded-3xl mb-16">

          <h3 className="text-2xl font-semibold mb-6">
            Add New Project
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* TITLE */}

            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Event Booking System"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition"
              />

            </div>

            {/* DESCRIPTION */}

            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe your project..."
                value={form.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition resize-none"
              />

            </div>

            {/* GITHUB */}

            <div>

              <label className="block text-sm text-gray-400 mb-2">
                GitHub URL
              </label>

              <input
                type="url"
                name="githubLink"
                placeholder="https://github.com/username/project"
                value={form.githubLink}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition"
              />

            </div>

            {/* LIVE */}

            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Live Project URL
              </label>

              <input
                type="url"
                name="liveLink"
                placeholder="https://your-project.onrender.com"
                value={form.liveLink}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 transition"
              />

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl font-semibold transition"
            >
              {loading
                ? "Adding Project..."
                : "Add Project "}
            </button>

          </form>

        </div>

        {/* =====================================================
            EXISTING PROJECTS
        ===================================================== */}

        <div>

          <h3 className="text-3xl font-bold mb-8">
            Existing Projects
          </h3>

          {projects.length === 0 ? (

            <div className="text-gray-400">
              No projects available.
            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

              {projects.map((project) => {

                const githubUrl = project.githubLink?.trim();
                const liveUrl = project.liveLink?.trim();

                return (

                  <div
                    key={project._id}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl"
                  >

                    {/* ICON */}

                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl mb-5">
                      💻
                    </div>

                    {/* TITLE */}

                    <h4 className="text-xl font-bold mb-3">
                      {project.title}
                    </h4>

                    {/* DESCRIPTION */}

                    <p className="text-gray-400 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* LINKS */}

                    <div className="flex flex-wrap gap-3 mb-6">

                      {githubUrl && (

                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                        >
                          <FaGithub />
                          GitHub
                        </a>

                      )}

                      {liveUrl && (

                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                        >
                          <FaExternalLinkAlt />
                          Live
                        </a>

                      )}

                    </div>

                    {!githubUrl && !liveUrl && (

                      <p className="text-sm text-gray-500 mb-6">
                        No project links added.
                      </p>

                    )}

                    {/* DELETE */}

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

                );
              })}

            </div>

          )}

        </div>

      </main>

    </div>
  );
};

export default Dashboard;