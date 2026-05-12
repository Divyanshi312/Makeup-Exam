
import React from 'react';

function Dashboard({ movies }) {

  
  const totalMovies    = movies.length;
  const watchedMovies  = movies.filter((m) => m.watched).length;
  const unwatchedMovies= totalMovies - watchedMovies;
  const favoriteMovies = movies.filter((m) => m.favorite).length;


  
  const stats = [
    { label: 'Total Movies',  value: totalMovies,     icon: '🎬', color: '#3b82f6' },
    { label: 'Watched',       value: watchedMovies,   icon: '✅', color: '#10b981' },
    { label: 'Unwatched',     value: unwatchedMovies, icon: '⏳', color: '#f59e0b' },
    { label: 'Favorites',     value: favoriteMovies,  icon: '⭐', color: '#ec4899' },
  ];


  
  const recentMovies = [...movies].reverse().slice(0, 3);


  return (
    <div>
      <h2 className="page-title">📊 Dashboard</h2>
      <p className="page-subtitle">Your movie library at a glance</p>

      {/* ── STAT CARDS ────────────────────────────────────── */}
      {/* .map() renders one card for each item in stats array */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-card"
            style={{ borderTop: `4px solid ${stat.color}` }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>


      {/* ── RECENT MOVIES ─────────────────────────────────── */}
      <h3 className="section-title">🕐 Recent Additions</h3>

      {/* Conditional render: show message if no movies exist */}
      {movies.length === 0 ? (
        <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
          No movies yet. Go to the Movies tab to add some!
        </p>
      ) : (
        <div className="recent-list">
          {/* .map() renders each recent movie as a row */}
          {recentMovies.map((movie) => (
            <div key={movie.id} className="recent-item">
              <span className="recent-name">{movie.name}</span>
              <span className="recent-meta">{movie.genre} · {movie.year}</span>
              <span
                className="badge"
                style={{
                  background: movie.watched ? '#d1fae5' : '#fef3c7',
                  color:      movie.watched ? '#065f46' : '#92400e',
                }}
              >
                {movie.watched ? 'Watched' : 'Unwatched'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
