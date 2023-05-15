const inputUsername = document.getElementById('username');
const loginButton = document.getElementById('login-button');
const messageError = document.querySelector('.message-error');

loginButton.addEventListener('click', login);

function getUsername() {
  const usernameValue = inputUsername.value;
  localStorage.setItem('@SchoolPlaner/username', usernameValue);
}

function removeUsername() {
  const hasUsernameInLocalStorage = localStorage.getItem(
    '@SchoolPlaner/username'
  );
  if (hasUsernameInLocalStorage) {
    localStorage.removeItem('@SchoolPlaner/username');
  }
}

function setErrorMessage() {
  messageError.style.display = 'block';
  messageError.innerHTML = 'Por favor, digite seu nome.';
}

function login() {
  if (!inputUsername.value) {
    setErrorMessage();
  } else {
    messageError.style.display = 'none';
    window.location.href = '../home/home.html';
    getUsername();
  }
}

removeUsername();
