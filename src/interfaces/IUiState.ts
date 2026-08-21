import type { ReactNode } from "react";

export interface ILoadingStateProps {
  message: string;
}

export interface IErrorStateProps {
  title: string;
  message: string;
  action?: ReactNode;
}

export interface IEmptyStateProps {
  title: string;
  message: string;
  onClearFilters?: () => void;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface IContentPlaceholderProps {
  title: string;
}
