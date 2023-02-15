export default class MovieService {
  _apiKey = '?api_key=be8a0bc3eba398701aa16c9878ef0a06';
  _apiURL = 'https://api.themoviedb.org/3/';

  async getGuestSession() {
    try {
      const res = await fetch(`${this._apiURL}authentication/guest_session/new${this._apiKey}`);
      return res.json();
    } catch (err) {
      throw new Error('Oops');
    }
  }

  async getMovies(url) {
    try {
      const res = await fetch(`${this._apiURL}/movie/${url}${this._apiKey}`);
      return await res.json();
    } catch (err) {
      throw new Error('Oops');
    }
  }

  async getTop() {
    try {
      const res = await this.getMovies('top_rated');
      return res.results;
    } catch (err) {
      throw new Error('Oops');
    }
  }

  async searchMovies(query, page) {
    try {
      const res = await fetch(`${this._apiURL}search/movie${this._apiKey}&query=${query}&page=${page}`);
      return res.json();
    } catch (err) {
      throw new Error('Oops');
    }
  }

  async getResults(query) {
    try {
      const res = await this.searchMovies(query);
      return await res.results;
    } catch (err) {
      throw new Error('Oops');
    }
  }

  async getGenres() {
    try {
      const res = await fetch(`${this._apiURL}genre/movie/list${this._apiKey}`);
      return res.json();
    } catch (err) {
      throw new Error('Oops');
    }
  }

  async rateMovie(id, rate) {
    try {
      const sessionId = localStorage.getItem('guestSessionId');
      const queryUrl = `${this._apiURL}movie/${id}/rating${this._apiKey}&guest_session_id=${sessionId}`;
      const res = await fetch(queryUrl, {
        method: 'POST',
        body: JSON.stringify({
          value: rate,
        }),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      return res.json();
    } catch (err) {
      throw new Error('Oops');
    }
  }

  async getRatedMovies(page) {
    try {
      const sessionId = localStorage.getItem('guestSessionId');
      const url = `${this._apiURL}guest_session/${sessionId}/rated/movies${this._apiKey}&page=${page}`;
      const res = await fetch(url);

      return res.json();
    } catch (err) {
      throw new Error('Oops');
    }
  }
}
