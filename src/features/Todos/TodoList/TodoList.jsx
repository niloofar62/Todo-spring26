import { useMemo } from 'react';
import TodoListItem from './TodoListItem.jsx';

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
  statusFilter = 'all',
}) {
  const filteredTodoList = useMemo(() => {
    let filteredTodos;

    switch (statusFilter) {
      case 'completed':
        filteredTodos = todoList.filter((todo) => todo && todo.isCompleted);
        break;
      case 'active':
        filteredTodos = todoList.filter((todo) => todo && !todo.isCompleted);
        break;
      case 'all':
      default:
        filteredTodos = todoList.filter((todo) => todo);
        break;
    }

    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, dataVersion, statusFilter]);

  function getEmptyMessage() {
    switch (statusFilter) {
      case 'completed':
        return 'No completed todos yet.';
      case 'active':
        return 'No active todos. Add a todo above to get started.';
      case 'all':
      default:
        return 'Add todo above to get started.';
    }
  }

  return filteredTodoList.todos.length === 0 ? (
    <p>{getEmptyMessage()}</p>
  ) : (
    <ul>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;