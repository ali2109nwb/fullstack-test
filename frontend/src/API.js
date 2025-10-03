import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getTodos = (search) =>
  api.get("/todos", { params: { search } }).then((res) => res.data);

export const createTodo = (title) =>
  api.post("/todos", { title }).then((res) => res.data);

export const toggleTodo = (id) =>
  api.patch(`/todos/${id}/toggle`).then((res) => res.data);

export default api;
