import Hero from './Hero'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { APIFetcher } from '../fetcher';

const MovieView = () => {
    const { id } = useParams();

    const [movieDetails, setMovieDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // Inexpensive fetch; avoid memoization
        const detailURL = `https://api.themoviedb.org/3/movie/${id}?api_key=27f9e13de1b2668930cb073d625b4637&language=en-US`;

        APIFetcher(detailURL)
            .then(data => {
                setMovieDetails(data);
                setIsLoading(false);
            });
            
    }, [id])

    function renderMovieDetails() {
        if (isLoading) {
            return (
                <Hero text='Loading...' />
            )
        }
        if (movieDetails) {

            let posterURL;
            if (movieDetails.poster_path === null) {
                posterURL = '';
            } else {
                posterURL = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
            };

            const genresHtml = movieDetails.genres.map((obj, i) => {
                return <li className='capital' key={i}>{obj.name}</li>
            });
            const backdropURL = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;

            return (
                <>
                    <Hero text={movieDetails.original_title} backdropURL={backdropURL}/>
                    <div className='container my-5'>
                        <div className='row'>
                            <div className='col-12 col-md-3'>
                                <img src={posterURL} className='img-fluid shadow rounded' alt={movieDetails.original_title} />
                            </div>
                            <div className='col-12 col-md-9'>
                                <h2>{movieDetails.original_title}</h2>
                                <p className='lead'>{movieDetails.overview}</p>
                                <h4>Genres:</h4>
                                <ul>{genresHtml}</ul>
                                <h4>Rating:</h4>
                                <p>{movieDetails.popularity}/100</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    return renderMovieDetails();
};

export default MovieView;