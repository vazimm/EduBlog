import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

export default function Header() {
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
            <UserMenu />
          </ul>
        </nav>
      </div>
    </header>
  );
}
