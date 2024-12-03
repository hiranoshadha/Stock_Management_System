import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaSearch, FaUserCircle, FaCog } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const location = useLocation();

  useEffect(() => {
    // Update active link based on current path
    const path = location.pathname.substring(1) || 'home';
    setActiveLink(path);
  }, [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container">
        {/* Navbar Links - Left Side */}
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                href="/home"
                onClick={() => handleLinkClick('home')}
              >
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'product' ? 'active' : ''}`}
                href="/products"
                onClick={() => handleLinkClick('product')}
              >
                PRODUCTS
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'promotions' ? 'active' : ''}`}
                href="/promotions"
                onClick={() => handleLinkClick('promotions')}
              >
                PROMOTIONS
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                href="/about"
                onClick={() => handleLinkClick('about')}
              >
                ABOUT
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
                href="/contactUs"
                onClick={() => handleLinkClick('contact')}
              >
                CONTACT US
              </a>
            </li>
          </ul>
        </div>

        {/* Brand Logo - Center */}
        <a className="navbar-brand position-absolute start-50 translate-middle-x text-uppercase fw-bold" href="#">
          Splendour Lux
        </a>

        {/* Right Side Icons */}
        <div className="d-flex align-items-center">
          <form className="d-flex me-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              <FaSearch />
            </button>
          </form>
          
          <a href="#" className="text-white me-3">
            <FaHeart size={20} />
          </a>
          <a href="#" className="text-white me-3">
            <FaShoppingCart size={20} />
          </a>
          <a href="/dashboard" className="text-white">
            <FaUserCircle size={20} />
          </a>
          <a href="/cfeedbackM" className="text-white ms-3">
            <FaCog size={20} />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;