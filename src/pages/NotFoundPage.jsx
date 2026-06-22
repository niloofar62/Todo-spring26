import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <section>
      <h2>404 - Page Not Found</h2>

      <p>The page you requested does not exist.</p>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/todos">Todos</Link>
        </li>
      </ul>
    </section>
  );
}

export default NotFoundPage;