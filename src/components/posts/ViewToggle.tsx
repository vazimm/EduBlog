import type { IViewToggleProps } from "../../interfaces/IPostList";
import type { ViewMode } from "../../types/viewMode";

const viewOptions: { value: ViewMode; label: string }[] = [
  { value: "grid", label: "Grid" },
  { value: "lista", label: "Lista" },
];

export default function ViewToggle({ viewMode, onChange }: IViewToggleProps) {
  return (
    <div className="flex gap-2">
      {viewOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={viewMode === option.value}
          onClick={() => onChange(option.value)}
          className={`cursor-pointer rounded-[10px] border px-4 py-1.5 text-sm font-semibold transition ${
            viewMode === option.value
              ? "border-teal-700 bg-teal-50 text-teal-700"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
