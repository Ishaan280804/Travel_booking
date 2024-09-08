// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>MyApp</h1>
      </div>
      <ul className="navbar-links">
        <li><Link className="navbar-link" to="/signin">Sign In</Link></li>
        <li><Link className="navbar-link" to="/signup">Sign Up</Link></li>
        <li><Link className="navbar-link" to="/admin/signin">Admin</Link></li>
        <li><Link className="navbar-link" to="/flights">Flights</Link></li>
        <li><Link className="navbar-link" to="/trains">Trains</Link></li>
        {/* Add other relevant routes here */}
      </ul>
    </nav>
  );
};

export default Navbar;
