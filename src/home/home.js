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
