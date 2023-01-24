export default class MovieService {
  _apiKey = '?api_key=be8a0bc3eba398701aa16c9878ef0a06';
  _apiURL = 'https://api.themoviedb.org/3/movie/';
  _apiSearchURL = `https://api.themoviedb.org/3/search/movie${this._apiKey}`;

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

  async searchMovies(query){
    try {
      const res = await fetch(`${this._apiSearchURL}&query=${query}`)
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
};