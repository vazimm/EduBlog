import type { ISearchSuggestionsProps } from "../../../interfaces/ISearchs";

export default function SearchSuggestions({
  suggestions,
  activeIndex,
  isOpen,
  searchValue,
  onSelect,
  onActiveIndexChange,
}: ISearchSuggestionsProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
      {suggestions.length > 0 ? (
        <ul
          id="search-suggestions"
          role="listbox"
          className="max-h-80 overflow-y-auto py-1"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              id={suggestion.id}
              role="option"
              aria-selected={index === activeIndex}
            >
              <button
                type="button"
                onMouseDown={() => onSelect(suggestion.to)}
                onMouseEnter={() => onActiveIndexChange(index)}
                className={`flex w-full cursor-pointer items-center justify-between gap-3 border-l-4 px-4 py-3 text-left transition ${
                  index === activeIndex
                    ? "border-teal-700 bg-teal-50"
                    : "border-transparent hover:bg-slate-50"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {suggestion.label}
                  </p>

                  <p className="text-xs text-slate-500">
                    {suggestion.description}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  {suggestion.kind}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-3 text-sm text-slate-500">
          Nenhum resultado para essa busca.
        </p>
      )}

      <button
        type="button"
        onMouseDown={() =>
          onSelect(`/busca?q=${encodeURIComponent(searchValue.trim())}`)
        }
        className="block w-full cursor-pointer truncate border-t border-slate-200 px-4 py-3 text-left text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
      >
        Ver todos os resultados para "{searchValue.trim()}"
      </button>

      <button
        type="button"
        onMouseDown={() => onSelect("/busca")}
        className="block w-full cursor-pointer border-t border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        Ver todos os conteúdos do EduBlog
      </button>
    </div>
  );
}
