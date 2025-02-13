// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
//import "./Navbar.css"; // Add styles if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">HabitForge</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tracking">Habits Tracking</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/analysis">Report & Analysis</Link></li>
        <li><Link to="/authform">Login</Link></li>  
      </ul>
    </nav>
  );
};

export default Navbar;
