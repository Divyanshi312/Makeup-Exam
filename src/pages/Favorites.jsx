import React from 'react';
import MovieCard from '../components/MovieCard';

function Favorites({ movies, onToggleFavorite, onToggleWatch }) {

  
  const favoriteMovies = movies.filter((movie) => movie.favorite === true);

  return (
    <div>

      {/* ── PAGE HEADER ───────────────────────────────────── */}
      <h2 className="page-title">⭐ Favorites</h2>

      {/* Show favorite count badge */}
      <div className="fav-count-badge">
        {favoriteMovies.length} favorite movie{favoriteMovies.length !== 1 ? 's' : ''}
      </div>


      {/* ── FAVORITE MOVIES LIST ─────────────────────────── */}
      {favoriteMovies.length === 0 ? (
        
        <div className="empty-state">
          <div className="empty-icon">💔</div>
          <p>No favorites yet!</p>
          <p style={{ fontSize: 14, marginTop: 8, color: '#b0b7c3' }}>
            Go to Movies and click ☆ Fav on any movie to add it here.
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {/* ── .map() renders a MovieCard for each favorite ── */}
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleWatch={onToggleWatch}         
              onToggleFavorite={onToggleFavorite}   
              
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Favorites;
