import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import type { IDiscipline } from "../../interfaces/IDiscipline";
import type { IPost } from "../../interfaces/IPost";
import { getDisciplinesRequest } from "../../services/catalogService";
import { getPostsRequest } from "../../services/postService";
import type { SearchSuggestion } from "../../types/searchSuggestion";
import { normalizeText, slugifyDisciplineLabel } from "../../utils/discipline";
import UserMenu from "./UserMenu";

export default function Header() {
  const navigate = useNavigate();
  const { showError } = useToast();

  const [searchValue, setSearchValue] = useState("");
  const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadHeaderData() {
      try {
        const [disciplinesResponse, postsResponse] = await Promise.all([
          getDisciplinesRequest(),
          getPostsRequest(),
        ]);

        if (ignore) return;

        setDisciplines(
          disciplinesResponse
            .filter((discipline) => discipline.isActive)
            .sort((left, right) => left.order - right.order),
        );

        setPosts(
          postsResponse.filter(
            (post) => normalizeText(post.status.label) === normalizeText("Publicado"),
          ),
        );
      } catch {
        if (ignore) return;
        setDisciplines([]);
        setPosts([]);
      }
    }

    void loadHeaderData();

    return () => {
      ignore = true;
    };
  }, []);

  const normalizedQuery = normalizeText(searchValue.trim());

  const searchSuggestions = useMemo<SearchSuggestion[]>(() => {
    if (!normalizedQuery) return [];

    const postSuggestions = posts
      .filter((post) => normalizeText(post.title).includes(normalizedQuery))
      .slice(0, 4)
      .map((post) => ({
        id: `post-${post._id}`,
        label: post.title,
        description: `${post.discipline.label} · ${post.author.name}`,
        to: `/conteudo/${slugifyDisciplineLabel(post.discipline.label)}?post=${post._id}`,
        kind: "post" as const,
      }));

    const disciplineSuggestions = disciplines
      .filter((discipline) => normalizeText(discipline.label).includes(normalizedQuery))
      .slice(0, 3)
      .map((discipline) => ({
        id: `discipline-${discipline._id}`,
        label: discipline.label,
        description: "Disciplina",
        to: `/conteudo/${slugifyDisciplineLabel(discipline.label)}`,
        kind: "disciplina" as const,
      }));

    const professorSuggestions = Array.from(
      new Map(
        posts
          .filter((post) => normalizeText(post.author.name).includes(normalizedQuery))
          .map((post) => [post.author.name, post]),
      ).values(),
    )
      .slice(0, 2)
      .map((post) => ({
        id: `professor-${post.author.name}`,
        label: post.author.name,
        description: `Professor · ${post.discipline.label}`,
        to: `/conteudo/${slugifyDisciplineLabel(post.discipline.label)}?post=${post._id}`,
        kind: "professor" as const,
      }));

    return [...postSuggestions, ...disciplineSuggestions, ...professorSuggestions].slice(0, 7);
  }, [disciplines, normalizedQuery, posts]);

  function handleSuggestionSelect(to: string) {
    navigate(to);
    setIsSearchOpen(false);
  }

  function handleSearch(formEvent: SyntheticEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    if (!normalizedQuery) return;

    const firstMatch = searchSuggestions[0];
    if (firstMatch) {
      handleSuggestionSelect(firstMatch.to);
      return;
    }

    showError("Nenhum resultado encontrado para a busca.");
  }

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

          <form onSubmit={handleSearch} className="relative flex">
            <input
              type="search"
              value={searchValue}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => {
                window.setTimeout(() => {
                  setIsSearchOpen(false);
                }, 120);
              }}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder="Buscar posts, professores ou disciplinas"
              className="w-full rounded-[10px] border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-700"
            />

            {isSearchOpen && normalizedQuery && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
                {searchSuggestions.length > 0 ? (
                  <ul className="max-h-80 overflow-y-auto py-1">
                    {searchSuggestions.map((suggestion) => (
                      <li key={suggestion.id}>
                        <button
                          type="button"
                          onMouseDown={() => handleSuggestionSelect(suggestion.to)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{suggestion.label}</p>
                            <p className="text-xs text-slate-500">{suggestion.description}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                            {suggestion.kind}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-3 text-sm text-slate-500">Nenhum resultado para essa busca.</p>
                )}
              </div>
            )}
          </form>

          <nav className="justify-self-end">
            <ul className="flex items-center gap-4 text-black">
              <UserMenu />
            </ul>
          </nav>
        </div>
      </header>

      <div className="h-px bg-slate-200" />

      <nav className="bg-white px-8 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
          {disciplines.map((discipline) => (
            <Link
              key={discipline._id}
              to={`/conteudo/${slugifyDisciplineLabel(discipline.label)}`}
              className="relative px-1 py-1 text-sm font-semibold text-slate-700 transition hover:text-teal-700"
            >
              {discipline.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
