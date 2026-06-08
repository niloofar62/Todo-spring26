import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Logon() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setAuthError('');
    setIsLoggingOn(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setAuthError(result.error);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <section>
      <h2>Log On</h2>

      {authError && <p>{authError}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? 'Logging in...' : 'Log On'}
        </button>
      </form>
    </section>
  );
}