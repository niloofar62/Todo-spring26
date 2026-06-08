import { useAuth } from '../contexts/AuthContext.jsx';

export default function Header() {
  const { email } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      {email && <p>Welcome, {email}</p>}
    </header>
  );
}