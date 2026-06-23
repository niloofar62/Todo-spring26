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
    <header className="header">
      <div className="header-top">
        <h1>Todo List</h1>

        {isAuthenticated && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      <Navigation />

      {email && (
        <p className="welcome-message">
          Welcome, {email}
        </p>
      )}
    </header>
  );
}