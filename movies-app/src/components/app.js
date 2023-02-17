import React, { Component } from 'react';
import { Online, Offline } from 'react-detect-offline';
import { Alert, Tabs } from 'antd';

import MovieService from '../services/movie-service';
import ContextGengres from '../services/contextGenres';

import MovieList from './MovieList/movieList';
import AppHeader from './AppHeader/appHeader';
import RatedList from './RatedList/ratedList';
import Spinner from './Spinner/spinner';
import ErrorMessage from './ErrorMessage/errorMessage';

export default class App extends Component {
  movieService = new MovieService();
  constructor() {
    super();

    this.state = {
      itemsList: [],
      totalResults: null,
      isLoading: true,
      inError: false,
      genres: [],
      ratedList: {},
      query: '',
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('guestSessionId')) {
      this.movieService
        .getGuestSession()
        .then((res) => {
          localStorage.setItem('guestSessionId', res.guest_session_id);
        })
        .then(() => this.getRatedItems());
      return;
    }
    this.getRatedItems();
    this.movieService.getGenres().then((data) => this.setState({ genres: data.genres }));
  }

  setQuery = (query) => {
    this.setState({ query: query });
  };

  rateMovie = (id, rate) => {
    this.movieService.rateMovie(id, rate);
    this.setState((state) => ({
      ratedList: { ...state.ratedList, [id]: rate },
    }));
  };

  getRatedItems = () => {
    this.movieService
      .getRatedMovies(1)
      .then((res) => res.total_pages)
      .then((pages) => {
        const items = [];
        for (let i = 1; i <= pages; i += 1) {
          items.push(this.movieService.getRatedMovies(i));
        }
        Promise.all(items).then((res) => {
          this.setState({
            ratedList: res
              .reduce((acc, page) => [...acc, ...page.results], [])
              .map((item) => ({ [item.id]: item.rating }))
              .reduce((acc, obj) => ({ ...acc, [Object.keys(obj)[0]]: obj[Object.keys(obj)[0]] }), {}),
          });
        });
      });
  };

  getList = (query, page) => {
    this.setQuery(query);
    this.movieService
      .searchMovies(query, page)
      .then((res) => {
        this.setState({ isLoading: true });
        this.setState({
          itemsList: res.results.map((i) => i),
          totalResults: res.total_results,
          isLoading: false,
          inError: false,
        });
      })
      .catch(() => {
        this.setState({ itemsList: [], inError: true });
      });
  };

  render() {
    const { itemsList, isLoading, inError, totalResults, query, genres, ratedList } = this.state;
    const spinner = isLoading && !inError ? <Spinner /> : null;
    const errors = inError ? <ErrorMessage /> : null;
    const items = [
      {
        label: 'Search',
        key: 'Search',
        children: (
          <div className="wrapper">
            <AppHeader getList={this.getList} setQuery={this.setQuery} />
            {spinner}
            {errors}
            <MovieList
              list={itemsList}
              ratedList={ratedList}
              isLoading={isLoading}
              inError={inError}
              getList={this.getList}
              rateMovie={this.rateMovie}
              totalResults={totalResults}
              query={query}
            />
          </div>
        ),
      },
      {
        label: 'Rated',
        key: 'Rated',
        children: (
          <div className="wrapper">
            <RatedList ratedList={ratedList} rateMovie={this.rateMovie} />
          </div>
        ),
      },
    ];

    return (
      <div className="app">
        <Online>
          <ContextGengres.Provider value={genres}>
            <Tabs defaultActiveKey="Search" centered items={items} destroyInactiveTabPane />
          </ContextGengres.Provider>
        </Online>
        <Offline>
          <Alert
            message="Нет подключения к сети"
            description="Проверьте Ваше подключение или повторите попытку позднее"
            type="error"
          />
        </Offline>
      </div>
    );
  }
}
