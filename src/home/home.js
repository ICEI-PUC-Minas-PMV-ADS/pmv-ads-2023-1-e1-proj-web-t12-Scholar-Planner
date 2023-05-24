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
  column.innerHTML = `<div class="card-list"></div>`;

  const removeColumnButton = document.createElement('button');
  removeColumnButton.classList.add("removeColumnButton")
  removeColumnButton.innerHTML = 'Excluir coluna';
  removeColumnButton.addEventListener('click', removeCurrentColumn);

  const createCardButton = document.createElement('button');
  createCardButton.innerHTML = 'ADD Cartão';
  createCardButton.addEventListener('click', createCard);

 
  column.appendChild(createCardButton);
  

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

function createCard(event){
  let currentColumn = event.currentTarget.parentElement;
  let conteudo =`<p class="name-task">nome da tarefa</p>
  <div class="content-card">anotações</div>
    <div class="box-actions-button">
    <button class="save-button">V</button>
    <div class="guia-drag">•••</div>
    <button class="delete-button">X</button>
  </div>`;
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = `card-${currentColumn.id}-0`;
  card.innerHTML = conteudo; 
  let cardList = currentColumn.children[0]; 
  cardList.appendChild (card)
}




