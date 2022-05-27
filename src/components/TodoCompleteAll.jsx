function TodoCompleteAll(props) {
    return (
        <div>
            <div className="button" onClick={props.completeAllTodos}>Check All</div>
        </div>
    )
}

export default TodoCompleteAll;