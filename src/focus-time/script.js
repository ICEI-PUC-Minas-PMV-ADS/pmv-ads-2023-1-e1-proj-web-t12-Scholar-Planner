const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');

playButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

// declaração de variáveis para usar nas funções abaixo

let startTime;
let elapsedTime = 0;
let timerInterval;

// conversão de tempo para o formato de horas, minutos e milissegundos
function timeToString(time) {
  let diffInHours = time / 3600000;
  let hours = Math.floor(diffInHours);

  let diffInMinutes = (diffInHours - hours) * 60;
  let minutes = Math.floor(diffInMinutes);

  let diffInSeconds = (diffInMinutes - minutes) * 60;
  let seconds = Math.floor(diffInSeconds);

  let diffInMilisseconds = (diffInSeconds - seconds) * 100;
  let milisseconds = Math.floor(diffInMilisseconds);

  let formattedMM = minutes.toString().padStart(2, '0');
  let formattedSS = seconds.toString().padStart(2, '0');
  let formattedMS = milisseconds.toString().padStart(2, '0');

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function showButton(buttonKey) {
  const buttonToShow = buttonKey === 'play' ? playButton : pauseButton;
  const buttonToHide = buttonKey === 'play' ? pauseButton : playButton;
  buttonToShow.style.display = 'block';
  buttonToHide.style.display = 'none';
}

// Criando função para modificar a innerHTML
function print(txt) {
  document.getElementById('display').innerHTML = txt;
}
// Criando as funções de start, pause e reset
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton('pause');
}

function pause() {
  clearInterval(timerInterval);
  showButton('play');
}
function reset() {
  clearInterval(timerInterval);
  print('00:00:00');
  elapsedTime = 0;
  showButton('play');
}
