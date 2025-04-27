import React from 'react';
import './NavBar.css';
import logo from '../components/pharmfetchLogo.png';

const NavBar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={logo} alt="PharmFetch Logo" />
        <span className="brand">PharmFetch</span>
      </div>

      {onLogout && (
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default NavBar;
