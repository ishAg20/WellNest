import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <a href="#" className="navbar-main">
          WellNest
        </a>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/mood-tracker"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          Mood Tracker
        </Link>
        <Link
          to="/resources"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          Resources
        </Link>
        <Link
          to="/chat-support"
          className="navbar-link"
          onClick={() => setMenuOpen(false)}
        >
          Schedule an Appointment
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
