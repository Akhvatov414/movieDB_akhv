import React, { Component } from 'react';
import MovieService from '../../services/movie-service';
import MovieItem from '../MovieItem/movieItem';
import style from './index.module.css';
import { Pagination, Spin } from 'antd';

class RatedList extends Component {
    movieService = new MovieService();
    constructor() {
        super();

        this.state = {
            ratedItems: [],
            isLoading: true,
            page: 1,
            totalResults: 0,
        };
    }

    componentDidMount() {
        this.getRatedItems(1);
    }

    getRatedItems = (page) => {
        this.movieService.getRatedMovies(page).then((data) => {
            this.setState({
                ratedItems: data.results.map(i => i),
                isLoading: false,
                totalResults: data.total_results,
            });
        });
    }

    changePage = (page) => {
        this.setState({
            page,
            isLoading: true
        });
        this.getRatedItems(page);
    }

    render() {
        const { ratedItems, isLoading, page, totalResults } = this.state;
        const { ratedList, rateMovie } = this.props;

        const items = ratedItems.map((el) => {
            const { id, ...itemProps } = el;
            return (
                <MovieItem key={id} id={id} rateMovie={rateMovie} {...itemProps} rating={ratedList[id]}/>
            )
        });
        return (
            <div>
                <div className={style.list}>
                    { isLoading ? (<Spinner/>) : (ratedItems.length > 0 && items) }
                    { !isLoading && ratedItems.length === 0 && <h2>Вы пока не оценили ни один фильм</h2> }
                </div>
                <div className={style.pagination}>
                   <Pagination
                        current={page}
                        pageSize="20"
                        total={totalResults > 10000 ? 10000 : totalResults}
                        onChange={this.changePage}
                    />
                </div>
            </div>
        );
    }
}

const Spinner = () => {
    return (
      <React.Fragment>
        <Spin size='large'/>
      </React.Fragment>
    );
  };

export default RatedList;