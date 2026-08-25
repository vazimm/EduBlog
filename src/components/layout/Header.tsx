import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type SyntheticEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useDebounce } from "../../hooks/useDebounce";
import type { IDiscipline } from "../../interfaces/IDiscipline";
import type { IPost } from "../../interfaces/IPost";
import { getDisciplinesRequest } from "../../services/catalogService";
import { getPostsRequest } from "../../services/postService";
import type { SearchSuggestion } from "../../types/searchSuggestion";
import { normalizeText, slugifyDisciplineLabel } from "../../utils/discipline";
import { isPublished } from "../../utils/filters";
import UserMenu from "./UserMenu";

export default function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(() => searchParams.get("q") ?? "");
  const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchRef = useRef<HTMLFormElement>(null);

  useClickOutside(searchRef, () => setIsSearchOpen(false));

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

        setPosts(postsResponse.filter(isPublished));
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

  const debouncedSearch = useDebounce(searchValue);
  const normalizedQuery = normalizeText(debouncedSearch.trim());

  const searchSuggestions = useMemo<SearchSuggestion[]>(() => {
    if (!normalizedQuery) return [];

    const postSuggestions = posts
      .filter(
        (post) =>
          normalizeText(post.title).includes(normalizedQuery) ||
          normalizeText(post.summary).includes(normalizedQuery),
      )
      .slice(0, 4)
      .map((post) => ({
        id: `post-${post._id}`,
        label: post.title,
        description: `${post.discipline.label} · ${post.author.name}`,
        to: `/posts/${post._id}`,
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
        to: `/busca?q=${encodeURIComponent(post.author.name)}`,
        kind: "professor" as const,
      }));

    return [...postSuggestions, ...disciplineSuggestions, ...professorSuggestions].slice(0, 7);
  }, [disciplines, normalizedQuery, posts]);

  useEffect(() => {
    if (activeIndex < 0) return;

    const activeSuggestion = searchSuggestions[activeIndex];
    if (!activeSuggestion) return;

    document.getElementById(activeSuggestion.id)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, searchSuggestions]);

  function handleSuggestionSelect(to: string) {
    navigate(to);
    setIsSearchOpen(false);
    setActiveIndex(-1);
  }

  function handleSearch(formEvent: SyntheticEvent<HTMLFormElement>) {
    formEvent.preventDefault();

    const term = searchValue.trim();
    if (!term) return;

    const activeSuggestion = searchSuggestions[activeIndex];
    if (activeSuggestion) {
      handleSuggestionSelect(activeSuggestion.to);
      return;
    }

    navigate(`/busca?q=${encodeURIComponent(term)}`);
    setIsSearchOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(keyEvent: KeyboardEvent<HTMLInputElement>) {
    if (keyEvent.key === "Escape") {
      keyEvent.preventDefault();
      setIsSearchOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (searchSuggestions.length === 0) return;

    if (keyEvent.key === "ArrowDown") {
      keyEvent.preventDefault();
      setIsSearchOpen(true);
      setActiveIndex((current) => (current + 1) % searchSuggestions.length);
      return;
    }

    if (keyEvent.key === "ArrowUp") {
      keyEvent.preventDefault();
      setIsSearchOpen(true);
      setActiveIndex(
        (current) => (current - 1 + searchSuggestions.length) % searchSuggestions.length,
      );
    }
  }

  const isListboxOpen = isSearchOpen && normalizedQuery.length > 0;

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

          <form onSubmit={handleSearch} ref={searchRef} className="relative flex">
            <input
              type="search"
              value={searchValue}
              role="combobox"
              aria-expanded={isListboxOpen}
              aria-controls="search-suggestions"
              aria-activedescendant={
                activeIndex >= 0 ? searchSuggestions[activeIndex]?.id : undefined
              }
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setIsSearchOpen(true);
                setActiveIndex(-1);
              }}
              placeholder="Buscar posts, professores ou disciplinas"
              className="w-full rounded-[10px] border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-700"
            />

            {isListboxOpen && (
              <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
                {searchSuggestions.length > 0 ? (
                  <ul
                    id="search-suggestions"
                    role="listbox"
                    className="max-h-80 overflow-y-auto py-1"
                  >
                    {searchSuggestions.map((suggestion, index) => (
                      <li
                        key={suggestion.id}
                        id={suggestion.id}
                        role="option"
                        aria-selected={index === activeIndex}
                      >
                        <button
                          type="button"
                          onMouseDown={() => handleSuggestionSelect(suggestion.to)}
                          onMouseEnter={() => setActiveIndex(index)}
                          className={`flex w-full cursor-pointer items-center justify-between gap-3 border-l-4 px-4 py-3 text-left transition ${
                            index === activeIndex
                              ? "border-teal-700 bg-teal-50"
                              : "border-transparent hover:bg-slate-50"
                          }`}
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

                <button
                  type="button"
                  onMouseDown={() =>
                    handleSuggestionSelect(`/busca?q=${encodeURIComponent(searchValue.trim())}`)
                  }
                  className="block w-full cursor-pointer truncate border-t border-slate-200 px-4 py-3 text-left text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
                >
                  Ver todos os resultados para "{searchValue.trim()}"
                </button>

                <button
                  type="button"
                  onMouseDown={() => handleSuggestionSelect("/busca")}
                  className="block w-full cursor-pointer border-t border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Ver todos os conteúdos do EduBlog
                </button>
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
          <Link
            to="/busca"
            className="relative px-1 py-1 text-sm font-semibold text-teal-700 transition hover:text-teal-800"
          >
            Todos
          </Link>

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
