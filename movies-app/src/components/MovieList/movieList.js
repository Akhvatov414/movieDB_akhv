import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieItem from '../MovieItem/movieItem';
import MoviePagination from '../MoviePagination/moviePagination';

import style from './index.module.css';

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { getList } = this.props;
    getList('return');
  }

  render() {
    const { isLoading, inError, list, getList, totalResults, query, rateMovie, ratedList } = this.props;
    const elements = list.map((el) => {
      const { id, ...itemProps } = el;
      return <MovieItem key={id} id={id} rateMovie={rateMovie} rating={ratedList[id]} {...itemProps} />;
    });
    const noResults = !isLoading && !inError && list.length === 0 ? <h2>По вашему запросу ничего не найдено</h2> : null;

    return (
      <div>
        <div className={style.list}>
          {elements}
          {noResults}
        </div>
        <div className={style.pagination}>
          <MoviePagination getList={getList} totalResults={totalResults} query={query} />
        </div>
      </div>
    );
  }
}

MovieList.propTypes = {
  isLoading: PropTypes.bool,
  inError: PropTypes.bool,
  list: PropTypes.array,
  getList: PropTypes.func,
  totalResults: PropTypes.number,
  query: PropTypes.string,
  rateMovie: PropTypes.func,
  ratedList: PropTypes.object,
};
