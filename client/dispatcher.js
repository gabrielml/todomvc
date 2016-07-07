function dispatch(type, payload) {
    switch (type) {
        case 'CREATE_TODO':
            var todo = {
                id: Date.now(),
                title: payload,
                completed: false
            };

            todos.push(todo);
            dispatch('SAVE_TODO_ITEMS');
            break;
        case 'REMOVE_TODO':
            todos = todos.filter(function (todo) {
                return todo.id !== payload;
            });
            dispatch('SAVE_TODO_ITEMS');
            break;
        case 'TOGGLE_TODO_STATE':
            todos = todos.map(function (todo) {
                if (todo.id === payload) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
            dispatch('SAVE_TODO_ITEMS');
            break;
        case 'CLEAR_COMPLETED':
            todos = todos.filter(function (todo) {
                return !todo.completed;
            });
            dispatch('SAVE_TODO_ITEMS');
            break;
        case 'SET_FILTER':
            filter = payload;
            break;
        case 'LOAD_TODO_ITEMS':
            var todosAsString = localStorage.getItem('todos');

            todos = JSON.parse(todosAsString) || [];
            break;
        case 'SAVE_TODO_ITEMS':
            var todosAsString = JSON.stringify(todos);

            localStorage.setItem('todos', todosAsString);
            break;
        default:
            throw new Error('Action not supported: ' + type);
    }

    render(todos, filter);
}
