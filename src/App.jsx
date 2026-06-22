import './App.css';
import Header from './shared/Header.jsx';
import TodosPage from './features/Todos/TodosPage.jsx';
import Logon from './features/Logon.jsx';
import { useAuth } from './contexts/useAuth.js';

function App() {
  const { token } = useAuth();

  return (
    <div>
      <Header />

      {token ? (
        <TodosPage />
      ) : (
        <Logon />
      )}
    </div>
  );
}

export default App;