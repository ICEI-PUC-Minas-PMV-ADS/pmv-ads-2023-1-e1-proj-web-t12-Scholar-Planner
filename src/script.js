// nossas variaveis / endereço de nossas memórias
const inputUsername = document.getElementById('username');
const loginButton = document.getElementById('login-button');

// addEventLister
// ouvir determinado evento
// login.addEventListener('nomeDoEvento', nomeDaFuncao)

loginButton.addEventListener('click', login);

// condional estiver certa
// entao faça tal coisa

// se nao
// faça tal coisa

// ! negação

// = atribuição
// == comprando compra o dado
// === comprando igual mesmo semelhante // tipo do dado, number, string

function login() {
  if (!inputUsername.value) {
    alert('Digite o seu nome');
  } else {
    window.location.href = 'home.html';
  }
}
