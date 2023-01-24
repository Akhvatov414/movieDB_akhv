import React, { Component } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export default class MovieItem extends Component {  

  render() {
    const {title, overview, genre_ids, poster_path, release_date} = this.props;

    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const poster = poster_path !== null ? 
    <Sider className='frame' style={{
      backgroundImage: `url("${posterUrl}${poster_path}")`,
      backgroundSize: `100% 100%`,
    }}>
    </Sider> 
    : 
    <Sider className='frame' style={{
            backgroundImage: `url("https://s3.memeshappen.com/memes/c417e6a8633aa1ed.webp")`,
            backgroundSize: `100% 100%`,
          }}>
    </Sider>;
    return (
        <Layout className='frame'>
          { poster }
          <Layout className='frame frame__overview'>            
            <Content className='title'>
              {title}
            </Content>
            <Content className='release'>
              {release_date}
            </Content>
            <Content className='overview'>
              { overview.length > 140 ? `${ overview.slice(0, 140)}...` : overview}
            </Content>
          </Layout>
        </Layout>
    )
  }
}
