import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import "./Header.css";
import Logo from "../../assets/logo.png";

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Menu", id: "menu" },
    { name: "Locations", id: "locations" },
    { name: "Mobile App", id: "mobileApp" },
    { name: "Franchise", id: "franchise" },
    { name: "Contact", id: "contact" },
  ];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

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
                onClick={() => setSelectedMenu(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Menu Icon */}
        <FaBars className="hamburger-menu" onClick={toggleMenu} />

        {/* Menu Popup */}
        <div className={`menu-popup ${menuVisible ? "show" : ""}`}>
          <ul className="mobile-menu">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="mobile-menu-item"
                onClick={() => {
                  setSelectedMenu(item.id);
                  setMenuVisible(false); // Close menu after clicking an item
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
