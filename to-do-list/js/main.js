let doc = document,
    todoInput = doc.querySelector('.list-block__add-input'),
    addTodoButton = doc.querySelector('.list-block__add-btn'),
    todoList = doc.querySelector('.list-block__items'),
    dateElement = doc.querySelector('#date'),
    refreshList = doc.querySelector('.list-block__refresh-list'),
    todoListItems = [];
    emptyList();

// Загрузка из localStorage
if (localStorage.getItem('to_do_list')) {
    todoListItems = JSON.parse(localStorage.getItem('to_do_list'));
    displayTodoList();
}

// Чистка localStorage
refreshList.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

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

    if (todoInput.value == '') {
        doc.querySelector('.input-error').innerHTML = 'Поле обязательное для заполнения';
        return false;
    } else {
        todoInput.value = '';
        doc.querySelector('.input-error').innerHTML = '';
        todoListItems.push(newTodo);
        displayTodoList();
        localStorage.setItem('to_do_list', JSON.stringify(todoListItems));
    }
});

function emptyList() {
    if (todoListItems.length < 1) {
        todoList.innerHTML = '<p class="list-block__items-title">Список пуст</p>';
    }
}

function displayTodoList() {
    let todoItem = '';
    emptyList();

    todoListItems.forEach((item, index) => {
        todoItem += `
            <li class="list-block__item">
                <div class="list-block__item-done" done-id="${index}" ${item.done ? 'done' : ''}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="done-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                </div>
                <p class="list-block__item-text">${item.name}</p>
                <div class="list-block__item-del" trash-id="${index}" ${item.trash ? 'trash' : ''}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" class="del-svg" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                </div>
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