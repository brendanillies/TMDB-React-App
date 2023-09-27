
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Hero from './Hero';
import { APIFetcher } from '../fetcher';

const GenreMovieCard = ({ movie }) => {

    const posterURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`
    const detailURL = `/movie/${movie.id}`

    return (
        <div className='col-6 col-md-2 my-3'>
            <div className='card'>
                <img src={posterURL} className='card-img-top' alt={movie.original_title} />
                <div className='card-body'>
                    <p className='card-title'>{movie.original_title}</p>
                    <Link to={detailURL} className='btn btn-primary'>Details</Link>
                </div>
            </div>
        </div>
    )
};

const GenreView = () => {
    const { genreId, genre } = useParams();

    const [genreMovies, setGenreMovies] = useState([]);

    useEffect(() => {

        // Inexpensive fetch; avoid memoization
        const genreMoviesURL = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&sort_by=popularity.desc&page=1&with_original_language=en`;

        APIFetcher(genreMoviesURL)
            .then(data => {
                setGenreMovies(data.results);
            });

    }, [genreId]);

    const genreMoviesHtml = genreMovies.map((movie, i) => {
        return <GenreMovieCard movie={movie} key={i} />
    });

    return (
        <>
            <Hero text={`${genre} Movies`} />
            {
                genreMoviesHtml &&
                <div className="container-fluid">
                    <div className="row">
                        {genreMoviesHtml}
                    </div>
                </div>
            }
        </>
    )
};

export default GenreView;