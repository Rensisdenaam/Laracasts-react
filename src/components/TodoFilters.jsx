function TodoFilters(props) {
    return (
        <div>
            <button onClick={() => {
                props.setFilter('all');
            }} className={`button filter-button ${props.filter === 'all' ? 'filter-button-active' : ''}`}>
                All
            </button>
            <button onClick={() => {
                props.setFilter('active');
            }} className={`button filter-button ${props.filter === 'active' ? 'filter-button-active' : ''}`}>Active</button>
            <button onClick={() => {
                props.setFilter('completed');
            }} className={`button filter-button ${props.filter === 'completed' ? 'filter-button-active' : ''}`} className="button filter-button">Completed</button>
        </div>
    )
}

export default TodoFilters;