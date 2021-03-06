import React, {useRef, useEffect, useState} from "react";
import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import {TodosContext} from "../context/TodosContext";
import {CSSTransition, SwitchTransition} from "react-transition-group";


function App() {
  const [name, setName] = useLocalStorage('name', '');

  const nameInputEl = useRef(null);
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 0);

  const [filter, setFilter] = useState( 'all');


  function todosFiltered() {
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
      <TodosContext.Provider
          value={{
            todos,
            setTodos,
            idForTodo,
            setIdForTodo,
            filter,
            setFilter,
            todosFiltered
      }} >

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
              <CSSTransition
                in={name.length > 0}
                timeout={300}
                classNames="slide-vertical"
                unmountOnExit
              >
                <p className="name-label">Hello, {name}</p>
              </CSSTransition>
            </div>
            <h2>Todo App</h2>
            <TodoForm />



            <SwitchTransition mode="out-in">
                <CSSTransition key={todos.length > 0 } timeout={300} classNames="slide-vertical" unmountOnExit>
                  { todos.length > 0 ? <TodoList /> : <NoTodos /> }
                </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
      </TodosContext.Provider>
  );
}

export default App;
