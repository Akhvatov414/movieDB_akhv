export default class MovieService {
  _apiKey = '?api_key=be8a0bc3eba398701aa16c9878ef0a06';
  _apiURL = 'https://api.themoviedb.org/3/movie/';
  _apiAuth = `https://api.themoviedb.org/3/authentication/guest_session/new${this._apiKey}`;
  _apiGenres = `https://api.themoviedb.org/3/genre/movie/list${this._apiKey}`
  _apiSearchURL = `https://api.themoviedb.org/3/search/movie${this._apiKey}`;


  async getGuestSession() {
    try{
      const res = await fetch(this._apiAuth);
      return await res.json();
    } catch(err) {
      throw new Error('Oops');
    }
  }


  async getMovies(url) {
    try {
      const res = await fetch(`${this._apiURL}${url}${this._apiKey}`);
      return await res.json()
    } catch (err) {
      console.log(err);
      throw new Error('Oops')
    }
  };

  async getTop() {
    try {
      const res = await this.getMovies('top_rated');
      console.log(res);
      return res.results;
    } catch(err) {
      console.log(err.code);
      throw new Error('Oops')
    }    
  };

  async searchMovies(query, page){
    try {
      const res = await fetch(`${this._apiSearchURL}&query=${query}&page=${page}`)
      return await res.json();
    } catch(err) {
      console.log(err.message);
      throw new Error('Oops');
    }    
  };

  async getResults(query) {
    try {
      const res = await this.searchMovies(query);
      return await res.results;
    } catch(err) {
      throw new Error('Oops')
    }
  }
  
  async getGenres() {
    try {
      const res = await fetch(this._apiGenres);
      return res.json();
    } catch(err) {
      throw new Error('Oops')
    }
  }
};