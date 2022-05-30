import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAll from "./TodoCompleteAll";
import TodoFilters from "./TodoFilters";
import {useContext} from "react";
import {TodosContext} from "../context/TodosContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function TodoList() {
    const {todosFiltered, todos, setTodos} = useContext(TodosContext);

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

  return (
      <>
          <TransitionGroup component="ul" className="todo-list">
              {todosFiltered().map((todo) => (
                  <CSSTransition key={todo.id} timeout={300} classNames="slide-horizontal">
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
                          <button onClick={() => deleteTodo(todo.id)} className="x-button">
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
                  </CSSTransition>
              ))}
          </TransitionGroup>

          <div className="check-all-container">
              <TodoCompleteAll />
              <TodoItemsRemaining />
          </div>

          <div className="other-buttons-container">
              <TodoFilters />
              <div>
                  <TodoClearCompleted />
              </div>
          </div>
      </>
  );
}

export default TodoList;