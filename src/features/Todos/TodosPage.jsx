// import { useCallback, useEffect, useState } from 'react';
// import SortBy from '../../shared/SortBy.jsx';
// import FilterInput from '../../shared/FilterInput.jsx';
// import useDebounce from '../../utils/useDebounce.js';
// import TodoForm from './TodoForm.jsx';
// import TodoList from './TodoList/TodoList.jsx';

// export default function TodosPage({ token }) {
//   const [todoList, setTodoList] = useState([]);
//   const [error, setError] = useState('');
//   const [isTodoListLoading, setIsTodoListLoading] = useState(false);

//   const [sortBy, setSortBy] = useState('creationDate');
//   const [sortDirection, setSortDirection] = useState('desc');
//   const [filterTerm, setFilterTerm] = useState('');
//   const [filterError, setFilterError] = useState('');
//   const [dataVersion, setDataVersion] = useState(0);

//   const debouncedFilterTerm = useDebounce(filterTerm, 300);

//   const invalidateCache = useCallback(() => {
//     setDataVersion((previous) => previous + 1);
//   }, []);

//   function handleFilterChange(newTerm) {
//     setFilterTerm(newTerm);
//   }

//   useEffect(() => {
//     async function fetchTodos() {
//       try {
//         setIsTodoListLoading(true);

//         const paramsObject = {
//           sortBy,
//           sortDirection,
//         };

//         if (debouncedFilterTerm) {
//           paramsObject.find = debouncedFilterTerm;
//         }

//         const params = new URLSearchParams(paramsObject);

//         const response = await fetch(`/api/tasks?${params}`, {
//           method: 'GET',
//           headers: {
//             'X-CSRF-TOKEN': token,
//           },
//           credentials: 'include',
//         });

//         if (response.status === 401) {
//           throw new Error('Unauthorized');
//         }

//         if (!response.ok) {
//           throw new Error('Failed to fetch todos');
//         }

//         const data = await response.json();
//         setTodoList(data.tasks);
//         setFilterError('');
//       } catch (error) {
//         if (
//           debouncedFilterTerm ||
//           sortBy !== 'creationDate' ||
//           sortDirection !== 'desc'
//         ) {
//           setFilterError(`Error filtering/sorting todos: ${error.message}`);
//         } else {
//           setError(`Error fetching todos: ${error.message}`);
//         }
//       } finally {
//         setIsTodoListLoading(false);
//       }
//     }

//     if (token) {
//       fetchTodos();
//     }
//   }, [token, sortBy, sortDirection, debouncedFilterTerm]);

//   async function addTodo(todoTitle) {
//     const temporaryTodo = {
//       id: Date.now(),
//       title: todoTitle,
//       isCompleted: false,
//     };

//     setTodoList((previous) => [temporaryTodo, ...previous]);

//     try {
//       const response = await fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-TOKEN': token,
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           title: todoTitle,
//           isCompleted: false,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add todo');
//       }

//       const savedTodo = await response.json();
//       const realTodo = savedTodo.task || savedTodo;

//       setTodoList((previous) =>
//         previous.map((todo) =>
//           todo.id === temporaryTodo.id ? realTodo : todo
//         )
//       );

//       invalidateCache();
//     } catch (error) {
//       setTodoList((previous) =>
//         previous.filter((todo) => todo.id !== temporaryTodo.id)
//       );
//       setError(error.message);
//     }
//   }

//  import { useCallback, useEffect, useState } from 'react';
// import SortBy from '../../shared/SortBy.jsx';
// import FilterInput from '../../shared/FilterInput.jsx';
// import useDebounce from '../../utils/useDebounce.js';
// import TodoForm from './TodoForm.jsx';
// import TodoList from './TodoList/TodoList.jsx';

// export default function TodosPage({ token }) {
//   const [todoList, setTodoList] = useState([]);
//   const [error, setError] = useState('');
//   const [isTodoListLoading, setIsTodoListLoading] = useState(false);

//   const [sortBy, setSortBy] = useState('creationDate');
//   const [sortDirection, setSortDirection] = useState('desc');
//   const [filterTerm, setFilterTerm] = useState('');
//   const [filterError, setFilterError] = useState('');
//   const [dataVersion, setDataVersion] = useState(0);

//   const debouncedFilterTerm = useDebounce(filterTerm, 300);

//   const invalidateCache = useCallback(() => {
//     setDataVersion((previous) => previous + 1);
//   }, []);

//   function handleFilterChange(newTerm) {
//     setFilterTerm(newTerm);
//   }

//   useEffect(() => {
//     async function fetchTodos() {
//       try {
//         setIsTodoListLoading(true);

//         const paramsObject = {
//           sortBy,
//           sortDirection,
//         };

//         if (debouncedFilterTerm) {
//           paramsObject.find = debouncedFilterTerm;
//         }

//         const params = new URLSearchParams(paramsObject);

//         const response = await fetch(`/api/tasks?${params}`, {
//           method: 'GET',
//           headers: {
//             'X-CSRF-TOKEN': token,
//           },
//           credentials: 'include',
//         });

//         if (response.status === 401) {
//           throw new Error('Unauthorized');
//         }

//         if (!response.ok) {
//           throw new Error('Failed to fetch todos');
//         }

//         const data = await response.json();

//         setTodoList(
//           data.tasks.map((todo) => ({
//             ...todo,
//             createdAt: todo.createdAt || todo.created_at,
//           }))
//         );

//         setFilterError('');
//       } catch (error) {
//         if (
//           debouncedFilterTerm ||
//           sortBy !== 'creationDate' ||
//           sortDirection !== 'desc'
//         ) {
//           setFilterError(`Error filtering/sorting todos: ${error.message}`);
//         } else {
//           setError(`Error fetching todos: ${error.message}`);
//         }
//       } finally {
//         setIsTodoListLoading(false);
//       }
//     }

//     if (token) {
//       fetchTodos();
//     }
//   }, [token, sortBy, sortDirection, debouncedFilterTerm]);

//   async function addTodo(todoTitle) {
//     const temporaryTodo = {
//       id: Date.now(),
//       title: todoTitle,
//       isCompleted: false,
//     };

//     setTodoList((previous) => [temporaryTodo, ...previous]);

//     try {
//       const response = await fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-TOKEN': token,
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           title: todoTitle,
//           isCompleted: false,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add todo');
//       }

//       const savedTodo = await response.json();
//       const responseTodo = savedTodo.task || savedTodo;

//       const realTodo = {
//         ...responseTodo,
//         createdAt: responseTodo.createdAt || responseTodo.created_at,
//       };

//       setTodoList((previous) =>
//         previous.map((todo) =>
//           todo.id === temporaryTodo.id ? realTodo : todo
//         )
//       );

//       invalidateCache();
//     } catch (error) {
//       setTodoList((previous) =>
//         previous.filter((todo) => todo.id !== temporaryTodo.id)
//       );

//       setError(error.message);
//     }
//   }

//   async function completeTodo(id) {
//     const originalTodo = todoList.find((todo) => todo.id === id);

//     if (!originalTodo) {
//       setError('Todo not found');
//       return;
//     }

//     const completedTodo = {
//       ...originalTodo,
//       isCompleted: true,
//     };

//     setTodoList((previous) =>
//       previous.map((todo) => (todo.id === id ? completedTodo : todo))
//     );

//     try {
//       const response = await fetch(`/api/tasks/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-TOKEN': token,
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           title: originalTodo.title,
//           isCompleted: true,
//           createdAt: originalTodo.createdAt,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();

//         throw new Error(errorData?.message || 'Failed to complete todo');
//       }

//       invalidateCache();
//     } catch (error) {
//       setTodoList((previous) =>
//         previous.map((todo) => (todo.id === id ? originalTodo : todo))
//       );

//       setError(error.message);
//     }
//   }

//   async function updateTodo(editedTodo) {
//     const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

//     if (!originalTodo) {
//       setError('Todo not found');
//       return;
//     }

//     setTodoList((previous) =>
//       previous.map((todo) =>
//         todo.id === editedTodo.id ? editedTodo : todo
//       )
//     );

//     try {
//       const response = await fetch(`/api/tasks/${editedTodo.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-TOKEN': token,
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           title: editedTodo.title,
//           isCompleted: editedTodo.isCompleted,
//           createdAt: originalTodo.createdAt,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();

//         throw new Error(errorData?.message || 'Failed to update todo');
//       }

//       invalidateCache();
//     } catch (error) {
//       setTodoList((previous) =>
//         previous.map((todo) =>
//           todo.id === editedTodo.id ? originalTodo : todo
//         )
//       );

//       setError(error.message);
//     }
//   }

//   return (
//     <div>
//       {error && (
//         <div>
//           <p>{error}</p>
//           <button onClick={() => setError('')}>Clear Error</button>
//         </div>
//       )}

//       {filterError && (
//         <div>
//           <p>{filterError}</p>

//           <button onClick={() => setFilterError('')}>
//             Clear Filter Error
//           </button>

//           <button
//             onClick={() => {
//               setFilterTerm('');
//               setSortBy('creationDate');
//               setSortDirection('desc');
//               setFilterError('');
//             }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       )}

//       {isTodoListLoading && <p>Loading todos...</p>}

//       <SortBy
//         sortBy={sortBy}
//         sortDirection={sortDirection}
//         onSortByChange={setSortBy}
//         onSortDirectionChange={setSortDirection}
//       />

//       <FilterInput
//         filterTerm={filterTerm}
//         onFilterChange={handleFilterChange}
//       />

//       <TodoForm onAddTodo={addTodo} />

//       <TodoList
//         todoList={todoList}
//         onCompleteTodo={completeTodo}
//         onUpdateTodo={updateTodo}
//         dataVersion={dataVersion}
//       />
//     </div>
//   );
// }


//   async function updateTodo(editedTodo) {
//     const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

//     if (!originalTodo) {
//       setError('Todo not found');
//       return;
//     }

//     setTodoList((previous) =>
//       previous.map((todo) =>
//         todo.id === editedTodo.id ? editedTodo : todo
//       )
//     );

//     try {
//       const response = await fetch(`/api/tasks/${editedTodo.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRF-TOKEN': token,
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           title: editedTodo.title,
//           isCompleted: editedTodo.isCompleted,
//           createdAt: originalTodo.createdAt,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update todo');
//       }

//       invalidateCache();
//     } catch (error) {
//       setTodoList((previous) =>
//         previous.map((todo) =>
//           todo.id === editedTodo.id ? originalTodo : todo
//         )
//       );
//       setError(error.message);
//     }
//   }

//   return (
//     <div>
//       {error && (
//         <div>
//           <p>{error}</p>
//           <button onClick={() => setError('')}>Clear Error</button>
//         </div>
//       )}

//       {filterError && (
//         <div>
//           <p>{filterError}</p>

//           <button onClick={() => setFilterError('')}>
//             Clear Filter Error
//           </button>

//           <button
//             onClick={() => {
//               setFilterTerm('');
//               setSortBy('creationDate');
//               setSortDirection('desc');
//               setFilterError('');
//             }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       )}

//       {isTodoListLoading && <p>Loading todos...</p>}

//       <SortBy
//         sortBy={sortBy}
//         sortDirection={sortDirection}
//         onSortByChange={setSortBy}
//         onSortDirectionChange={setSortDirection}
//       />

//       <FilterInput
//         filterTerm={filterTerm}
//         onFilterChange={handleFilterChange}
//       />

//       <TodoForm onAddTodo={addTodo} />

//       <TodoList
//         todoList={todoList}
//         onCompleteTodo={completeTodo}
//         onUpdateTodo={updateTodo}
//         dataVersion={dataVersion}
//       />
//     </div>
//   );
// }


  import { useCallback, useEffect, useState } from 'react';
import SortBy from '../../shared/SortBy.jsx';
import FilterInput from '../../shared/FilterInput.jsx';
import useDebounce from '../../utils/useDebounce.js';
import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList/TodoList.jsx';

export default function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  const [sortBy, setSortBy] = useState('creationDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterTerm, setFilterTerm] = useState('');
  const [filterError, setFilterError] = useState('');
  const [dataVersion, setDataVersion] = useState(0);

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const invalidateCache = useCallback(() => {
    setDataVersion((previous) => previous + 1);
  }, []);

  function handleFilterChange(newTerm) {
    setFilterTerm(newTerm);
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsTodoListLoading(true);

        const paramsObject = {
          sortBy,
          sortDirection,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        setTodoList(data.tasks);
        setFilterError('');
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== 'creationDate' ||
          sortDirection !== 'desc'
        ) {
          setFilterError(`Error filtering/sorting todos: ${error.message}`);
        } else {
          setError(`Error fetching todos: ${error.message}`);
        }
      } finally {
        setIsTodoListLoading(false);
      }
    }

    if (token) {
      fetchTodos();
    }
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const temporaryTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((previous) => [temporaryTodo, ...previous]);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const savedTodo = await response.json();
      const realTodo = savedTodo.task || savedTodo;

      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === temporaryTodo.id ? realTodo : todo
        )
      );

      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.filter((todo) => todo.id !== temporaryTodo.id)
      );

      setError(error.message);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) {
      setError('Todo not found');
      return;
    }

    const completedTodo = {
      ...originalTodo,
      isCompleted: true,
    };

    setTodoList((previous) =>
      previous.map((todo) => (todo.id === id ? completedTodo : todo))
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: originalTodo.title,
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to complete todo');
      }

      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? originalTodo : todo))
      );

      setError(error.message);
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!originalTodo) {
      setError('Todo not found');
      return;
    }

    setTodoList((previous) =>
      previous.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to update todo');
      }

      invalidateCache();
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo
        )
      );

      setError(error.message);
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError('')}>Clear Error</button>
        </div>
      )}

      {filterError && (
        <div>
          <p>{filterError}</p>

          <button onClick={() => setFilterError('')}>
            Clear Filter Error
          </button>

          <button
            onClick={() => {
              setFilterTerm('');
              setSortBy('creationDate');
              setSortDirection('desc');
              setFilterError('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />

      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  );
}