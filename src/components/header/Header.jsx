import React, { useState, useEffect } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Header.css";
import Logo from "../../assets/logo.png";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation(); // Get the current location

  const menuItems = [
    { name: "Home", id: "home", path: "/" },
    { name: "Menu", id: "menu", path: "/menu" },
    { name: "Mobile App", id: "mobileApp", path: "/mobileApp" },
    { name: "Franchise", id: "franchise", path: "/franchise" },
    { name: "Contact", id: "contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Set selected menu based on current path
  const selectedMenu = menuItems.find((item) => item.path === location.pathname)?.id || "home";

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <img className="logo" src={Logo} alt="Logo" />

        {/* Search Bar */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>

        {/* Desktop Menu */}
        <nav className="desktop-menu">
          <ul className="menu">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`menu-item ${
                  selectedMenu === item.id ? "selected" : ""
                }`}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Menu Icon */}
        <FaBars className="hamburger-menu" onClick={toggleMenu} />

        {/* Sidebar (for small screen) */}
        <div className={`sidebar ${menuVisible ? "show" : ""}`}>
          <button className="close-sidebar" onClick={toggleMenu}>
            X
          </button>
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="sidebar-menu-item"
              >
                <Link to={item.path} onClick={() => setMenuVisible(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
