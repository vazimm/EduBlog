import type { IPostCollectionProps } from "../../interfaces/IPostList";
import EmptyState from "../ui/EmptyState";
import PostCard from "./PostCard";
import PostListItem from "./PostListItem";

export default function PostCollection({
  posts,
  viewMode,
  hasActiveFilters,
  emptyTitle = "Nenhum post publicado",
  emptyMessage = "Esta disciplina ainda não possui conteúdos publicados.",
  onClearFilters,
}: IPostCollectionProps) {
  if (posts.length === 0) {
    if (hasActiveFilters) {
      return (
        <EmptyState
          title="Nenhum post encontrado"
          message="Nenhum conteúdo corresponde aos filtros selecionados. Ajuste os filtros ou limpe a seleção para ver mais posts."
          onClearFilters={onClearFilters}
        />
      );
    }

    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
      />
    );
  }

  if (viewMode === "lista") {
    return (
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
