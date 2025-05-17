import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark if no saved theme
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="header">
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/favicon.ico" alt="WCG Logo" style={{ width: '24px', height: '24px' }} />
        <span className="logo-text" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--text-color)' }}>Word Chain Game</span>
      </div>
      <div className="header-center">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className={location.pathname === '/about' ? 'nav-link-inactive' : 'nav-link-active'}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'nav-link-active' : 'nav-link-inactive'}>About</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
};

export default Navbar; 