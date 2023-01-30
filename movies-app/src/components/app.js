import React, { Component } from 'react';
import { Online, Offline } from 'react-detect-offline';
import MovieList from './movieList';
import AppHeader from './appHeader';
import MovieService from '../services/movie-service';
import { Alert, Spin, Tabs } from 'antd';



export default class App extends Component {
  movieService = new MovieService();
    constructor() {
        super();
        
        this.state = {
        itemsList: [],
        totalResults: null,
        isLoading: true,
        inError: false,
        query: 'return',
    }
        //this.getList('return');
        console.log(this.state);
    }

    setQuery = (query) => {
      this.setState({ query: query });
    }

    getList = (query, page) => {
      
      this.movieService.searchMovies(query, page)
                        .then((res) => {
                          this.setState({ isLoading: true });
                           this.setState({
                               itemsList: res.results.map(i => i),
                               totalResults: res.total_results,
                               isLoading: false,
                               inError: false,
                           });
                          })
                        .catch(() => {
                         this.setState( { itemsList: [],
                                          inError: true });
                        });
    }

  render() {
    const { itemsList, isLoading, inError, totalResults, query } = this.state;
    const spinner = isLoading && !inError ? <Spinner/> : null;
    //const list = !isLoading && !inError ? <MovieList list={itemsList} isLoading={isLoading} getList={this.getList}/> : null;
    const errors = inError ? <ErrorMessage/> : null;
    const items = [
      {
        label: 'Search',
        key: '1',
        children: (
          <div>
            <AppHeader getList={this.getList} setQuery={this.setQuery}/>
            { spinner }
            { errors }
            <MovieList list={itemsList} isLoading={isLoading} inError={inError} getList={this.getList} totalResults={totalResults} query={query}/>            
          </div>
        )
      }, 
      {
        label: 'Rated',
        key: '2',
        children: (
          <div>
            rated movies        
          </div>
        )
      }
    ]
    
    return (
      <div className='app'>
        <Online>
            <Tabs defaultActiveKey='1' centered items={items} destroyInactiveTabPane/>
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