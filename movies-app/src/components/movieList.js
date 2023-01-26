import React, { Component } from 'react';



import MovieItem from './movieItem';

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
    const elements = this.props.list.map((el) => {
        const {id, ...itemProps} = el;
        return (
            <div key={id} className='item'>
                <MovieItem {...itemProps}/>
            </div>            
        );
    });

    return (
      <div className='list'>
        { elements }
      </div>
    )
  }
}