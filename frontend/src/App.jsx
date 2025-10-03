import { useState } from "react";
import { useAddTodo, useTodos, useToggleTodo } from "./hooks/useTodos";

function App() {
  const [search, setSearch] = useState("");
  const [newTodo, setNewTodo] = useState("");

  const { data: todos = [], isLoading, isError } = useTodos(search);
  const addTodo = useAddTodo();
  const toggleTodo = useToggleTodo();

  const handleAdd = () => {
    if (!newTodo.trim()) return;
    addTodo.mutate(newTodo);
    setNewTodo("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Todos</h1>

        {/* Input Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Add todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleAdd}
            disabled={addTodo.isLoading}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50"
          >
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* Search */}
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Loading & Error State */}
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {isError && <p className="text-red-500">Error fetching todos</p>}

        {/* Todo Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-100 text-gray-700">
                <th className="p-2 border">No</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Completed</th>
              </tr>
            </thead>
            <tbody>
              {todos.length > 0 ? (
                todos.map((t, idx) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition">
                    <td className="p-2 border text-center">{idx + 1}</td>
                    <td
                      className={`p-2 border ${
                        t.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {t.title}
                    </td>
                    <td className="p-2 border text-center">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleTodo.mutate(t.id)}
                        className="w-5 h-5 accent-indigo-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No todos found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
