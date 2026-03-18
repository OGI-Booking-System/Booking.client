import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getInitials } from '../utils/formatters';
import { ROLE_LABELS } from '../constants/roles';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          🎫 <span>EventPass</span>
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <ul className={`navbar-links${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>
                  Events
                </NavLink>
              </li>
              {(user?.role === 'admin' || user?.role === 'organizer') && (
                <li>
                  <NavLink to="/verify" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>
                    Verify QR
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/profile" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>
                  Profile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* User area */}
        {isAuthenticated && user && (
          <div className="navbar-user">
            <div className="navbar-avatar" title={`${user.firstName} ${user.lastName} – ${ROLE_LABELS[user.role]}`}>
              {getInitials(user.firstName, user.lastName)}
            </div>
            <button className="btn btn-secondary btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
