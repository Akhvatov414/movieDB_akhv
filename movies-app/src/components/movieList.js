import React, { Component } from 'react'
import MovieItem from './movieItem';

export default class movieList extends Component {    
  render() {
    //console.log(this.props.list);
    const elements = [...this.props.list].map((el) => {
        const {id, ...itemProps} = el;
        return (
            <div key={id}>
                <MovieItem {...itemProps}/>
            </div>
            
        )
    })
    return (
      <div>
        {elements}
      </div>
    )
  }
}
