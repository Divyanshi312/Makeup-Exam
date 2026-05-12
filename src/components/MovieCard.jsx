import React from 'react';

function MovieCard({ movie, onToggleWatch, onToggleFavorite, onDelete }) {
  return (
    <div
      className="movie-card"
      style={{
        // Green left border = watched, Yellow = unwatched
        borderLeftColor: movie.watched ? '#10b981' : '#f59e0b',
      }}
    >

      {/* ── Row 1: Title + Watch Status Badge ─────────────── */}
      <div className="card-header">
        <h3 className="movie-title">{movie.name}</h3>

        {/* Badge changes color based on watched status */}
        <span
          className="badge"
          style={{
            background: movie.watched ? '#d1fae5' : '#fef3c7',
            color:      movie.watched ? '#065f46' : '#92400e',
          }}
        >
          {movie.watched ? '✅ Watched' : '⏳ Unwatched'}
        </span>
      </div>

      {/* ── Row 2: Genre, Year, Rating tags ───────────────── */}
      <div className="card-meta">
        <span className="meta-tag">🎭 {movie.genre}</span>
        <span className="meta-tag">📅 {movie.year}</span>
        <span className="meta-tag">⭐ {movie.rating}</span>
      </div>

      {/* ── Row 3: Action Buttons ─────────────────────────── */}
      <div className="card-actions">

        {/* Watch / Unwatch Button */}
        {/* onClick calls the handler passed from parent (Movies.js or Favorites.js) */}
        <button
          className="btn btn-blue"
          onClick={() => onToggleWatch(movie.id)}   
        >
          {movie.watched ? '↩ Unwatch' : '✓ Watch'}
        </button>

        {/* Favorite / Unfavorite Button */}
        {/* Style changes based on current favorite status */}
        <button
          className="btn"
          style={{
            background: movie.favorite ? '#fbbf24' : '#f3f4f6',
            color:      movie.favorite ? '#78350f' : '#374151',
          }}
          onClick={() => onToggleFavorite(movie.id)} 
        >
          {movie.favorite ? '★ Unfav' : '☆ Fav'}
        </button>

        {/* Delete Button — only shown if onDelete prop is provided */}
        {/* On Favorites page we don't pass onDelete, so it won't show */}
        {onDelete && (
          <button
            className="btn btn-red"
            onClick={() => onDelete(movie.id)}        
          >
            🗑 Delete
          </button>
        )}

      </div>
    </div>
  );
}

export default MovieCard;
