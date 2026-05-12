import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Dashboard  from './pages/Dashboard';
import Movies     from './pages/Movies';
import Favorites  from './pages/Favorites';

import './App.css';


const INITIAL_MOVIES = [
  { id: 1, name: 'Inception',       genre: 'Sci-Fi',   year: 2010, rating: 9.3, watched: true,  favorite: true  },
  { id: 2, name: 'The Dark Knight', genre: 'Action',   year: 2008, rating: 9.0, watched: true,  favorite: true  },
  { id: 3, name: 'Interstellar',    genre: 'Sci-Fi',   year: 2014, rating: 8.6, watched: false, favorite: false },
  { id: 4, name: 'Parasite',        genre: 'Thriller', year: 2019, rating: 8.5, watched: true,  favorite: false },
  { id: 5, name: 'Dune',            genre: 'Sci-Fi',   year: 2021, rating: 8.0, watched: false, favorite: false },
];


function App() {

  const [movies, setMovies] = useState(INITIAL_MOVIES);

  
  const [darkMode, setDarkMode] = useState(false);

 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  const handleAddMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };


  const handleToggleWatch = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };


  const handleToggleFavorite = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, favorite: !movie.favorite }
          : movie
      )
    );
  };


  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this movie?');
    if (!confirmed) return;

    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };


  return (
    <BrowserRouter>

      {/* 🌙 NEW: wrapper for dark mode */}
      <div className={darkMode ? "app dark" : "app"}>

        {/* 🌙 pass props to Navbar */}
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <div className="main-container">
          <Routes>

            <Route path="/" element={<Dashboard movies={movies} />} />

            <Route
              path="/movies"
              element={
                <Movies
                  movies={movies}
                  onAdd={handleAddMovie}
                  onToggleWatch={handleToggleWatch}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDelete}
                />
              }
            />

            <Route
              path="/favorites"
              element={
                <Favorites
                  movies={movies}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleWatch={handleToggleWatch}
                />
              }
            />

          </Routes>
        </div>

        <footer>🎥 MovieVault · Built with React useState + React Router</footer>

      </div>
    </BrowserRouter>
  );
}

export default App;
