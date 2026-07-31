import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <header className="bg-white text-slate-300 px-8 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link
            to="/"
            className="text-xl font-bold text-teal-600 whitespace-nowrap"
          >
            EduBlog
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4 text-black">
            <li>
              <Link to="/" className="hover:text-teal-500">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-teal-500"
                onClick={handleLogout}
              >
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
