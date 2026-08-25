import type { IPost } from "./IPost";
import type { ViewMode } from "../types/viewMode";

export interface IPostCardProps {
  post: IPost;
}

export interface IPostListItemProps {
  post: IPost;
}

export interface IPostCollectionProps {
  posts: IPost[];
  viewMode: ViewMode;
  hasActiveFilters: boolean;
  emptyTitle?: string;
  emptyMessage?: string;
  onClearFilters: () => void;
}

export interface IViewToggleProps {
  viewMode: ViewMode;
  onChange: (viewMode: ViewMode) => void;
}
