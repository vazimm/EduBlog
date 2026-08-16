export type SearchSuggestion = {
  id: string;
  label: string;
  description: string;
  to: string;
  kind: "post" | "disciplina" | "professor";
};
