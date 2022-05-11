export default class ScoresAPI {
  constructor(api, dom) {
    this.api = api;
    this.endpoint = '';
    this.dom = dom;
    this.scores = [];
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
    if (this.scores.length == 0) {
      const li = document.createElement('li');
      li.setAttribute('class', 'score');
      li.setAttribute('tabindex', '0');
      li.innerHTML = 'No elements found :C';
      this.dom.appendChild(li);
      return;
    }
    this.scores = this.scores.sort((a, b) => b.score - a.score);
    this.scores.forEach((item) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'score');
      li.setAttribute('tabindex', '0');
      li.innerHTML = `${item.user}: ${item.score}`;
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
      point = response.split(' ')[3];
    }
    await endpoint();
    this.endpoint = `${this.api}/games/${point}/scores`;
    this.#setLocalEndpoint();
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
    const scores = await fetch(this.endpoint)
    .then(
      response => response.json(),
    );
    this.scores = scores.result;
  }
}