import type { IDiscipline } from "../interfaces/IDiscipline";

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function slugifyDisciplineLabel(label: string) {
  return normalizeText(label).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function findDisciplineBySlug(disciplines: IDiscipline[], slug: string | undefined) {
  if (!slug) return null;

  return (
    disciplines.find((discipline) => slugifyDisciplineLabel(discipline.label) === slug) ?? null
  );
}