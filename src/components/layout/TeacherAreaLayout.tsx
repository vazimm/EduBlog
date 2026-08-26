import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Footer from "./Footer";

export default function TeacherAreaLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const baseItemClass =
    "block border-l-3 border-transparent px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
      <header className="grid grid-cols-1 items-center gap-3 border-b border-slate-200 bg-white px-6 py-4 md:grid-cols-[180px_1fr_220px]">
        <NavLink to="/" className="text-xl font-bold text-teal-700">
          EduBlog
        </NavLink>

        <p className="text-center text-sm font-semibold text-slate-500">
          Área do Professor
        </p>

        <div className="flex items-center justify-end gap-3 text-sm">
          <span className="font-semibold text-slate-800">{user?.name ?? user?.username}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="font-semibold text-teal-700 transition hover:text-teal-800"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 md:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-white py-6">
          <nav className="flex flex-col">
            <NavLink
              to="/professor/dashboard"
              className={({ isActive }) =>
                `${baseItemClass} ${isActive ? "border-teal-700 bg-teal-50 text-teal-700" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/professor/posts"
              className={({ isActive }) =>
                `${baseItemClass} ${isActive ? "border-teal-700 bg-teal-50 text-teal-700" : ""}`
              }
            >
              Meus Posts
            </NavLink>
            <span className={`${baseItemClass} cursor-not-allowed opacity-50`}>
              Novo Post
            </span>
          </nav>
        </aside>

        <main className="bg-slate-50 p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
