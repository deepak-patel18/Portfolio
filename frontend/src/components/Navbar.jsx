import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-black text-white px-10 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">Portfolio</h1>

      <div className="space-x-6">

        <Link to="/">Home</Link>

        {!token && <Link to="/login">Admin</Link>}

        {token && <Link to="/dashboard">Dashboard</Link>}

        {token && (
          <button onClick={logout} className="text-red-400">
            Logout
          </button>
        )}

      </div>

    </nav>
  );
};

export default Navbar;