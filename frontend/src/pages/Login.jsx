import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(form);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-10 rounded-2xl w-[380px]">

        <h2 className="text-3xl font-bold text-center mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />

          <button className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;