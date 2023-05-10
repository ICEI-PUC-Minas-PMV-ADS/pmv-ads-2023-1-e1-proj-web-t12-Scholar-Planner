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

const buttonteste = document.getElementById('teste');
buttonteste.addEventListener('click', pagteste);

function pagteste() {
  console.log('batata');
  window.location.href = '../testedraganddrop/index.html';
}

getNameAndInsertsItOnTheScreen();
