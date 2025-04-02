import React from "react";
import menuItems from "./menuData";
import "./Menu.css";

function Menu() {
  return (
    <div className="menuListWrapper"> {/* Wrapper div for the whole menu */}
      
      {/* Heading div */}
      <div className="menuList-heading">
        <h2>Explore Our Menu</h2>
      </div>

      {/* Menu items container */}
      <div className="menuList-container">
        {menuItems.map((item) => (
          <div key={item.id} className="menuList-item">
            <img src={item.image} alt={item.name} className="menuList-image" />
            <h3 className="menuList-name">{item.name}</h3>
            <div className="see-more">See More</div>
          </div>
        ))}
      </div>

      {/* View More button (without link for now) */}
      <div className="view-more-container">
        <button className="view-more-button">
          View More
        </button>
      </div>
    </div>
  );
}

export default Menu;
