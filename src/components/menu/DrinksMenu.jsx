// DrinksMenu.jsx
import React, { useState } from "react";
import "./DrinksMenu.css";
import drinksData from "./drinksData";

const DrinksMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(drinksData.map((drink) => drink.category)))
  ];

  const filteredDrinks =
    selectedCategory === "All"
      ? drinksData
      : drinksData.filter((drink) => drink.category === selectedCategory);

  return (
    <div className="menu-page">
      <h1 className="main-heading">Drinks Menu</h1>
      <div className="menu-container">
        <div className="category-selection">
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="drinks-display">
          <h2>{selectedCategory === "All" ? "All Drinks" : selectedCategory}</h2>
          <div className="drinks-grid">
            {filteredDrinks.map((drink, index) => (
              <div key={index} className="drink-card">
                <img src={drink.image} alt={drink.name} className="drink-image" />
                <p className="drink-name">{drink.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksMenu;
