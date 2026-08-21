import type { IEmptyStateProps } from "../../interfaces/IUiState";

export default function EmptyState({ title, message, onClearFilters }: IEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[14px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="max-w-md text-sm text-slate-500">{message}</p>

      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-1 cursor-pointer rounded-[10px] bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
