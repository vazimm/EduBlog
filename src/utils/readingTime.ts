export function estimateReadingTime(...texts: string[]) {
  const words = texts
    .join(" ")
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  return Math.max(1, Math.ceil(words.length / 200));
}
