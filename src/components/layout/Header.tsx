import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import type { IPost } from "../../interfaces/IPost";
import { getPostsRequest } from "../../services/postService";
import { isPublished } from "../../utils/filters";
import { useDisciplines } from "../../hooks/useDisciplines";

import DisciplineNav from "./DisciplineNav";
import SearchBar from "./search/SearchBar";
import UserMenu from "./UserMenu";

export default function Header() {
  const location = useLocation();

  const disciplines = useDisciplines();

  const [posts, setPosts] = useState<IPost[]>([]);

  const isTeacherRoute =
    location.pathname === "/professor" ||
    location.pathname.startsWith("/professor/");

  useEffect(() => {
    if (isTeacherRoute) return;

    let ignore = false;

    async function loadPosts() {
      try {
        const response = await getPostsRequest();

        if (ignore) return;

        setPosts(response.filter(isPublished));
      } catch {
        if (ignore) return;

        setPosts([]);
      }
    }

    void loadPosts();

    return () => {
      ignore = true;
    };
  }, [isTeacherRoute]);

  return (
    <>
      <header className="bg-white px-8 py-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 md:grid-cols-[180px_1fr_auto]">
          <h1 className="text-xl font-bold">
            <Link
              to="/"
              className="whitespace-nowrap text-xl font-bold text-teal-700"
            >
              EduBlog
            </Link>
          </h1>

          {isTeacherRoute ? (
            <p className="text-center text-sm font-semibold text-slate-500">
              Área do Professor
            </p>
          ) : (
            <SearchBar disciplines={disciplines} posts={posts} />
          )}

          <nav className="justify-self-end">
            <ul className="flex items-center gap-4 text-black">
              <UserMenu />
            </ul>
          </nav>
        </div>
      </header>

      {!isTeacherRoute && <DisciplineNav disciplines={disciplines} />}
    </>
  );
}
