import './App.css'
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useState } from 'react';

const todos = [
  { id: 1, title: 'Learn React' },
  { id: 2, title: 'Build a Todo App' },
  { id: 3, title: 'Practice Components' },
]; 
function App() {
   const [todoList, setTodoList] = useState(todos);
  

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList  todoList={todoList}/>
      
    </div>
  )
}

export default App
