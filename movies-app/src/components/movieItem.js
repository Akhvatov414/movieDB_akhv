import React, { Component } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export default class MovieItem extends Component {  

  render() {
    //console.log(this.props.id);
    const {title, overview, genres, poster_path, release_date} = this.props;
    console.log(genres);
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    return (
        <Layout className='frame'>
          <Sider className='frame' style={{
            backgroundImage: `url("${posterUrl}${poster_path}")`,
            backgroundSize: `100% 100%`,
          }}>
          </Sider>
          <Layout className='frame frame__overview'>            
            <Content className='title'>
              {title}
            </Content>
            <Content className='release'>
              {release_date}
            </Content>
            <Content className='overview'>
              {overview}
            </Content>
          </Layout>
        </Layout>
    )
  }
}
