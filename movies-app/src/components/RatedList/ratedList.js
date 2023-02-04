import React, { Component } from 'react';
import MovieService from '../../services/movie-service';

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
            console.log(data);
        })
    }
    render() {
        return (
            <div>
                Список недооцененных фильмов
            </div>
        );
    }
}

export default RatedList;