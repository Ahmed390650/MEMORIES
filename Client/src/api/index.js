import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPosts = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`${"/posts"}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${"/posts"}/${id}`);
export const likePost = (id) => API.patch(`${"/posts"}/${id}/likePost`);
export const signup = (formData) => API.post("/user/signup", formData);
export const signIn = (formData) => API.post("/user/signin", formData);
export const fetchPostsBySearch = (SearchQuery) =>
  API.get(
    `/posts/search?SearchQuery=${SearchQuery.search || "none"}&tags=${
      SearchQuery.tags
    }`
  );
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
