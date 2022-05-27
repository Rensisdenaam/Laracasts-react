import React, { useState } from "react";

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

export default TodoForm;