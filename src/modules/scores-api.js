export default class ScoresAPI {
  constructor(api, dom) {
    this.api = api;
    this.endpoint = '';
    this.dom = dom;
    this.scores = []; // Because making too many API calls is expensive
    this.getLocalEndpoint();
  }

  #getLocalEndpoint() {
    this.endpoint = JSON.parse(localStorage.getItem('endpoint'));
  }
  
  #setLocalEndpoint() {
    localStorage.setItem('endpoint', JSON.stringify(this.endpoint));
  }
  
  displayDOM = () => {
    this.dom.innerHTML = '';
    this.scores.forEach((item) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'score');
      li.setAttribute('tabindex', '0');
      li.innerHTML = `${item.name}: ${item.score}`;
      this.dom.appendChild(li);
    });
  }
  
  getLocalEndpoint() {
    if (localStorage.getItem('endpoint') !== null) {
      this.#getLocalEndpoint();
      return;
    }
    this.getEndpoint();
  }

  getEndpoint = async () => {
    let point;
    const endpoint = async () => {
      const response = await fetch(`${this.api}/games/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: 'Daniel\'s Leaderboard'})
      })
      .then(response => response.text());
      'MBU3sywbFckvoeDFoe5X'
      point = response.split(' ')[3];
    }
    await endpoint();
    this.endpoint = `${this.api}/${point}/scores`;
    await this.#setLocalEndpoint();
  }

  setScore = async (data) => {
    await fetch(this.endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    this.scores.push(data);
  }
  
  getScores = async () => {
    this.scores = await fetch(this.endpoint)
    .then(
      (response) => {console.log(response); response.json()},
      (error) => {console.log(error, 'LOL')}
    )
    .response;
    // console.log(this.scores)
  }
}