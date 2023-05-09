const inputUsername = document.getElementById('username');
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', login);

function login() {
  if (!inputUsername.value) {
    alert('Digite o seu nome');
  } else {
    window.location.href = '../home/home.html';
  }
}

