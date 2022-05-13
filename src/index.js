import './index.css';
import ScoresAPI from './modules/scores-api.js';
import start from './modules/farm.js';
import sound from './sound/farm.mp3';

start();

const farmSong = new Audio(sound);

const refreshBtn = document.getElementById('refresh');
const endpointToggle = document.getElementById('toggle-endpoint');

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const submitBtn = document.getElementById('submit');
const board = document.getElementById('board');

const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const universalEndpoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/648X8vEZi7IFlFzPwsx9/scores';
const scores = new ScoresAPI(api, board, universalEndpoint, true);

const display = (board) => {
  board.displayDOM();
};

const submitScore = async () => {
  if (nameInput.value === '') return;
  if (scoreInput.value === '') return;
  const data = { user: nameInput.value, score: scoreInput.value };
  if (scores.scores.indexOf(data) !== -1) return;
  nameInput.value = '';
  scoreInput.value = '';
  await scores.setScore(data);
  display(scores);
};

refreshBtn.addEventListener('click', async () => {
  await scores.getScores();
  display(scores);
});

endpointToggle.addEventListener('click', () => {
  scores.uniendpointUse = !scores.uniendpointUse;
  scores.getLocalEndpoint();
  endpointToggle.innerHTML = { true: 'Internet', false: 'LAN' }[scores.uniendpointUse];
  refreshBtn.dispatchEvent(new Event('click'));
});

submitBtn.addEventListener('click', submitScore);

document.addEventListener('mousemove', () => {
  farmSong.play();
});

window.addEventListener('load', () => { refreshBtn.dispatchEvent(new Event('click')); });