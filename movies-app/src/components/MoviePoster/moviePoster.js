import React, { Component } from 'react';

import notFoundImage from '../../assets/notFound.png';
import Spinner from '../Spinner/spinner';

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
      <>
        <Spinner loadingStatus={loadingStatus} />
        <img
          className={style.poster}
          src={`${imgUrl}`}
          onLoad={loadHandle}
          style={{
            display: loadingStatus === 'loading' ? 'none' : 'block',
            backgroundSize: 'cover',
          }}
        />
      </>
    );
    return <>{poster}</>;
  }
}
