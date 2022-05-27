import React, {useState, useRef, useEffect} from "react";
import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [name, setName] = useState('');
  const nameInputEl = useRef(null);
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

  const [idForTodo, setIdForTodo] = useState(4);

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
  }, []);

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
                onChange={event => setName(event.target.value)}
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
