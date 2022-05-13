const sky = document.createElement('div');
sky.classList.add('sky');
const sun = document.createElement('div');
sun.classList.add('sun');

const newStar = () => {
  const star = document.createElement('div');
  star.classList.add('star');
  return star;
};

const newCloud = (angle) => {
  const cloud = document.createElement('div');
  for (let i = Math.round(Math.random() * 3); i >= 1; i -= 1) {
    const bump = document.createElement('div');
    const [x, y] = [Math.random() * 30, Math.random() * 30];
    let color = 'white';
    color = angle >= 360 || angle < 160 ? 'white' : '#a5a5a5';
    color = angle > 330 || angle <= 180 ? color : 'gray';
    bump.style.position = 'absolute';
    bump.style.top = `${y / 1.5}px`;
    bump.style.left = `${(Math.random() * 2 - 1) * 1.2 * x}px`;
    bump.style.width = `${(1.1 * Math.max(x, y)) / i}px`;
    bump.style.height = `${(1.1 * Math.max(x, y)) / i}px`;
    bump.style.borderRadius = '50%';
    bump.style.backgroundColor = `
    ${color}
    `;
    cloud.appendChild(bump);
  }
  cloud.classList.add('cloud');
  return cloud;
};

const makeStars = () => {
  for (let i = 0; i < 100; i += 1) {
    const star = newStar();
    star.classList.add('star');
    star.style.animation = `flicker ${Math.random() * 10}s ease alternate infinite`;
    star.style.position = 'absolute';
    const [x, y] = [Math.random() * 100, 60 + Math.random() * 40];
    star.style.top = `${y}%`;
    star.style.left = `${x}%`;
    star.style.width = `${x / 16}px`;
    star.style.height = `${x / 16}px`;
    star.style.borderRadius = '50%';
    sky.appendChild(star);
  }
};

function makeClouds() {
  const rad = sky.offsetWidth / 2;
  for (let i = 0; i < 160; i += 1) {
    const angle = Math.random() * 360;
    const mag = Math.random() * rad * 0.5 + rad * 0.4;
    const [x, y] = [
      Math.cos((angle * Math.PI) / 180) * mag, Math.sin((angle * Math.PI) / 180) * mag,
    ];
    const cloud = newCloud((angle + 180 + Math.random() * 12 - 6) % 360);
    cloud.classList.add('cloud');
    cloud.style.position = 'absolute';
    cloud.style.top = `${y + rad}px`;
    cloud.style.left = `${x + rad}px`;
    cloud.style.width = `${x / 16}px`;
    cloud.style.height = `${x / 16}px`;
    cloud.style.transform = `rotate(${angle}deg)`;
    sky.appendChild(cloud);
  }
}

sky.appendChild(sun);
document.querySelector('#game-background').appendChild(sky);

window.addEventListener('load', () => {
  makeStars();
  makeClouds();
});

export { sky };