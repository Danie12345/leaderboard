let sky = document.createElement('div');
sky.classList.add('sky');
let sun = document.createElement('div');
sun.classList.add('sun');

const newStar = () => {
  const star = document.createElement('div');
  star.classList.add('star');
  return star;
}

const newCloud = () => {
  const cloud = document.createElement('div');
  cloud.classList.add('cloud');
  return cloud;
}

for (let i = 0; i < 50; i += 1) {
  const star = newStar();
  star.classList.add('star');
  star.style.animation = `flicker ${Math.random()*Math.random()*10}s ease alternate infinite`;
  star.style.position = 'absolute';
  let [x, y] = [Math.random()*100, 60 + Math.random()*40];
  star.style.top = `${y}%`;
  star.style.left = `${x}%`;
  star.style.width = `${x/5}px`;
  star.style.height = `${y/5}px`;
  star.style.borderRadius = `${Math.random()*10}px`;
  sky.appendChild(star);
}


sky.appendChild(sun);
document.querySelector('#game-background').appendChild(sky);

export { sky };