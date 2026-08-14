import api from "./api";
import type { IPost } from "../interfaces/IPost";

export async function getPostsRequest() {
  const response = await api.get<{ data: IPost[] }>("/posts");
  return response.data.data;
}