// src/components/Header.js
import React, { useState } from 'react';
import '../style.css'; // Pastikan Anda membuat file CSS yang sesuai
import logo from '../pictures/logo.png'; // Pastikan path ini sesuai dengan struktur proyek Anda

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className="navbar section-content">
        <a href="/" className="nav-logo">
          <h2 className="logo-text">
            <img src={logo} alt="Capybara With Glasses" id="nav-pic" />
            CapyLingo
          </h2>
        </a>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <button
            id="menu-close-button"
            className="fas fa-times"
            onClick={toggleMenu}
          ></button>
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/#about-section" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="/#features-section" className="nav-link">Features</a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" id="login">Login</a>
          </li>
        </ul>
        <button
          id="menu-open-button"
          className="fas fa-bars"
          onClick={toggleMenu}
        ></button>
      </nav>
    </header>
  );
};

export default Header;