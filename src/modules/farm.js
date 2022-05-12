import { sky } from './sky.js';

const dt = new Date();
let secs = dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));

const tick = () => {
  secs += 1;
  updateRotate(sky);
}

const updateRotate = (obj) => {
  obj
}

export const start = () => {
  setInterval(tick, 1000);
}