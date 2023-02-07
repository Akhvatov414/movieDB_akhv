import React, { Component } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

import ContextGengres from '../ContextGenres/contextGenres';

import style from './index.module.css';

export default class MovieItem extends Component {
  render() {
    const { id, title, overview, vote_average, genre_ids, poster_path, release_date, rateMovie, rating } = this.props;
    //console.log(this.props);
    const posterUrl = 'https://image.tmdb.org/t/p/original';
    const poster =
      poster_path !== null ? (
        <div
          className={style.poster}
          style={{
            backgroundImage: `url("${posterUrl}${poster_path}")`,
            backgroundSize: 'cover',
          }}
        ></div>
      ) : (
        <div
          className={style.poster}
          style={{
            backgroundImage: 'url("https://s3.memeshappen.com/memes/c417e6a8633aa1ed.webp")',
            backgroundSize: '100% 100%',
          }}
        ></div>
      );

    const scoreColor = (score) => {
      if (score >= 0 && score < 3) return '#E90000';
      if (score >= 3 && score < 5) return '#E97E00';
      if (score >= 5 && score < 7) return '#E9D100';
      if (score >= 7) return '#66E900';
      return '#000000';
    };

    const setRate = (rate) => {
      rateMovie(this.props.id, rate);
    };

    return (
      <div key={id} className={style.item}>
        <div className={style.poster}>{poster}</div>
        <div className={style.content}>
          <div className={style.title}>
            <h3 className={style.title__name}>{title}</h3>
            <div className={style.title__score} style={{ border: `2px solid ${scoreColor(vote_average)}` }}>
              {Math.floor(vote_average * 10) / 10}
            </div>
          </div>
          <div className={style.release}>{release_date}</div>
          <div className="genreList">
            <ContextGengres.Consumer>
              {(genreList) =>
                genreList
                  .filter((genre) => genre_ids.includes(genre.id))
                  .slice(0, 3)
                  .map((genre) => (
                    <span className={style.genre} key={genre.id}>
                      {genre.name}
                    </span>
                  ))
              }
            </ContextGengres.Consumer>
          </div>
          <div className={style.main}>
            <div className={style.overview}>{overview.length > 140 ? `${overview.slice(0, 140)}...` : overview}</div>
            <Rate className={style.stars} value={rating} count={10} onChange={setRate} rateMovie={rateMovie} />
          </div>
        </div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string,
  vote_average: PropTypes.number.isRequired,
  genre_ids: PropTypes.array,
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  rateMovie: PropTypes.func.isRequired,
  rating: PropTypes.number,
};
