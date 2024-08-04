// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-main">
        WellNest
      </Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/mood-tracker" className="navbar-link">
          Mood Tracker
        </Link>
        <Link to="/resources" className="navbar-link">
          Resources
        </Link>
        <Link to="/chat-support" className="navbar-link">
          Schedule an Appointment
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
