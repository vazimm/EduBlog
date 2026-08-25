import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import FilterPanel from "../components/filters/FilterPanel";
import PostCollection from "../components/posts/PostCollection";
import ViewToggle from "../components/posts/ViewToggle";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import Pagination from "../components/ui/Pagination";
import { usePostFilters } from "../hooks/usePostFilters";
import type { IDiscipline } from "../interfaces/IDiscipline";
import type { IPost } from "../interfaces/IPost";
import { getDisciplinesRequest } from "../services/catalogService";
import { getPostsRequest, searchPostsRequest } from "../services/postService";
import { findDisciplineBySlug } from "../utils/discipline";
import {
  applyPostFilters,
  buildProfessorOptions,
  buildSearchParams,
  buildSemesterOptions,
  buildSeriesOptions,
  isPublished,
  sortPosts,
} from "../utils/filters";
import { paginate } from "../utils/paginate";

const postsPerPage = 6;

export default function Discipline() {
  const { disciplina } = useParams<{ disciplina: string }>();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("post");

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

  const [catalogPosts, setCatalogPosts] = useState<IPost[]>([]);
  const [disciplines, setDisciplines] = useState<IDiscipline[]>([]);
  const [results, setResults] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (postId) return;

    let ignore = false;

    async function loadCatalogData() {
      try {
        setLoading(true);
        setLoadError("");

        const [postsResponse, disciplinesResponse] = await Promise.all([
          getPostsRequest(),
          getDisciplinesRequest(),
        ]);

        if (ignore) return;

        setCatalogPosts(postsResponse.filter(isPublished));
        setDisciplines(disciplinesResponse.filter((discipline) => discipline.isActive));
      } catch {
        if (ignore) return;
        setLoadError("Não foi possível carregar os conteúdos desta disciplina neste momento.");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadCatalogData();

    return () => {
      ignore = true;
    };
  }, [postId]);

  const discipline = useMemo(
    () => findDisciplineBySlug(disciplines, disciplina),
    [disciplines, disciplina],
  );

  useEffect(() => {
    if (postId || !discipline) return;

    let ignore = false;

    async function loadResults() {
      try {
        setSearching(true);
        setLoadError("");

        const params = buildSearchParams(filters, discipline!.label);
        const postsResponse = await searchPostsRequest(params);

        if (ignore) return;

        setResults(postsResponse.filter(isPublished));
      } catch {
        if (ignore) return;
        setLoadError("Não foi possível carregar os conteúdos desta disciplina neste momento.");
      } finally {
        if (!ignore) {
          setSearching(false);
        }
      }
    }

    void loadResults();

    return () => {
      ignore = true;
    };
  }, [discipline, filters, postId]);

  const disciplinePosts = useMemo(
    () => (discipline ? catalogPosts.filter((post) => post.discipline._id === discipline._id) : []),
    [catalogPosts, discipline],
  );

  const seriesOptions = useMemo(() => buildSeriesOptions(disciplinePosts), [disciplinePosts]);
  const semesterOptions = useMemo(() => buildSemesterOptions(disciplinePosts), [disciplinePosts]);
  const professorOptions = useMemo(() => buildProfessorOptions(disciplinePosts), [disciplinePosts]);

  const filteredPosts = useMemo(
    () => sortPosts(applyPostFilters(results, filters), sortOrder),
    [filters, results, sortOrder],
  );

  const pageResult = useMemo(
    () => paginate(filteredPosts, page, postsPerPage),
    [filteredPosts, page],
  );

  if (postId) return <Navigate to={`/posts/${postId}`} replace />;

  if (loading) {
    return <LoadingState message="Carregando conteúdos da disciplina..." />;
  }

  if (loadError) {
    return <ErrorState title="Conteúdo indisponível" message={loadError} />;
  }

  if (!discipline) {
    return (
      <ErrorState
        title="Disciplina não encontrada"
        message={`Não localizamos nenhuma disciplina para "${disciplina}".`}
        action={
          <Link
            to="/"
            className="rounded-[10px] bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Voltar para a Home
          </Link>
        }
      />
    );
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
              <h1 className="text-2xl font-bold text-slate-900">{discipline.label}</h1>
              <p aria-live="polite" className="mt-1 text-sm text-slate-500">
                {searching
                  ? "Buscando..."
                  : pageResult.total === 1
                    ? "1 post encontrado"
                    : `${pageResult.total} posts encontrados`}
              </p>
            </div>

            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>

          <PostCollection
            posts={pageResult.items}
            viewMode={viewMode}
            hasActiveFilters={activeFilterCount > 0}
            onClearFilters={clearFilters}
          />

          <Pagination
            currentPage={pageResult.currentPage}
            totalPages={pageResult.totalPages}
            onPageChange={setPage}
          />
        </section>
      </div>
    </div>
  );
}
