import type { SearchSuggestion } from "../types/searchSuggestion";
import type { IDiscipline } from "./IDiscipline";
import type { IPost } from "./IPost";

export interface ISearchBarProps {
  disciplines: IDiscipline[];
  posts: IPost[];
}

export interface ISearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  activeIndex: number;
  isOpen: boolean;
  searchValue: string;
  onSelect: (to: string) => void;
  onActiveIndexChange: (index: number) => void;
}
