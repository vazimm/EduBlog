import type { IPost } from "../interfaces/IPost";
import type { IFilterOption, IPostFilters } from "../interfaces/IPostFilters";
import type { SortOrder } from "../types/sortOrder";
import { normalizeText } from "./discipline";

const seriesOrder = ["Fundamental I", "Fundamental II", "Ensino Medio"];
const semesterOrder = ["1", "2"];

function orderIndex(order: string[], value: string) {
  return order.findIndex((item) => normalizeText(item) === normalizeText(value));
}

function buildOptions(
  values: string[],
  order: string[],
  formatLabel: (value: string) => string = (value) => value,
): IFilterOption[] {
  const uniqueValues = Array.from(
    new Set(values.map((value) => value.trim()).filter((value) => value.length > 0)),
  );

  return uniqueValues
    .map((value) => ({ value, label: formatLabel(value) }))
    .sort((left, right) => {
      const leftIndex = orderIndex(order, left.value);
      const rightIndex = orderIndex(order, right.value);

      if (leftIndex !== -1 && rightIndex !== -1) return leftIndex - rightIndex;
      if (leftIndex !== -1) return -1;
      if (rightIndex !== -1) return 1;

      return left.label.localeCompare(right.label, "pt-BR", { numeric: true });
    });
}

function formatSemesterLabel(value: string) {
  return /^\d+$/.test(value) ? `${value} semestre` : value;
}

export function isPublished(post: IPost) {
  return normalizeText(post.status.label) === normalizeText("Publicado");
}

export function buildSeriesOptions(posts: IPost[]) {
  return buildOptions(
    posts.map((post) => post.series),
    seriesOrder,
  );
}

export function buildSemesterOptions(posts: IPost[]) {
  return buildOptions(
    posts.map((post) => post.semester),
    semesterOrder,
    formatSemesterLabel,
  );
}

export function buildProfessorOptions(posts: IPost[]) {
  return buildOptions(
    posts.map((post) => post.author.name),
    [],
  );
}

export function applyPostFilters(posts: IPost[], filters: IPostFilters) {
  const search = normalizeText(filters.search);

  return posts.filter((post) => {
    const matchesSeries =
      filters.series.length === 0 ||
      filters.series.some((value) => normalizeText(value) === normalizeText(post.series));

    const matchesSemester =
      filters.semesters.length === 0 ||
      filters.semesters.some((value) => normalizeText(value) === normalizeText(post.semester));

    const matchesProfessor =
      filters.professor.length === 0 ||
      normalizeText(filters.professor) === normalizeText(post.author.name);

    const matchesSearch =
      search.length === 0 ||
      normalizeText(post.title).includes(search) ||
      normalizeText(post.summary).includes(search) ||
      normalizeText(post.author.name).includes(search) ||
      normalizeText(post.discipline.label).includes(search);

    return matchesSeries && matchesSemester && matchesProfessor && matchesSearch;
  });
}

export function sortPosts(posts: IPost[], order: SortOrder) {
  const sorted = [...posts];

  if (order === "titulo") {
    return sorted.sort((left, right) => left.title.localeCompare(right.title, "pt-BR"));
  }

  return sorted.sort((left, right) => {
    const leftDate = new Date(left.createDate).getTime();
    const rightDate = new Date(right.createDate).getTime();

    return order === "antigos" ? leftDate - rightDate : rightDate - leftDate;
  });
}
