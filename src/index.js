import './index.css';
import ScoresAPI from './modules/scores-api.js';

const refreshBtn = document.getElementById('refresh');

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const submitBtn = document.getElementById('submit');
const board = document.getElementById('board');

const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const scores = new ScoresAPI(api, board);

const display = (board) => {
  board.displayDOM();
}

const submitScore = async () => {
  if (nameInput.value === '') return;
  if (scoreInput.value === '') return;
  await scores.setScore({user: nameInput.value, score: scoreInput.value});
  display(scores);
}

refreshBtn.addEventListener('click', async () => {
  await scores.getScores();
  display(scores);
});

submitBtn.addEventListener('click', submitScore);

window.addEventListener('load', () => {refreshBtn.dispatchEvent(new Event('click'))});