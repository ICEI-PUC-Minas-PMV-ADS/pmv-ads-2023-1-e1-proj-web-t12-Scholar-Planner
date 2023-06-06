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
const overlayModal = document.getElementById('overlay-content');
const inputNameColumns = document.getElementById('name-column-input');
const saveNamesColumn = document.querySelector('.save-column-name-button');
const closeModalButton = document.querySelector('.modal-close');

const getColumns =
  JSON.parse(localStorage.getItem('@SchoolPlaner/columns')) || [];

function openModalCreateColumn() {
  overlayModal.style.display = 'flex';
}

function checkTheLengthOfArray() {
  if (getColumns.length < 7) {
    openModalCreateColumn();
  } else {
    alert('Número máximo de colunas atingido.');
  }
}

function createNewColumn() {
  let columnValues;

  if (inputNameColumns.value) {
    columnValues = {
      id: getColumns.length,
      name: inputNameColumns.value,
      tasks: [],
    };

    getColumns.push(columnValues);
    saveColumn(getColumns);
    overlayModal.style.display = 'none';
    inputNameColumns.value = '';
    renderColumn();
  } else {
    alert('Por favor, digite o nome da coluna');
  }
  location.reload();
}

function renderColumn() {
  columnsContainer.innerHTML = '';
  
  getColumns.forEach((column) => {
    const columnBox = document.createElement('div');
    columnBox.classList.add('column');
    columnBox.id = column.id;
    const columnsName = document.createElement('p');
    columnsName.innerHTML = column.name;
    


    //SHIGERY REMOVE COLUNA
    //INICIO

  const removecolumn = document.createElement('button'); //entrou um botao
  removecolumn.classList.add('removecolumn'); //add uma classe para pode usar o css
  removecolumn.innerHTML = '<p> EXCLUIR COLUNA</p>'; // inclui um texto dentro do botao
  removecolumn.id = column.id; // identifiquei q o id é o mesmo do da coluna
  removecolumn.addEventListener('click', delet); //se clicar ele vai direcionar para a função delet
  console.log (removecolumn) //so para ver se ta funcinando o botao

  
  
    //FIM

    //const editName = document.createElement('button');
    // editName.id = `edit-column-${column.id}`;
    // editName.innerHTML = '✏️';
    // editName.addEventListener('click', () => editNameColumn(column.id));

    const toDoListContainer = document.createElement('form');
    toDoListContainer.classList.add('todo-form');
    toDoListContainer.id = `todo-list-container-${column.id}`;
    const todoListUl = document.createElement('ul');
    todoListUl.id = `todo-list-${column.id}`;
    const inputToNewTask = document.createElement('input');
    inputToNewTask.id = `input-${column.id}`;
    inputToNewTask.placeholder = 'Digite uma tarefa...';
    const buttonToAddTask = document.createElement('button');
    buttonToAddTask.innerText = '+';
    buttonToAddTask.addEventListener('click', () => addTodo(column.id));
    toDoListContainer.append(inputToNewTask, buttonToAddTask);

    columnBox.append(columnsName, toDoListContainer, todoListUl);
    columnsContainer.appendChild(columnBox);
    columnBox.appendChild(removecolumn);
    renderTodos(column.id);
  });
}

//função deletar

function delet(event) {
  const buttonId = event.currentTarget.id; //eu to pegando o id do botao e indeificando que eu to fazendo isso pelo id
  const columnIndex = getColumns.findIndex(column => column.id == buttonId); // tem que colocar um ou 2 = se nao n funciona
  if (columnIndex !== -1) { // ele nao faz isso se nao tiver o parametro
    getColumns.splice(columnIndex, 1); // Remove a coluna do array pelo índice
    saveColumn(getColumns); // salva o deletar
    renderColumn(); //renderiza novamente a coluna
   
  }
  
}
  



//fim

function closeModal() {
  overlayModal.style.display = 'none';
}

// events
saveNamesColumn.addEventListener('click', () => createNewColumn());
closeModalButton.addEventListener('click', () => closeModal());
addNewColumn.addEventListener('click', checkTheLengthOfArray);

function saveColumn(column) {
  localStorage.setItem('@SchoolPlaner/columns', JSON.stringify(column));
}

// function editNameColumn(column) {
//   openModalCreateColumn();
// }

function removeCurrentColumn(event) {
  let currentColumn = event.currentTarget.parentElement;
  columnsArray.splice(Number(currentColumn.id.split('-').at(-1)), 1);
  columnsContainer.removeChild(currentColumn);
}

function renderTodos(id) {
  const todoListUl = document.getElementById(`todo-list-${id}`);

  getColumns[id]?.tasks?.forEach((todo) => {
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
renderColumn();

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

function addTodo(id) {
  const inputValue = document.getElementById(`input-${id}`);
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
    renderTodos(id);
    inputValue.value = '';
  }
}

// function toggleDone(id) {
//   const todo = getColumns[id].tasks.find((todo) => todo.id === id);
//   todo.done = !todo.done;

//   saveColumn(todo);
//   renderTodos();
// }

 function removeTodo(id) {
   const todoIndex = getColumns[id].tasks.findIndex((todo) => todo.id === id);
   todos.splice(todoIndex, 1);

   saveColumn(todoIndex);
   renderTodos();
}


// function saveTodos() {
//   localStorage.setItem('todos', JSON.stringify(todos));