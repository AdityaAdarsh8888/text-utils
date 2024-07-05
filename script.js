const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoContainer = document.querySelector('.todo-container');

let todoList = [];

// Load todoList from local storage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todoList = JSON.parse(storedTodos);
        displayTodos();
    }
};

// Save todoList to local storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todoList));
};

// Display todos
function displayTodos() {
    todoContainer.innerHTML = '';
    const todoHeader = document.createElement('div');
    todoHeader.classList.add('todo-header');
    todoHeader.innerHTML = `
        <span>To-Do</span>
        <span id="top-date">Date and Time</span>
        <span></span>
    `;
    todoContainer.appendChild(todoHeader);
    todoList.forEach((todo, index) => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo-item');
        todoElement.innerHTML = `
            <span id="task-list">${todo.item}</span>
            <span id="task-list">${new Date(todo.dueDate).toLocaleString()}</span>
            <div class="delete-button-container">
                <button class='btn-delete' onclick="removeTodo(${index})">Delete</button>
            </div>
        `;
        todoContainer.appendChild(todoElement);
    });
}
;
// Add todo
function addTodo(event) {
    event.preventDefault();
    if (!todoInput.value || !todoDate.value) {
        alert('Please enter a To-Do and a date.');
        return;
    }
    const todo = {
        item: todoInput.value,
        dueDate: todoDate.value
    };
    todoList.push(todo);
    todoInput.value = '';
    todoDate.value = '';
    saveTodos();
    displayTodos();
};

// Remove todo
function removeTodo(index) {
    todoList.splice(index, 1);
    saveTodos();
    displayTodos();
};

// Event listeners
todoForm.addEventListener('submit', addTodo);
loadTodos();