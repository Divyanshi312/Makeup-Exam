import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';

function Movies({ movies, onAdd, onToggleWatch, onToggleFavorite, onDelete }) {

  
  const [formData, setFormData] = useState({
    name:   '',
    genre:  '',
    year:   '',
    rating: '',
  });

  
  const [showForm, setShowForm] = useState(false);

  
  const [search, setSearch] = useState('');

  
  const [filterGenre, setFilterGenre] = useState('All');


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (!formData.name.trim() || !formData.genre.trim()) {
      alert('Please fill in at least Movie Name and Genre.');
      return; 
    }

    
    const newMovie = {
      id:       Date.now(),                              
      name:     formData.name.trim(),
      genre:    formData.genre.trim(),
      year:     parseInt(formData.year) || new Date().getFullYear(), 
      rating:   parseFloat(formData.rating) || 0,       
      watched:  false,                                   
      favorite: false,                                   
    };

    onAdd(newMovie); 

    
    setFormData({ name: '', genre: '', year: '', rating: '' });
    setShowForm(false); 
  };


  
  const genres = ['All', ...new Set(movies.map((m) => m.genre))];


  
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.name.toLowerCase().includes(search.toLowerCase());
    const matchesGenre  = filterGenre === 'All' || movie.genre === filterGenre;
    return matchesSearch && matchesGenre; 
  });


  return (
    <div>

      {/* ── PAGE HEADER ───────────────────────────────────── */}
      <div className="page-header">
        <div>
          <h2 className="page-title">🎬 Movies</h2>
          <p className="page-subtitle">{movies.length} movies in your library</p>
        </div>

        {/* Toggle form button */}
        {/* EVENT: onClick changes showForm state (true ↔ false) */}
        <button
          className={`btn btn-lg ${showForm ? 'btn-red' : 'btn-green'}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Movie'}
        </button>
      </div>


      {/* ── ADD MOVIE FORM ────────────────────────────────── */}
      {/* Conditional render: only show if showForm is true */}
      {showForm && (
        <div className="form-card">
          <h3>➕ Add New Movie</h3>

          {/* onSubmit calls handleSubmit when form is submitted */}
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              {/* Controlled input: value tied to formData.name state */}
              <div className="form-group">
                <label>Movie Name *</label>
                <input
                  type="text"
                  name="name"                    
                  value={formData.name}          
                  onChange={handleChange}       
                  placeholder="e.g. Oppenheimer"
                />
              </div>

              <div className="form-group">
                <label>Genre *</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="e.g. Drama"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Release Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. 2023"
                  min="1900"
                  max="2099"
                />
              </div>

              <div className="form-group">
                <label>Rating (0–10)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="e.g. 8.5"
                  min="0"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>

            {/* Submit button — triggers the form's onSubmit */}
            <button type="submit" className="btn btn-green btn-lg">
              ✓ Save Movie
            </button>

          </form>
        </div>
      )}


      {/* ── SEARCH & FILTER BAR ───────────────────────────── */}
      <div className="filter-row">

        {/* Search input: updates 'search' state on every keystroke */}
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}  
        />

        {/* Genre dropdown: updates 'filterGenre' state on change */}
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        >
          {/* .map() renders one <option> for each unique genre */}
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        {/* Show how many results match */}
        <span className="result-count">
          {filteredMovies.length} result{filteredMovies.length !== 1 ? 's' : ''}
        </span>
      </div>


      {/* ── MOVIE LIST ────────────────────────────────────── */}
      {filteredMovies.length === 0 ? (
        
        <div className="empty-state">
          <div className="empty-icon">🎞</div>
          <p>
            {movies.length === 0
              ? 'No movies yet. Click "+ Add Movie" to get started!'
              : 'No movies match your search.'}
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {/* ── .map() renders one MovieCard per movie ──── */}
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}                        
              movie={movie}                         
              onToggleWatch={onToggleWatch}         
              onToggleFavorite={onToggleFavorite}   
              onDelete={onDelete}                   
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Movies;
