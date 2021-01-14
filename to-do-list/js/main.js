let todoInput = document.querySelector('.list-block__add-input-js'),
    addTodoButton = document.querySelector('.list-block__add-btn-js'),
    todoList = document.querySelector('.list-block__items-js'),
    dateElement = document.querySelector('#date'),
    todoListItems = [];

// Загрузка из localStorage
if (localStorage.getItem('to_do_list')) {
    todoListItems = JSON.parse(localStorage.getItem('to_do_list'));
    displayTodoList();
}

// Показывает сегодняшнюю дату
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("ru", options);

addTodoButton.addEventListener('click', () => {

    let newTodo = {
        name: todoInput.value,
        done: false,
        trash: false
    }

    todoListItems.push(newTodo);
    todoInput.value = '';
    displayTodoList();
    localStorage.setItem('to_do_list', JSON.stringify(todoListItems));
});

function displayTodoList() {
    let todoItem = '';

    if (todoListItems.length < 1) {
        todoList.innerHTML = '<p class="list-block__items-title">Список пуст</p>';
    }

    todoListItems.forEach((item, index) => {
        todoItem += `
            <li class="list-block__item">
                <div class="list-block__item-done" done-id="${index}" ${item.done ? 'done' : ''}></div>
                <p class="list-block__item-text">${item.name}</p>
                <div class="list-block__item-del" trash-id="${index}" ${item.trash ? 'trash' : ''}></div>
            </li>`;

        todoList.innerHTML = todoItem;
        todoListItemDone();
        todoListItemDelete();
    });
}

function todoListItemDone() {
    document.querySelectorAll('.list-block__item-done').forEach(doneButton => {
        doneButton.addEventListener('click', () => {
            let todoDoneId = doneButton.getAttribute('done-id');
            
            todoListItems.forEach((item, index) => {
                if (todoDoneId == index) {
                    doneButton.toggleAttribute('done');
                    item.done = !item.done;
                    localStorage.setItem('to_do_list', JSON.stringify(todoListItems));
                }
            });  
        });
    });
}

function todoListItemDelete() {
    document.querySelectorAll('.list-block__item-del').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            let deleteButtonId = deleteButton.getAttribute('trash-id');
            
            todoListItems.forEach((item, index) => {
                if (deleteButtonId == index) {
                    deleteButton.toggleAttribute('trash')
                    item.trash = !item.trash;
                    todoListItems.splice(index, 1);
                    localStorage.setItem('to_do_list', JSON.stringify(todoListItems));
                    displayTodoList();
                }
            });  
        });
    });
}

