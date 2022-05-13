import { sky } from './sky.js';

const farmBack = document.createElement('div');
farmBack.classList.add('farm');
document.body.appendChild(farmBack);

const dt = new Date();
let secs = 6*3600 - dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
let deg = 0;
const fps = 30;
const tickRate = 1000/fps;

const skyUpdate = () => {
  secs -= tickRate / 360;
  deg = secs;
  sky.style.transform = `rotate(${deg}deg)`;
}
skyUpdate();

const tick = () => {
  secs -= 1/(3600*tickRate);
  skyUpdate();
}

export const start = () => {
  setInterval(tick, tickRate);
}