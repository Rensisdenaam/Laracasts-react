import React from "react";
import TodoItemsRemaining from './TodoItemsRemaining';
import PropTypes from "prop-types";

TodoList.propTypes = {
    // addTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    // commpleteTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    markAsEditing: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
    remaining: PropTypes.func.isRequired,
}

function TodoList(props) {
  return (
      <>
          <ul className="todo-list">
              {props.todos.map((todo, index) => (
                  <li key={todo.id} className="todo-item-container">
                      <div className="todo-item">
                          <input type="checkbox" checked={todo.isComplete} onChange={() => props.completeTodo(todo.id)} />

                          { !todo.isEditing ? (
                              <span onDoubleClick={() => props.markAsEditing(todo.id)}
                                    className={`todo-item-label ${todo.isComplete ? 'line-through' : ''}`
                                    }>
                      {todo.id} {todo.title}
                    </span>
                          ) : (
                              <input autoFocus
                                     onKeyDown={ event => {
                                         if(event.key === 'Enter') {
                                             props.updateTodo(event, todo.id);
                                         }
                                         else if(event.key === 'Escape') {
                                             props.markAsEditing(todo.id);
                                         }
                                     }}
                                     onBlur={(event) => props.updateTodo(event, todo.id)}
                                     type="text"
                                     className="todo-item-input"
                                     defaultValue={todo.title}
                              />
                          )
                          }
                      </div>
                      <button onClick={() => props.deleteTodo(todo.id)} className="x-button">
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
                  <div className="button" onClick={props.completeAllTodos}>Check All</div>
              </div>

              <TodoItemsRemaining remaining={props.remaining} />
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
      </>
  );
}

export default TodoList;