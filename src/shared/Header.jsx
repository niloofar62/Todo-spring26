import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';
import Navigation from './Navigation';

export default function Header() {
  const { email, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    const result = await logout();

    if (result.success) {
      navigate('/login');
    }
  }

  return (
    <header>
      <h1>Todo List</h1>

      <Navigation />

      {email && <p>Welcome, {email}</p>}

      {isAuthenticated && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
}