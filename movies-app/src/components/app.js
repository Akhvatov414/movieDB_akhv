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
        totalResults: null,
        isLoading: true,
        inError: false,
    }

    constructor() {
        super();
        this.getList();
    }

    getList = (query) => {
      //this.setState({ isLoading: true })
      this.movieService.searchMovies(query)
                        .then((res) => {
                          console.log(res);
                           this.setState({
                               itemsList: res.results.map(i => i),
                               totalResults: res.totalResults,
                               isLoading: false,
                           });
                          })
                        .catch(() => {
                         this.setState( { itemsList: [],
                                          inError: true });
                        });
    }

  render() {
    const { isLoading, inError } = this.state;
    const spinner = isLoading && !inError ? <Spinner/> : null;
    const list = !isLoading ? <MovieList list={this.state.itemsList} isLoading={this.state.isLoading} getList={this.getList}/> : null;
    const errors = inError ? <ErrorMessage/> : null;
    
    return (
      <div className='app'>
        <Online>
          <AppHeader getList={this.getList}/>
          { spinner }
          { errors }
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

const ErrorMessage = () => {
  return (
    <React.Fragment>
      {<Alert message='Упс!'
               description='Не удалось получить список фильмов'
               type='error'/>}
    </React.Fragment>
  )
}