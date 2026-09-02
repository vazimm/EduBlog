import type { IFilterPanelProps } from "../../interfaces/IPostFilters";
import FilterCheckboxGroup from "./FilterCheckboxGroup";

export default function FilterPanel({
  filters,
  seriesOptions,
  semesterOptions,
  professorOptions,
  activeFilterCount,
  onToggleSeries,
  onToggleSemester,
  onProfessorChange,
  onClearFilters,
}: IFilterPanelProps) {
  return (
    <aside className="h-fit rounded-[14px] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <h2 className="text-lg font-bold text-slate-900">Filtros</h2>

      <FilterCheckboxGroup
        legend="Série"
        options={seriesOptions}
        selected={filters.series}
        onToggle={onToggleSeries}
      />

      <FilterCheckboxGroup
        legend="Semestre"
        options={semesterOptions}
        selected={filters.semesters}
        onToggle={onToggleSemester}
      />

      {professorOptions.length > 0 && (
        <fieldset className="mt-5">
          <legend className="text-sm font-bold text-slate-900">
            Professor
          </legend>

          <select
            value={filters.professor}
            onChange={(e) => onProfessorChange(e.target.value)}
            className="mt-2 w-full cursor-pointer rounded-[10px] border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition [color-scheme:light] focus:border-teal-700"
          >
            <option value="">Todos</option>
            {professorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </fieldset>
      )}

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 w-full cursor-pointer rounded-[10px] border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Limpar filtros
        </button>
      )}
    </aside>
  );
}
