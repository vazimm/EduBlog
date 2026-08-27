import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function TeacherMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <li className="flex items-center gap-3 text-sm">
      <span className="font-semibold text-slate-800">{user?.name ?? user?.username}</span>
      <button
        type="button"
        onClick={handleLogout}
        className="font-semibold text-teal-700 transition hover:text-teal-800"
      >
        Sair
      </button>
    </li>
  );
}
