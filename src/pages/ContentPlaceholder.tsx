import { Link } from "react-router-dom";
import type { IContentPlaceholderProps } from "../interfaces/IUiState";

export default function ContentPlaceholder({ title }: IContentPlaceholderProps) {
  return (
    <div className="mx-auto w-[min(1200px,92%)] py-10">
      <section className="rounded-[14px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Esta seção ainda não foi implementado.
        </p>

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
