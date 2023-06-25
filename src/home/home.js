// Criei overlaymodal pra fazer o pop-up - ohasi
// Atualizei eventlisteners e variáveis Todo
// func renderTodos atualizada

const buttonTime = document.getElementById("focusTime-button");
const username = document.querySelector(".username");

function getNameAndInsertsItOnTheScreen() {
  const usernameLocalStorage = localStorage.getItem("@SchoolPlaner/username");
  username.innerHTML = usernameLocalStorage;
}

buttonTime.addEventListener("click", pageFocusTime);
function pageFocusTime() {
  window.location.href = "../focus-time/index.html";
}

getNameAndInsertsItOnTheScreen();

const columnsContainer = document.getElementById("columns-container");
const addNewColumn = document.getElementById("add-column-button");
const overlayModal = document.getElementById("overlay-content");
const inputNameColumns = document.getElementById("name-column-input");
const saveNamesColumn = document.querySelector(".save-column-name-button");
const closeModalButton = document.querySelector(".modal-close");

let getColumns =
  JSON.parse(localStorage.getItem("@SchoolPlaner/columns")) || [];

function openModalCreateColumn() {
  overlayModal.style.display = "flex";
}

function checkTheLengthOfArray() {
  if (getColumns.length < 7) {
    openModalCreateColumn();
  } else {
    alert("Número máximo de colunas atingido.");
  }
}

function createNewColumn() {
  let columnValues;
  let lastID = parseInt(localStorage.getItem("@SchoolPlaner/lastid")) || 0;
  let nextID = lastID + 1;

  if (inputNameColumns.value) {
    columnValues = {
      id: nextID,
      name: inputNameColumns.value,
      tasks: [],
    };

    localStorage.setItem("@SchoolPlaner/lastid", nextID);
    getColumns.push(columnValues);
    saveColumn(getColumns);
    overlayModal.style.display = "none";
    inputNameColumns.value = "";
    renderColumn();
  } else {
    alert("Por favor, digite o nome da coluna");
  }
}

function renderColumn() {
  columnsContainer.innerHTML = "";

  getColumns.forEach((column) => {
    const columnBox = document.createElement("div");
    columnBox.classList.add("column");
    columnBox.id = column.id;
    const columnsName = document.createElement("p");
    columnsName.classList.add("columnsname");
    columnsName.innerHTML = column.name;

    const removecolumn = document.createElement("button");
    removecolumn.classList.add("removecolumn");
    removecolumn.innerHTML = '<img class="trash-icon" src="../images/trash-icon.png"><p id="excluircolunas">EXCLUIR COLUNA</p>';
    removecolumn.id = column.id;
    removecolumn.addEventListener("click", delet);

    const toDoListContainer = document.createElement("form");
    toDoListContainer.classList.add("todo-form");
    toDoListContainer.id = `todo-list-container-${column.id}`;
    const todoListUl = document.createElement("ul");
    todoListUl.id = `todo-list-${column.id}`;
    const inputToNewTask = document.createElement("input");
    inputToNewTask.id = `input-${column.id}`;
    inputToNewTask.placeholder = "Digite uma tarefa...";
    const buttonToAddTask = document.createElement("button");
    buttonToAddTask.innerText = "+";
    buttonToAddTask.addEventListener("click", () => addTodoColumn(column.id));
    toDoListContainer.append(inputToNewTask, buttonToAddTask);

    columnBox.append(columnsName, toDoListContainer, todoListUl);
    columnsContainer.appendChild(columnBox);
    columnBox.appendChild(removecolumn);
    renderTodos(column.id);
  });
}

function delet(event) {
  const buttonId = event.currentTarget.id;
  const columnIndex = getColumns.findIndex((column) => column.id == buttonId);
  if (columnIndex !== -1) {
    getColumns.splice(columnIndex, 1);
    saveColumn(getColumns);
    renderColumn();
  }
}

function closeModal() {
  overlayModal.style.display = "none";
}

renderColumn();

addNewColumn.addEventListener("click", checkTheLengthOfArray);
saveNamesColumn.addEventListener("click", createNewColumn);
closeModalButton.addEventListener("click", closeModal);

function saveColumn(column) {
  localStorage.setItem("@SchoolPlaner/columns", JSON.stringify(column));
}

function renderTodos(id) {
  const todoListUl = document.getElementById(`todo-list-${id}`);
  todoListUl.innerHTML = "";
  const indice = getColumns.findIndex((x) => x.id == id);

  getColumns[indice]?.tasks?.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    if (todo.done) {
      li.classList.add("completed");
    }

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = todo.done;
    cb.addEventListener("change", () => toggleDone(todo.id, id));

    li.appendChild(cb);

    const span = document.createElement("span");
    span.textContent = todo.text;

    li.appendChild(span);

    const xmlns = "http://www.w3.org/2000/svg";

    const btn = document.createElementNS(xmlns, "svg");
    btn.setAttribute("viewBox", "0 0 24 24");
    btn.classList.add("remove-button");
    btn.addEventListener("click", () => removeTodoColumn(todo.id, id));

    const path = document.createElementNS(xmlns, "path");
    path.setAttribute(
      "d",
      "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    );

    btn.appendChild(path);

    li.appendChild(btn);

    todoListUl.appendChild(li);
  });
}

// addToDoColumn atualizado - ohasi

function addTodoColumn(id) {
  const inputValue = document.getElementById(`input-${id}`);
  const newTodoText = inputValue.value.trim();
  const indice = getColumns.findIndex((x) => x.id == id);

  if (!newTodoText) {
    alert("Por favor, digite uma tarefa");
  } else {
    const newTodo = {
      id: getColumns[indice].tasks.length,
      text: newTodoText,
      done: false,
    };
    getColumns[indice].tasks.push(newTodo);
    saveColumn(getColumns);
    renderTodos(id);
    inputValue.value = "";
  }
}

// função remove atualizada - ohasi

function removeTodoColumn(todoId, columnId) {
  const columnIndex = getColumns.findIndex((column) => column.id == columnId);
  if (columnIndex !== -1) {
    const todoIndex = getColumns[columnIndex].tasks.findIndex(
      (todo) => todo.id === todoId
    );
    if (todoIndex !== -1) {
      getColumns[columnIndex].tasks.splice(todoIndex, 1);
      saveColumn(getColumns);
      renderTodos(columnId);
    }
  }
}

// toggleDone atualizada - ohasi

function toggleDone(todoId, columnId) {
  const columnIndex = getColumns.findIndex((column) => column.id == columnId);
  if (columnIndex !== -1) {
    const todo = getColumns[columnIndex].tasks.find(
      (todo) => todo.id === todoId
    );
    if (todo) {
      todo.done = !todo.done;
      saveColumn(getColumns);
      renderTodos(columnId);
    }
  }
}

