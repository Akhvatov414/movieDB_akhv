import React, { Component } from 'react';

//import Spinner from '../Spinner/spinner';
import notFoundImage from '../../assets/notFound.png';
import loaderGif from '../../assets/loader.gif';

import style from './index.module.css';

export default class MoviePoster extends Component {
  render() {
    const { path, loadingStatus, handleLoaded } = this.props;
    const loadHandle = () => {
      if (loadingStatus === 'loading') handleLoaded('loaded');
    };
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const imgUrl = path !== null ? `${posterUrl}${path}` : `${notFoundImage}`;
    const poster = (
      <img
        className={style.poster}
        src={`${loadingStatus === 'loading' ? loaderGif : imgUrl}`}
        onLoad={loadHandle}
        style={{
          backgroundSize: 'cover',
        }}
      />
    );
    return <>{poster}</>;
  }
}
