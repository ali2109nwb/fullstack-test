import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../API";

// Fetch semua todos
export const useTodos = (search = "") => {
  return useQuery({
    queryKey: ["todos", search],
    queryFn: async () => {
      const res = await api.get("/todos", { params: { search } });
      return res.data;
    },
  });
};

// Tambah todo
export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title) => {
      const res = await api.post("/todos", { title });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

// Toggle todo
export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await api.patch(`/todos/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};
