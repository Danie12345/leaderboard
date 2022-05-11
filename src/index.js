import './index.css';
import ScoresAPI from './modules/scores-api.js';

const refreshBtn = document.getElementById('refresh');

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const submitBtn = document.getElementById('submit');
const board = document.getElementById('board');

const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const scores = new ScoresAPI(api, board);

refreshBtn.addEventListener('click', () => {
  scores.getScores();
  scores.displayDOM();
});

submitBtn.addEventListener('click', () => {
  scores.setScore({name: nameInput.value, score: scoreInput.value});
  scores.displayDOM();
});

window.addEventListener('load', () => {submitBtn.dispatchEvent(new Event('click'))});