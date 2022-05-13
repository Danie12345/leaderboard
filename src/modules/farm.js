import { sky } from './sky.js';

const farmBack = document.createElement('div');
farmBack.classList.add('farm');
document.body.appendChild(farmBack);

const dt = new Date();
let secs = 6*3600 - dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
console.log(secs/3600);
let deg = 0;
const fps = 30;
const tickRate = 1000/fps;
const colors = {day: ''};

const recolor = (a, b, u) => {
  return (1 - u) * a + u * b;
};

const fade = (el, start, end, duration) => {
  var steps = duration / tickRate;
  var step_u = 1.0 / steps;
  var u = 0.0;
  var r = Math.round(recolor(start.r, end.r, u));
  var g = Math.round(recolor(start.g, end.g, u));
  var b = Math.round(recolor(start.b, end.b, u));
  var colorname = 'rgb(' + r + ',' + g + ',' + b + ')';
  el.style.backgroundImage = colorname;
  u += step_u;
};

const skyUpdate = () => {
  deg = 15 * secs * tickRate;
  sky.style.transform = `rotate(${deg}deg)`;
  fade(sky, {r: 10, g: 40, b: 160}, {r: 210, g: 240, b: 190}, 10);
}
skyUpdate();

const tick = () => {
  secs -= 1/(3600*tickRate);
  skyUpdate();
}

export const start = () => {
  setInterval(tick, tickRate);
}