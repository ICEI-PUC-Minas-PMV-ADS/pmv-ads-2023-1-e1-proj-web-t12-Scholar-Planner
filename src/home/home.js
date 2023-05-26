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

const getColumns =
  JSON.parse(localStorage.getItem('@SchoolPlaner/columns')) || [];

// get -> pegar

// const columnsArray = [];

function checkTheLengthOfArray(event) {
  if (getColumns.length < 7) {
    createNewColumn(event);
  } else {
    alert('Número máximo de colunas atingido.');
  }
}

function createNewColumn(event) {
  const columnsName = prompt('Por favor, digite o nome da coluna');
  // console.log(columnsContainer.closest('div'));

  const columnValues = {
    id: getColumns.length,
    name: columnsName,
    tasks: [],
  };

  getColumns.push(columnValues);
  saveColumn(getColumns);
  // renderColumn();
}

function saveColumn(column) {
  localStorage.setItem('@SchoolPlaner/columns', JSON.stringify(column));
}

function renderColumn() {
  getColumns.forEach((column) => {
    const columnBox = document.createElement('div');
    columnBox.classList.add('column');
    columnBox.id = column.id;
    const columnsName = document.createElement('p');
    columnsName.innerHTML = column.name;

    const toDoListContainer = document.createElement('div');
    toDoListContainer.classList.add('todo-form');
    toDoListContainer.id = `todo-list-container-${column.id}`;
    const todoListUl = document.createElement('ul');
    todoListUl.id = `todo-list-${column.id}`;
    const inputToNewTask = document.createElement('input');
    inputToNewTask.id = `input-${column.id}`;
    const buttonToAddTask = document.createElement('button');
    buttonToAddTask.innerText = '+';
    buttonToAddTask.addEventListener('click', (event) =>
      addTodo(event, column.id)
    );
    toDoListContainer.append(inputToNewTask, buttonToAddTask);

    columnBox.append(columnsName, toDoListContainer, todoListUl);

    columnsContainer.appendChild(columnBox);
  });
}

renderColumn();

// function createColumn() {
//   const column = document.createElement('div');
//   column.classList.add('column');
//   column.id = `column-${columnsArray.length}`;

//   const todoForm = document.createElement('form');
//   todoForm.classList.add('todo-form');
//   todoForm.innerHTML = `
//     <input
//       type="text"
//       id="todoInput"
//       placeholder="Digite sua tarefa aqui"/>
//     <button>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="2"
//         stroke="currentColor"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M12 4.5v15m7.5-7.5h-15"
//         />
//       </svg>
//     </button>`;

//   const removeColumnButton = document.createElement('button');
//   removeColumnButton.innerHTML = 'Excluir coluna';
//   removeColumnButton.addEventListener('click', removeCurrentColumn);

//   columnsContainer.appendChild(column);
//   column.append(todoForm, removeColumnButton);
//   columnsArray.push(column);
// }

addNewColumn.addEventListener('click', checkTheLengthOfArray);

function removeCurrentColumn(event) {
  let currentColumn = event.currentTarget.parentElement;
  columnsArray.splice(Number(currentColumn.id.split('-').at(-1)), 1);
  columnsContainer.removeChild(currentColumn);
}

// todo-list
// const todos = JSON.parse(localStorage.getItem('todos')) || [];

// const todoForm = document.querySelector('.todo-form');
// const todoInput = document.getElementById('todoInput');
// const todoList = document.getElementById('todoList');
// const statusText = document.getElementById('statusText');

// todoForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   addTodo();
// });

function renderTodos(id) {
  const todoListUl = document.getElementById(`todo-list-${id}`);
  // todoListUl.innerHTML = '';

  getColumns[id]?.tasks?.forEach((todo) => {
    console.log(todo);
    const li = document.createElement('li');
    li.classList.add('todo-item');

    if (todo.done) {
      li.classList.add('completed');
    }

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = todo.done;
    cb.addEventListener('change', () => toggleDone(todo.id));

    li.appendChild(cb);

    const span = document.createElement('span');
    span.textContent = todo.text;

    li.appendChild(span);

    const xmlns = 'http://www.w3.org/2000/svg';

    const btn = document.createElementNS(xmlns, 'svg');
    btn.setAttribute('viewBox', '0 0 24 24');
    btn.classList.add('remove-button');
    btn.addEventListener('click', () => removeTodo(todo.id));

    const path = document.createElementNS(xmlns, 'path');
    path.setAttribute(
      'd',
      'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    );

    btn.appendChild(path);

    li.appendChild(btn);

    todoListUl.appendChild(li);
  });

  // showStatus();
}

renderTodos();

// function showStatus() {
//   if (!todos.length) {
//     statusText.textContent = 'Você não possui tarefas.';
//     return;
//   }

//   const pending = todos.filter((todo) => !todo.done).length;
//   if (pending === 0) {
//     statusText.textContent = 'Tudo feito!';
//   } else if (pending === 1) {
//     statusText.textContent = '1 tarefa em andamento';
//   } else {
//     statusText.textContent = `${pending} / ${todos.length} tarefas em andamento`;
//   }
// }

function addTodo(event, id) {
  const inputValue = document.getElementById(`input-${id}`);
  const idOfTheColumn = document.getElementById(`todo-list-container-${id}`);

  const newTodoText = inputValue.value.trim();

  if (!newTodoText) {
    alert('Por favor, digite uma tarefa');
  } else {
    const newTodo = {
      id: getColumns[id].tasks.length,
      text: newTodoText,
      done: false,
    };
    getColumns[id].tasks.push(newTodo);
    saveColumn(getColumns);
    // saveTodos();
    renderTodos(id);
    inputValue.value = '';
  }
}

renderTodos();

// function toggleDone(id) {
//   const todo = todos.find((todo) => todo.id === id);
//   todo.done = !todo.done;

//   saveTodos();
//   renderTodos();
// }

// function removeTodo(id) {
//   const todoIndex = todos.findIndex((todo) => todo.id === id);
//   todos.splice(todoIndex, 1);

//   saveTodos();
//   renderTodos();
// }

// function saveTodos() {
//   localStorage.setItem('todos', JSON.stringify(todos));
// }
