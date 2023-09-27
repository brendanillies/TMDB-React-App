import './App.css';
import Navbar from './components/Navbar';
import SearchView from './components/SearchView';
import HomeView from './components/HomeView';
import GenresView from './components/GenresView';
import GenreView from './components/GenreView';
import NotFoundView from './components/NotFoundView';
import MovieView from './components/MovieView';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
    console.log(process.env)

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchText) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=27f9e13de1b2668930cb073d625b4637&language=en-US&query=${searchText}&page=1&include_adult=false&sort_by=popularity.desc`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data.results);
                })
        }
    }, [searchText])


    return (
        <div className="App">
            <Navbar searchText={searchText} setSearchText={setSearchText} />
            <Routes>
                <Route path='/' element={<HomeView />}></Route>
                <Route path='/search' element={<SearchView searchText={searchText} searchResults={searchResults} />}></Route>
                <Route path='/movie/:id' element={<MovieView />}></Route>
                <Route path='/genres' element={<GenresView />}></Route>
                <Route path='/genres/:genreId/:genre' element={<GenreView />}></Route>
                <Route path='/404' element={<NotFoundView />}></Route>
                <Route path='*' element={<Navigate to='/404' />}></Route>
            </Routes>
        </div>
    );
}

export default App;
