export function formatProfessorName(name: string) {
  return /^prof\.?\s/i.test(name.trim()) ? name.trim() : `Prof. ${name.trim()}`;
}
