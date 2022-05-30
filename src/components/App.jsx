import React, { useRef, useEffect} from "react";
import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  // const [name, setName] = useState('');
  const [name, setName] = useLocalStorage('name', '');

  const nameInputEl = useRef(null);
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 0);

  function addTodo(todo, prevIdForTodo) {

    setTodos([...todos, {

      id: idForTodo,
      title: todo,
      isComplete: false
    }]);

    setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
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

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function todosFiltered(filter) {
    switch(filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.isComplete);
      case 'completed':
        return todos.filter(todo => todo.isComplete);
    }
  }

  useEffect(() => {
    nameInputEl.current.focus();
    // setName(JSON.parse(localStorage.getItem('name')) ?? '');

    return function cleanup() { }
  }, []);

  function handleNameInput(event) {
    setName(event.target.value);
    // localStorage.setItem('name', JSON.stringify(event.target.value));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What is your name</h2>
          <form>
            <input
                type="text"
                placeholder="Enter your name"
                className="todo-input"
                value={name}
                ref={nameInputEl}
                onChange={handleNameInput}
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        { todos.length > 0 ?
            <TodoList
                todos={todos}
                completeTodo={completeTodo}
                markAsEditing={markAsEditing}
                updateTodo={updateTodo}
                cancelEditing={markAsEditing}
                deleteTodo={deleteTodo}
                remaining={remaining}
                clearCompleted={clearCompleted}
                todosFiltered={todosFiltered}
                completeAllTodos={completeAllTodos}
            /> : <NoTodos /> }
      </div>
    </div>
  );
}

export default App;
