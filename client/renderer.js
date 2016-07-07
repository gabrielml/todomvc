function render(todos, filter) {
    renderList(todos, filter);
    renderCounter(todos);
    renderFilter(filter);

    function renderCounter(todos) {
        var myCounter = document.getElementById('myCounter');

        myCounter.textContent = todos.reduce(countCompleted, 0) + ' items left';

        function countCompleted(accumulator, todo) {
            accumulator += todo.completed ? 0 : 1;

            return accumulator;
        }
    }

    function renderFilter(filter) {
        var myFilter = document.getElementById('myFilter');

        myFilter.textContent = '';

        var template = [
            '<span>',
            '   <button type="button" class="btn {{active ? \'btn-success\' : \'btn-default\'}} btn-xs" ',
            '           onclick="dispatch(\'SET_FILTER\', \'{{filterType}}\')">',
            '       {{filterName}}',
            '   </button>',
            '   &nbsp;',
            '</span>'
        ].join('\n');

        [
            {filterName: 'All', active: filter === 'ALL'},
            {filterName: 'Completed', active: filter === 'COMPLETED'},
            {filterName: 'Active', active: filter === 'ACTIVE'}
        ].forEach(renderFilterButton);

        function renderFilterButton(filterButton) {
            var filterButtonModel = {
                filterName: filterButton.filterName,
                filterType: filterButton.filterName.toUpperCase(),
                active: filterButton.active
            };

            myFilter.appendChild(compileTemplate(template, filterButtonModel));
        }
    }

    function renderList(todos, filter) {
        var myList = document.getElementById('myList');

        myList.textContent = '';

        todos
            .filter(applyFilter)
            .forEach(renderListItem);

        function applyFilter(todo) {
            switch (filter) {
                case 'ALL':
                    return true;
                case 'COMPLETED':
                    return todo.completed;
                case 'ACTIVE':
                    return !todo.completed;
                default:
                    throw new Error('Filter not supported: ' + filter);
            }
        }

        function renderListItem(todo) {
            var template = [
                '<li class="list-group-item">',
                '   <label>',
                '       <input type="checkbox" {{completed ? \' checked="true"\' : \'\'}} onchange="dispatch(\'TOGGLE_TODO_STATE\', {{id}})">&nbsp;',
                '              {{completed ? \'<s>\' : \'\'}}{{title}}{{completed ? \'</s>\' : \'\'}}',
                '   </label>',
                '   <button class="close" onclick="dispatch(\'REMOVE_TODO\', {{id}})">',
                '       <span>&times;</span>',
                '   </button>',
                '</li>'
            ].join('\n');

            myList.appendChild(compileTemplate(template, todo));
        }
    }
}
