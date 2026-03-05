import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "../api/api";

const Dashboard = () => {

  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    live: "",
  });

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await createProject(form, token);

    setForm({
      title: "",
      description: "",
      github: "",
      live: "",
    });

    fetchProjects();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await deleteProject(id, token);

    fetchProjects();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-black border-r border-white/10 p-6">

        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>

        <nav className="flex flex-col gap-4">

          <a href="/" className="hover:text-blue-400">Home</a>

          <a href="/dashboard" className="hover:text-blue-400">
            Dashboard
          </a>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="text-left hover:text-red-400"
          >
            Logout
          </button>

        </nav>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        <h2 className="text-4xl font-bold mb-10">
          Manage Projects
        </h2>

        {/* ADD PROJECT */}
        <div className="max-w-xl backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl mb-16">

          <h3 className="text-2xl mb-6">Add Project</h3>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
              required
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
              required
            />

            <input
              type="text"
              placeholder="GitHub Link"
              value={form.github}
              onChange={(e) =>
                setForm({ ...form, github: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
            />

            <input
              type="text"
              placeholder="Live Project Link"
              value={form.live}
              onChange={(e) =>
                setForm({ ...form, live: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
            />

            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
              Add Project
            </button>

          </form>

        </div>

        {/* PROJECT LIST */}
        <div className="grid md:grid-cols-3 gap-8">

          {projects.map((p) => (
            <div
              key={p._id}
              className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl"
            >

              <h3 className="text-xl font-bold mb-3">
                {p.title}
              </h3>

              <p className="text-gray-300 mb-4">
                {p.description}
              </p>

              <div className="flex gap-3 mb-4">

                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    className="text-blue-400"
                  >
                    GitHub
                  </a>
                )}

                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    className="text-green-400"
                  >
                    Live
                  </a>
                )}

              </div>

              <button
                onClick={() => handleDelete(p._id)}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;