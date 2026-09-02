import { Link } from "react-router-dom";
import type { IDiscipline } from "../../interfaces/IDiscipline";
import { slugifyDisciplineLabel } from "../../utils/discipline";

export default function DisciplineNav({
  propsDisciplines,
}: {
  propsDisciplines?: IDiscipline[];
}) {
  if (!propsDisciplines || propsDisciplines.length === 0) {
    return null;
  }

  return (
    <>
      <div className="h-px bg-slate-200" />

      <nav className="bg-white px-8 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
          <Link
            to="/busca"
            className="relative px-1 py-1 text-sm font-semibold text-teal-700 transition hover:text-teal-800"
          >
            Todos
          </Link>

          {propsDisciplines.map((discipline) => (
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
