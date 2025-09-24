import React from 'react';
import { useNavigate } from 'react-router-dom';
import menuItems from './menuData';
import './Menu.css';

function Menu() {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate('/menu'); // Route to full menu
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  return (
    <div className="menuListWrapper">
      {/* Wrapper div for the whole menu */}
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
            <div
              className="see-more"
              onClick={handleSeeMore}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSeeMore()}
            >
              See More
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;