import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { APIFetcher } from '../fetcher';

const GenreDropdown = () => {

    const [movieGenres, setMovieGenres] = useState([]);

    useEffect(() => {

        // Inexpensive fetch; avoid memoization
        const genresURL = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';

        APIFetcher(genresURL)
            .then(data => {
                setMovieGenres(data.genres);
            });

    }, []);

    return (
        movieGenres.map((obj, i) => {
            return <Link className='dropdown-item' key={i} to={`/genres/${obj.id}/${obj.name}`}>{obj.name}</Link>
        })
    )
};


const Navbar = ({ searchText, setSearchText }) => {

    const navigate = useNavigate();

    const updateSearchText = (e) => {
        navigate('/search');
        setSearchText(e.target.value);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Movie Database</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="gosomewhere" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Genres
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <GenreDropdown />
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/search">Search</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={updateSearchText} />
                    </form>
                </div>
            </div>
        </nav>
    )
};


export default Navbar;