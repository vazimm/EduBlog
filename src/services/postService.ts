import api from "./api";
import type { IPost } from "../interfaces/IPost";

export async function getPostsRequest() {
  const response = await api.get<{ data: IPost[] }>("/posts");
  return response.data.data;
}

export async function getPostByIdRequest(id: string) {
  const response = await api.get<{ data: IPost }>(`/posts/${id}`);
  return response.data.data;
}
