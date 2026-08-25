import api from "./api";
import type { IPost } from "../interfaces/IPost";

export async function getPostsRequest() {
  const response = await api.get<{ data: IPost[] }>("/posts");
  return response.data.data;
}

export async function searchPostsRequest(params: URLSearchParams) {
  if (Array.from(params.keys()).length === 0) {
    return getPostsRequest();
  }

  const response = await api.get<{ data: IPost[] }>(`/posts/search?${params.toString()}`);
  return response.data.data;
}

export async function getPostByIdRequest(id: string) {
  const response = await api.get<{ data: IPost }>(`/posts/${id}`);
  return response.data.data;
}
