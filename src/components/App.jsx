import {useState} from "react";
import '../reset.css';
import '../App.css';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Learn React',
      isComplete: false,
      isEditing: false
    },
    {
      id: 2,
      title: 'Quack like a duck',
      isComplete: true,
      isEditing: false
    },
    {
      id: 3,
      title: 'Run like a duck',
      isComplete: false,
      isEditing: false
    },

  ]);

  const [todoInput, setTodoInput] = useState('');

  function addTodo() {
    if(todoInput.trim() === '') {
      return;
    }

    setTodos([...todos, {
      id: todos.length + 1,
      title: todoInput,
      isComplete: false
    }]);

    setTodoInput('');
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function completeTodo(id) {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    }));
  }

  function markAsEditing(id) {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }
      return todo;
    }));
  }

  function updateTodo(event, id) {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        if(event.target.value.trim() === '') {
          todo.isEditing = false;
          return todo;
        }

        todo.isEditing = !todo.isEditing;
        todo.title = event.target.value;
      }
      return todo;
    }));
  }

  function completeAllTodos() {
    setTodos(todos.map(todo => {
      todo.isComplete = true;
      return todo;
    }));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            onChange={handleInput}
            value={todoInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox" checked={todo.isComplete} onChange={() => completeTodo(todo.id)} />

                { !todo.isEditing ? (
                <span onDoubleClick={() => markAsEditing(todo.id)}
                      className={`todo-item-label ${todo.isComplete ? 'line-through' : ''}`
                }>
                  {todo.title}
                </span>
                ) : (
                   <input autoFocus
                          onKeyDown={ event => {
                            if(event.key === 'Enter') {
                              updateTodo(event, todo.id);
                            }
                            else if(event.key === 'Escape') {
                              markAsEditing(todo.id);
                            }
                          }}
                          onBlur={(event) => updateTodo(event, todo.id)}
                          type="text"
                          className="todo-item-input"
                          defaultValue={todo.title}
                   />
                )
                }
              </div>
              <button className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button" onClick={completeAllTodos}>Check All</div>
          </div>

          <span>{todos.length} items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
