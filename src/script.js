const inputUsername = document.getElementById('username');
const loginButton = document.getElementById('login-button');
const messageError = document.querySelector('.message-error');

loginButton.addEventListener('click', login);

function getUsername() {
  const username = inputUsername.value;
  localStorage.setItem('@SchoolPlaner/username', username);
}

function login() {
  if (!inputUsername.value) {
    messageError.style.display = 'block';
    messageError.innerHTML = 'Por favor, digite seu nome';
  } else {
    messageError.style.display = 'none';
    window.location.href = '../home/home.html';
    getUsername();
  }
}
