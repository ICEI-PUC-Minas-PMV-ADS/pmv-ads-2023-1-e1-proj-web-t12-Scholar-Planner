const buttonTime = document.getElementById('focusTime-button');
const username = document.querySelector('.username');

function insertUsername() {
  const usernameLocalStorage = localStorage.getItem('@SchoolPlaner/username');
  username.innerHTML = usernameLocalStorage;
}

buttonTime.addEventListener('click', pageFocusTime);

function pageFocusTime() {
  window.location.href = '../focus-time/index.html';
}

insertUsername();
