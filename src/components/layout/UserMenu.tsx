import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setOpen(false));

  function handleLogout() {
    setOpen(false);
    logout();
    navigate("/login");
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border border-slate-300 px-4 py-1.5 text-sm hover:bg-slate-50 cursor-pointer"
      >
        {user?.name}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-100 bg-white p-2 shadow-lg">
          <Link
            to="/perfil"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Perfil
          </Link>
          <Link
            to="/favoritos"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Favoritos
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
