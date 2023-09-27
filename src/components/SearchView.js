import Hero from './Hero'
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {

    const posterURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`
    const detailURL = `/movie/${movie.id}`

    return (
        <div className='col-12 col-sm-6 col-lg-3 my-2'>
            <div className='card'>
                <img src={posterURL} className='card-img-top' alt={movie.original_title} />
                <div className='card-body'>
                    <h5 className='card-title'>{movie.original_title}</h5>
                    <p className='card-text'>{movie.overview}</p>
                    <Link to={detailURL} className='btn btn-primary'>Details</Link>
                </div>
            </div>
        </div>
    )
}

const SearchView = ({ searchText, searchResults }) => {

    const resultsHtml = searchResults.map((obj, i) => {
        return <MovieCard movie={obj} key={i} />
    })

    return (
        <>
            <Hero text={`You are searching for ${searchText}`} />

            {
                <div className='container'>
                    <div className='row my-5'>
                        {resultsHtml.length ? resultsHtml : <h2>No Results Found</h2>}
                    </div>
                </div>
            }
        </>
    )
};


export default SearchView; 