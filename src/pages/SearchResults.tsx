import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FilterPanel from "../components/filters/FilterPanel";
import PostCollection from "../components/posts/PostCollection";
import ViewToggle from "../components/posts/ViewToggle";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import Pagination from "../components/ui/Pagination";
import { usePostFilters } from "../hooks/usePostFilters";
import type { IPost } from "../interfaces/IPost";
import { getPostsRequest } from "../services/postService";
import {
  applyPostFilters,
  buildProfessorOptions,
  buildSemesterOptions,
  buildSeriesOptions,
  isPublished,
  sortPosts,
} from "../utils/filters";
import { paginate } from "../utils/paginate";

const postsPerPage = 6;

export default function SearchResults() {
  const {
    filters,
    sortOrder,
    viewMode,
    page,
    activeFilterCount,
    toggleSeries,
    toggleSemester,
    setProfessor,
    setViewMode,
    setPage,
    clearFilters,
  } = usePostFilters();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadSearchData() {
      try {
        setLoading(true);
        setLoadError("");

        const postsResponse = await getPostsRequest();

        if (ignore) return;

        setPosts(postsResponse.filter(isPublished));
      } catch {
        if (ignore) return;
        setLoadError("Não foi possível carregar os resultados da busca neste momento.");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadSearchData();

    return () => {
      ignore = true;
    };
  }, []);

  const seriesOptions = useMemo(() => buildSeriesOptions(posts), [posts]);
  const semesterOptions = useMemo(() => buildSemesterOptions(posts), [posts]);
  const professorOptions = useMemo(() => buildProfessorOptions(posts), [posts]);

  const filteredPosts = useMemo(
    () => sortPosts(applyPostFilters(posts, filters), sortOrder),
    [filters, posts, sortOrder],
  );

  const pageResult = useMemo(
    () => paginate(filteredPosts, page, postsPerPage),
    [filteredPosts, page],
  );

  if (loading) {
    return <LoadingState message="Buscando conteúdos..." />;
  }

  if (loadError) {
    return <ErrorState title="Busca indisponível" message={loadError} />;
  }

  return (
    <div className="mx-auto w-[min(1200px,92%)] py-6">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel
          filters={filters}
          seriesOptions={seriesOptions}
          semesterOptions={semesterOptions}
          professorOptions={professorOptions}
          activeFilterCount={activeFilterCount}
          onToggleSeries={toggleSeries}
          onToggleSemester={toggleSemester}
          onProfessorChange={setProfessor}
          onClearFilters={clearFilters}
        />

        <section className="rounded-[14px] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {filters.search ? `Resultados para "${filters.search}"` : "Todos os conteúdos"}
              </h1>
              <p aria-live="polite" className="mt-1 text-sm text-slate-500">
                {pageResult.total === 1
                  ? "1 post encontrado"
                  : `${pageResult.total} posts encontrados`}
              </p>
            </div>

            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>

          {posts.length === 0 ? (
            <EmptyState
              title="Nenhum conteúdo disponível"
              message="Ainda não há posts publicados para buscar."
            />
          ) : (
            <PostCollection
              posts={pageResult.items}
              viewMode={viewMode}
              hasActiveFilters={activeFilterCount > 0}
              emptyTitle="Nenhum resultado encontrado"
              emptyMessage={`Não encontramos nada para "${filters.search}". Tente outras palavras ou navegue pelas disciplinas no menu acima.`}
              onClearFilters={clearFilters}
            />
          )}

          <Pagination
            currentPage={pageResult.currentPage}
            totalPages={pageResult.totalPages}
            onPageChange={setPage}
          />

          <Link
            to="/"
            className="mt-6 inline-flex text-sm font-semibold text-teal-700 transition hover:text-teal-800"
          >
            &larr; Voltar para a Home
          </Link>
        </section>
      </div>
    </div>
  );
}
