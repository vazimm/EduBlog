import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import type { IPost } from "../interfaces/IPost";
import { getPostByIdRequest } from "../services/postService";
import { formatProfessorName } from "../utils/author";
import { formatDate } from "../utils/date";
import { slugifyDisciplineLabel } from "../utils/discipline";
import { estimateReadingTime } from "../utils/readingTime";

export default function PostView() {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!id) return;

    let ignore = false;

    async function loadPost() {
      try {
        setLoading(true);
        setLoadError("");

        const postResponse = await getPostByIdRequest(id as string);

        if (ignore) return;

        setPost(postResponse);
      } catch {
        if (ignore) return;
        setLoadError("Não foi possível carregar este post. Ele pode ter sido removido.");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadPost();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return <LoadingState message="Carregando post..." />;
  }

  if (loadError || !post) {
    return (
      <ErrorState
        title="Post não encontrado"
        message={loadError || "Não localizamos o post solicitado."}
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

  const disciplineSlug = slugifyDisciplineLabel(post.discipline.label);
  const paragraphs = post.content.split(/\n{2,}/).filter((paragraph) => paragraph.trim().length > 0);

  return (
    <div className="mx-auto w-[min(900px,92%)] py-6">
      <Link
        to={`/conteudo/${disciplineSlug}`}
        className="text-sm font-semibold text-teal-700 transition hover:text-teal-800"
      >
        &larr; Voltar para {post.discipline.label}
      </Link>

      <article className="mt-4 overflow-hidden rounded-[14px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="h-[320px] w-full object-cover" />
        ) : (
          <div className="flex h-[320px] items-center justify-center bg-[linear-gradient(135deg,#ccfbf1,#99f6e4,#e2e8f0)]">
            <span className="text-4xl font-bold tracking-[0.18em] text-slate-700">
              {post.discipline.label.slice(0, 3).toUpperCase()}
            </span>
          </div>
        )}

        <div className="p-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              {post.discipline.label}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {post.series}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {post.semester} semestre
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">{post.title}</h1>

          <p className="mt-2 text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{formatProfessorName(post.author.name)}</span>
            {" | "}
            {formatDate(post.createDate)}
            {" | "}
            {estimateReadingTime(post.summary, post.content)} min de leitura
          </p>

          <p className="mt-6 border-l-4 border-teal-700 bg-slate-50 p-4 text-base leading-7 text-slate-600">
            {post.summary}
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
