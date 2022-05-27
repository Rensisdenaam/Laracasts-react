import React, { useState } from "react";
import PropTypes from 'prop-types';

function TodoForm(props) {
    const [todoInput, setTodoInput] = useState('');

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if(todoInput.trim() === '') {
            return;
        }

        props.addTodo(todoInput);

        setTodoInput('');
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleInput}
                value={todoInput}
                className="todo-input"
                placeholder="What do you need to do?"
            />
        </form>
    );
}

TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    commpleteTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    markAsEditing: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    cancelEditing: PropTypes.func.isRequired,
}

export default TodoForm;