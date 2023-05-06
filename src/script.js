const inputUsername = document.getElementById('username');
const loginButton = document.getElementById('login-button');
const messageError = document.querySelector('.message-error');

loginButton.addEventListener('click', login);

function getUsername() {
  const usernameValue = inputUsername.value;
  localStorage.setItem('@SchoolPlaner/username', usernameValue);
}

function validateField() {
  messageError.style.display = 'block';
  messageError.innerHTML = 'Por favor, digite seu nome';
}

function removeUsername() {
  localStorage.removeItem('@SchoolPlaner/username');
}

function login() {
  if (!inputUsername.value) {
    validateField();
    removeUsername();
  } else {
    messageError.style.display = 'none';
    window.location.href = '../home/home.html';
    getUsername();
  }
}
