export default class MovieService {
  _apiKey = '?api_key=be8a0bc3eba398701aa16c9878ef0a06';
  _apiURL = 'https://api.themoviedb.org/3/movie/';
  _apiAuth = `https://api.themoviedb.org/3/authentication/guest_session/new${this._apiKey}`;
  _apiGenres = `https://api.themoviedb.org/3/genre/movie/list${this._apiKey}`
  _apiSearchURL = `https://api.themoviedb.org/3/search/movie${this._apiKey}`;
  _apiRatedURL = `https://api.themoviedb.org/3/guest_session/`;
  _apiGuestId = '9e101ea6ecd1c74586d1172648e05758';


  async getGuestSession() {
    try{
      const res = await fetch(this._apiAuth);
      console.log(res);
      return res.json();
    } catch(err) {
      throw new Error('Oops');
    }
  }


  async getMovies(url) {
    try {
      const res = await fetch(`${this._apiURL}${url}${this._apiKey}`);
      return await res.json()
    } catch (err) {
      throw new Error('Oops')
    }
  };

  async getTop() {
    try {
      const res = await this.getMovies('top_rated');
      console.log(res);
      return res.results;
    } catch(err) {
      throw new Error('Oops');
    }    
  };

  async searchMovies(query, page){
    try {
      const res = await fetch(`${this._apiSearchURL}&query=${query}&page=${page}`)
      return res.json();
    } catch(err) {
      throw new Error('Oops');
    }    
  };

  async getResults(query) {
    try {
      const res = await this.searchMovies(query);
      return await res.results;
    } catch(err) {
      throw new Error('Oops');
    }
  }
  
  async getGenres() {
    try {
      const res = await fetch(this._apiGenres);
      return res.json();
    } catch(err) {
      throw new Error('Oops');
    }
  }

  async rateMovie(id, rate) {
    try {
      const sessionId = localStorage.getItem('guestSessionId');
      const queryUrl = `${this._apiURL}${id}/rating${this._apiKey}&guest_session_id=${sessionId}`;
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
    } catch(err) {
      throw new Error('Oops');
    }
  }

  async getRatedMovies(page) {
    try{
      const sessionId = localStorage.getItem('guestSessionId');
      const url = `${this._apiRatedURL}${sessionId}/rated/movies${this._apiKey}&page=${page}`;
      const res = await fetch(url);
      //console.log(res);
      
      return res.json();
    } catch(err) {
      throw new Error('Oops');
    }
  }
};