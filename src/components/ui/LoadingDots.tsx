import type { ILoadingDotsProps } from "../../interfaces/IUiState";

export function LoadingDots({
  text = "Carregando",
  className = "",
}: ILoadingDotsProps) {
  return (
    <div className={`inline-flex items-center gap-1 font-medium ${className}`}>
      <span>{text}</span>
      <span className="flex gap-1 items-center translate-y-0.5">
        <span
          className="w-1.5 h-1.5 bg-current rounded-full animate-loading-dots"
          style={{ animationDelay: "-0.32s" }}
        />
        <span
          className="w-1.5 h-1.5 bg-current rounded-full animate-loading-dots"
          style={{ animationDelay: "-0.16s" }}
        />
        <span className="w-1.5 h-1.5 bg-current rounded-full animate-loading-dots" />
      </span>
    </div>
  );
}
