import React, { Component } from 'react';
import { Layout, Rate } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import ContextGengres from './contextGenres';


export default class MovieItem extends Component {  

  render() {
    const {title, overview, genre_ids, poster_path, release_date} = this.props;

    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const poster = poster_path !== null ? 
    <div className='poster' style={{
      backgroundImage: `url("${posterUrl}${poster_path}")`,
      backgroundSize: `100% 100%`,
    }}>
    </div> 
    : 
    <div className='frame' style={{
            backgroundImage: `url("https://s3.memeshappen.com/memes/c417e6a8633aa1ed.webp")`,
            backgroundSize: `100% 100%`,
          }}>
    </div>;
    return (
        <div className='poster'>
          { poster }
          <div className='frame frame__overview'>            
            <div className='title'>
              {title}
            </div>
            <div className='release'>
              {release_date}
            </div>
            <div>
              <ContextGengres.Consumer>
                {
                  (genreList) => genreList.filter((genre) => genre_ids.includes(genre.id))
                    .slice(0,6)
                    .map((genre) => (
                      <span className='genre' key={genre.id}>
                        {genre.name}
                      </span>
                    )) 
                }
              </ContextGengres.Consumer>
            </div>
            <div className='overview'>
              { overview.length > 140 ? `${ overview.slice(0, 140)}...` : overview}
            </div>
            <Rate className='stars' count={10}/>
          </div>
        </div>
    )
  }
}
