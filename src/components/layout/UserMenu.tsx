import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useLocation } from "react-router-dom";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setOpen(false));

  function handleLogout() {
    setOpen(false);
    logout();
    navigate("/login");
  }
  
  const isTeacherRoute = location.pathname === "/professor" || location.pathname.startsWith("/professor/");
  const isHomeRoute = location.pathname === "/";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
      >
        {user?.name ?? user?.username}
      </button>

      {open && (
        <div className="absolute right-0 top-[115%] z-20 w-[170px] overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
          {!isHomeRoute && (
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 hover:bg-teal-50"
            >
              Retornar a home
            </Link>
          )}
          {(user?.role === "PROFESSOR" || user?.role === "ADM") && !isTeacherRoute && (
            <Link
              to="/professor/dashboard"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 hover:bg-teal-50"
            >
              Painel do Professor
            </Link>
          )}
          {user?.role !== "ADM" && (
            <Link
              to="/perfil"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-slate-700 hover:bg-teal-50"
            >
            Perfil
            </Link>
          )}
          {user?.role === "ALUNO" && (
            <Link
            to="/favoritos"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-teal-50"
            >
              Favoritos
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="block w-full cursor-pointer px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
