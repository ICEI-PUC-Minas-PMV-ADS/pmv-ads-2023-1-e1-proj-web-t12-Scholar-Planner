const buttonTime = document.getElementById('focusTime-button');
const username = document.querySelector('.username');

function getNameAndInsertsItOnTheScreen() {
  const usernameLocalStorage = localStorage.getItem('@SchoolPlaner/username');
  username.innerHTML = usernameLocalStorage;
}

buttonTime.addEventListener('click', pageFocusTime);
function pageFocusTime() {
  window.location.href = '../focus-time/index.html';
}

getNameAndInsertsItOnTheScreen();

// COLUNAS
const columnsContainer = document.getElementById('columns-container');
const addNewColumn = document.getElementById('add-column-button');

const columnsArray = [];

function checkTheLengthOfArray() {
  if (columnsArray.length < 7) {
    createColumn();
  } else {
    alert('Número máximo de colunas atingido.');
  }
}

function createColumn() {
  const column = document.createElement('div');
  column.classList.add('column');
  column.id = `column-${columnsArray.length}`;

  const removeColumnButton = document.createElement('button');
  removeColumnButton.innerHTML = 'Excluir coluna';
  removeColumnButton.addEventListener('click', removeCurrentColumn);

  column.appendChild(removeColumnButton);
  columnsContainer.appendChild(column);
  columnsArray.push(column);
}

addNewColumn.addEventListener('click', checkTheLengthOfArray);

function removeCurrentColumn(event) {
  let currentColumn = event.currentTarget.parentElement;
  columnsArray.splice(Number(currentColumn.id.split('-').at(-1)), 1);
  columnsContainer.removeChild(currentColumn);
}




// todo-list
const todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoForm = document.querySelector(".todo-form");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const statusText = document.getElementById("statusText");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        if (todo.done) {
            li.classList.add("completed");
        }

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = todo.done;
        cb.addEventListener("change", () => toggleDone(todo.id));

        li.appendChild(cb);

        const span = document.createElement("span");
        span.textContent = todo.text;

        li.appendChild(span);

        const xmlns = "http://www.w3.org/2000/svg";

        const btn = document.createElementNS(xmlns, "svg");
        btn.setAttribute("viewBox", "0 0 24 24");
        btn.classList.add("remove-button");
        btn.addEventListener("click", () => removeTodo(todo.id));

        const path = document.createElementNS(xmlns, "path");
        path.setAttribute(
            "d",
            "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        );
        btn.appendChild(path);

        li.appendChild(btn);

        todoList.appendChild(li);
    });

    showStatus();
}

renderTodos();

function showStatus() {
    if (!todos.length) {
        statusText.textContent = "Você não possui tarefas.";
        return;
    }

    const pending = todos.filter((todo) => !todo.done).length;
    if (pending === 0) {
        statusText.textContent = "Tudo feito!";
    } else if (pending === 1) {
        statusText.textContent = "1 tarefa em andamento";
    } else {
        statusText.textContent = `${pending} / ${todos.length} tarefas em andamento`;
    }
}

function addTodo() {
    const newTodoText = todoInput.value.trim();
    if (!newTodoText) {
        alert("Por favor, digite uma tarefa");
        return;
    }

    const newTodo = {
        id: todos.length + 1,
        text: newTodoText,
        done: false,
    };

    todos.unshift(newTodo);

    saveTodos();
    renderTodos();

    todoInput.value = "";
}

function toggleDone(id) {
    const todo = todos.find((todo) => todo.id === id);
    todo.done = !todo.done;

    saveTodos();
    renderTodos();
}

function removeTodo(id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos.splice(todoIndex, 1);

    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
