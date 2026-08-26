import type { IPost } from "../interfaces/IPost";
import { normalizeText } from "./discipline";

export function isPublishedPost(post: IPost) {
  return normalizeText(post.status.label) === normalizeText("Publicado");
}

export function isDraftPost(post: IPost) {
  return normalizeText(post.status.label) === normalizeText("Rascunho");
}