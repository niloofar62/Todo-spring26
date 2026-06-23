import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';

function ProfilePage() {
  const { email, token, isAuthenticated } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/tasks', {
          method: 'GET',
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        const todos = data.tasks || data;

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;

  return (
    <section>
      <h2>Profile</h2>

      <p>Email: {email}</p>
      <p>Status: {isAuthenticated ? 'Logged in' : 'Logged out'}</p>

      <h3>Todo Statistics</h3>

      {loading && <p>Loading statistics...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div>
          <p>Total todos: {todoStats.total}</p>
          <p>Completed todos: {todoStats.completed}</p>
          <p>Active todos: {todoStats.active}</p>
          <p>Completion: {completionPercentage}%</p>
        </div>
      )}
    </section>
  );
}

export default ProfilePage;