import { Link, useParams, useSearchParams } from "react-router-dom";

export default function ContentPlaceholder() {
  const { disciplina } = useParams<{ disciplina: string }>();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("post");
  const isPostRoute = Boolean(postId);

  return (
    <div className="mx-auto w-[min(1200px,92%)] py-10">
      <section className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <h1 className="text-2xl font-bold text-slate-900">
          {isPostRoute ? "Leitura do post" : "Conteúdo por disciplina"}
        </h1>

        {isPostRoute ? (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Esta rota recebeu a disciplina <strong>{disciplina}</strong> e o post <strong>{postId}</strong>.
            A página de leitura do post ainda não foi implementada.
          </p>
        ) : (
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A rota da disciplina já está preparada. A listagem filtrada será conectada depois para <strong>{disciplina}</strong>.
          </p>
        )}

        <Link
          to="/"
          className="mt-6 inline-flex rounded-[10px] bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Voltar para a Home
        </Link>
      </section>
    </div>
  );
}