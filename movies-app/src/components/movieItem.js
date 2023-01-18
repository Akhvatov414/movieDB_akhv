import React, { Component } from 'react'
import MovieService from '../services/movie-service';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

export default class MovieItem extends Component {
    constructor(){
        super();
    }
    

  render() {
    //console.log(this.props.id);
    const {title, overview, genres, poster_path, release_date} = this.props;
    return (
      <Layout>
        <Content>
        {title}
        </Content>        
      </Layout>
    )
  }
}
