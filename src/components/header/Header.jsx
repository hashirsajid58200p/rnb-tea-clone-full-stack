import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Header.css"; // Import the CSS file
import Logo from "../../assets/logo.png"

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState("home");

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Menu", id: "menu" },
    { name: "Locations", id: "locations" },
    { name: "Mobile App", id: "mobileApp" },
    { name: "Franchise", id: "franchise" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <img className="logo" src={Logo}/>

        {/* Search Bar */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>

        {/* Menu Items */}
        <nav>
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
      </div>
    </header>
  );
};

export default Header;
