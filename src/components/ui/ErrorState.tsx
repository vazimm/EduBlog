import type { IErrorStateProps } from "../../interfaces/IUiState";

export default function ErrorState({ title, message, action }: IErrorStateProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-[min(1200px,92%)] items-center justify-center py-8">
      <div className="flex flex-col items-center gap-4 rounded-[14px] border border-rose-200 bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="max-w-xl text-sm text-slate-600">{message}</p>
        {action}
      </div>
    </div>
  );
}
