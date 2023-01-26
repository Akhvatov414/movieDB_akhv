import React, { Component } from 'react';



import MovieItem from './movieItem';
import MoviePagination from './moviePagination';

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
    const { isLoading, inError, list, getList, totalResults, query } = this.props;
    const elements = list.map((el) => {
        const {id, ...itemProps} = el;
        return (
            <div key={id} className='item'>
                <MovieItem {...itemProps}/>
            </div>            
        );
    });
    const noResults = !isLoading && !inError && list.length === 0 ? <h2>По вашему запросу ничего не найдено</h2> : null;   
    
    return (
      <div >
      <div className='list'>
        { elements }
        { noResults }
      </div>
      <div className='pagination'>
        <MoviePagination getList={getList} totalResults={totalResults} query={query}/>
      </div>
      </div>
      
    )
  }
}