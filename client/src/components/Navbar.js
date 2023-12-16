import {React, useRef } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/main.css";
import logo1 from './logo1.svg';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from './AuthContext';

const Navbar = () => {
    const navRef = useRef();
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { loggedIn } = useAuth();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }


  return (
    <header>
      <h3>
        <img src={logo1} className="App-logo" alt="logo" />
      </h3>
      <nav ref={navRef}>
        <Link to="/review">Reviews</Link>
        <a href="/#">About Us</a>
        {loggedIn && <button className="nav-btn2" onClick={() => navigate('/login')}>Logout</button>}
        <button className="nav-btn nav-close-btn" onClick={showNavBar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavBar}>
        <FaBars />
      </button>
    </header>
  )
}

export default Navbar