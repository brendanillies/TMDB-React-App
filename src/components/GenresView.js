import Hero from './Hero';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIFetcher } from '../fetcher';

const GenreLinkCard = ({ genreId, genre }) => {

    const genreURL = `/genres/${genreId}/${genre}` 

    return (
        <div className='col-6 col-md-4 col-lg-3 my-3'>
            <div className='card h-100 border-0'>
                <div className='card-body d-flex flex-column justify-content-center align-items-center'>
                    <h5 className='card-title'>See More {genre} Movies!</h5>
                    <Link to={genreURL} className='btn w-100 border-2 border-secondary'>&#8921;</Link>
                </div>
            </div>
        </div>
    )
};

const GenreMovieCard = ({ movie }) => {

    const posterURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`
    const detailURL = `/movie/${movie.id}`

    return (
        <div className='col-6 col-md-4 col-lg-3 my-3'>
            <div className='card'>
                <img src={posterURL} className='card-img-top' alt={movie.original_title} />
                <div className='card-body'>
                    <h5 className='card-title'>{movie.original_title}</h5>
                    <Link to={detailURL} className='btn btn-primary'>Details</Link>
                </div>
            </div>
        </div>
    )
};

const GenreRow = ({ genreObject }) => {

    const [genreMovies, setGenreMovies] = useState([]);
    const genre = genreObject.name
    const genreId = genreObject.id

    useEffect(() => {

        // Inexpensive fetch; avoid memoization
        const genreMoviesURL = `https://api.themoviedb.org/3/discover/movie?&language=en-US&with_genres=${genreId}&sort_by=popularity.desc&page=1&with_original_language=en`;

        APIFetcher(genreMoviesURL)
            .then(data => {
                setGenreMovies(data.results)
            })

    }, [genreId]);

    const genreMoviesHtml = genreMovies.map((movie, i) => {
        return <GenreMovieCard movie={movie} key={i} />
    });

    return (
        <>
            {
                genreMoviesHtml &&
                <div className='row'>
                    <h3>
                        <Link className='d-inline link-decoration' to={`/genres/${genreId}/${genre}`}>
                            {genre}
                        </Link>
                    </h3>
                    <div className='col'>
                        <div className='row flex-wrap flex-md-nowrap overflow-auto hide-scrollbar'>
                            {genreMoviesHtml}
                            <GenreLinkCard genreId={genreId} genre={genre} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

const GenresView = () => {

    const [movieGenres, setMovieGenres] = useState([]);

    useEffect(() => {

        // Inexpensive fetch; avoid memoization
        const genresURL = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';

        APIFetcher(genresURL)
            .then(data => {
                setMovieGenres(data.genres);
            });

    }, []);

    const genresHtml = movieGenres.map((obj, i) => {
        return <GenreRow genreObject={obj} key={i} />
    });

    return (
        <>
            <Hero text='Genres View' />
            {
                genresHtml &&
                <div className='container-fluid'>
                    {genresHtml}
                </div>
            }
        </>
    )
};

export default GenresView;