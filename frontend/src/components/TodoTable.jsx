export default function TodoTable({ todos, onToggle }) {
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((t, idx) => (
          <tr key={t.id}>
            <td>{idx + 1}</td>
            <td>{t.title}</td>
            <td>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => onToggle(t.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
