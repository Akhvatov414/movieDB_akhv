import React, { Component } from 'react'
import MovieItem from './movieItem';

export default class movieList extends Component {    
  render() {
    //console.log(this.props.list);
    const elements = [...this.props.list].map((el) => {
        const {id, ...itemProps} = el;
        return (
            <div key={id} className='item'>
                <MovieItem {...itemProps}/>
            </div>
            
        )
    })
    return (
      <div className='list'>
        {elements}
      </div>
    )
  }
}
