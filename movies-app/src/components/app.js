import React, { Component } from 'react';
import { Online, Offline } from 'react-detect-offline';
import MovieList from './movieList';
import AppHeader from './appHeader';
import MovieService from '../services/movie-service';
import { Alert, Spin } from 'antd';



export default class App extends Component {
  movieService = new MovieService();

    state = {
        itemsList: [],
        isLoading: true,
        inError: false,
    }

    constructor() {
        super();
        this.getList();
    }

    async getList() {
        this.movieService.getResults('bat')
                         .then((movie) => {
                            this.setState({
                                itemsList: movie,
                                isLoading: false,
                            });
                         })
                         .catch(() => {
                          this.setState( { inError: true })
                         });
    }

  render() {
    const { isLoading, inError } = this.state;
    const spinner = isLoading && !inError ? <Spinner/> : null;
    const list = !isLoading ? <MovieList list={this.state.itemsList} isLoading={this.state.isLoading}/> : null;
    console.log(this.state);
    return (
      <div className='app'>
        <Online>
          <AppHeader/>
          { spinner }
          { list }  
        </Online>
        <Offline>
          <Alert message='Нет подключения к сети' 
                 description='Проверьте Ваше подключение или повторите попытку позднее'
                 type='error'/>
        </Offline>      
      </div>
    )
  }
}

const Spinner = () => {
  return (
    <React.Fragment>
      <Spin size='large'/>
    </React.Fragment>
  );
};