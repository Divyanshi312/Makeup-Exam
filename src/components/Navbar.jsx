import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { path: '/',          label: '🏠 Dashboard' },
  { path: '/movies',    label: '🎬 Movies'    },
  { path: '/favorites', label: '⭐ Favorites' },
];

function Navbar({ toggleDarkMode, darkMode }) {   
  return (
    <nav className="navbar">

      {/* Brand / Logo */}
      <div className="nav-brand">🎥 MovieVault</div>

      {/* Navigation Links */}
      <div className="nav-links">

        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end={link.path === '/'}
          >
            {link.label}
          </NavLink>
        ))}

        {/*  Dark Mode Button */}
        <button onClick={toggleDarkMode} className="dark-toggle">
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;