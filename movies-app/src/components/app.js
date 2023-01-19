import React, { Component } from 'react';
import MovieList from './movieList';
import MovieService from '../services/movie-service';

export default class App extends Component {
  movieService = new MovieService();

    state = {
        itemsList: []
    }

    constructor() {
        super();
        this.getList();
    }

    async getList() {
        this.movieService.getTop()
                         .then((movie) => {
                            this.setState({
                                itemsList: movie
                            })
                         })
    }

  render() {
    console.log(this.state.itemsList);
    return (
      <div className='body'>
          <MovieList list={this.state.itemsList}/>
      </div>
    )
  }
}
