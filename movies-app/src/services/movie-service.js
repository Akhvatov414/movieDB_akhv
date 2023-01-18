export default class MovieService {
  _apiKey = '?api_key=be8a0bc3eba398701aa16c9878ef0a06';
  _apiURL = 'https://api.themoviedb.org/3/movie/';

  async getMovies(url) {
    const res = await fetch(`${this._apiURL}${url}${this._apiKey}`);
    return await res.json()
  };

  async getTop() {
    const res = await this.getMovies('top_rated');
    console.log(res);
    return res.results;
  };
};