import { NavLink } from "react-router-dom";
import type { DisciplineNavProps } from "../../interfaces/IDiscipline";
import { slugifyDisciplineLabel } from "../../utils/discipline";

export default function DisciplineNav({ disciplines }: DisciplineNavProps) {
  if (disciplines.length === 0) {
    return null;
  }

  return (
    <>
      <div className="h-px bg-slate-200" />

      <nav className="bg-white px-8 py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
          <NavLink
            to="/busca"
            className={({ isActive }) =>
              `relative px-1 py-1 text-sm font-semibold transition ${
                isActive
                  ? "text-teal-700"
                  : "text-slate-700 hover:text-teal-700"
              }`
            }
          >
            Todos
          </NavLink>

          {disciplines.map((discipline) => {
            const disciplineSlug = slugifyDisciplineLabel(discipline.label);

            return (
              <NavLink
                key={discipline._id}
                to={`/conteudo/${disciplineSlug}`}
                className={({ isActive }) =>
                  `relative px-1 py-1 text-sm font-semibold transition ${
                    isActive
                      ? "text-teal-700"
                      : "text-slate-700 hover:text-teal-700"
                  }`
                }
              >
                {discipline.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
