import type { ILoadingStateProps } from "../../interfaces/IUiState";

export default function LoadingState({ message }: ILoadingStateProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-[min(1200px,92%)] items-center justify-center py-8">
      <div className="rounded-[14px] border border-slate-200 bg-white px-8 py-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <p className="text-base font-medium text-slate-500">{message}</p>
      </div>
    </div>
  );
}
