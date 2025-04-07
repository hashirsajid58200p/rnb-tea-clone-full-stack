// DrinksMenu.jsx
import React, { useState, useEffect } from "react";
import "./DrinksMenu.css";
import { db } from "./firebase";  // Import the firestore db object
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore"; // Firestore methods
import drinksData from "./drinksData.js"

const DrinksMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const categories = [
    "All",
    ...Array.from(new Set(drinksData.map((drink) => drink.category))),
  ];

  const filteredDrinks =
    selectedCategory === "All"
      ? drinksData
      : drinksData.filter((drink) => drink.category === selectedCategory);

  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
  };

  const closePopup = () => {
    setSelectedDrink(null);
  };

  // Fetch reviews when a drink is selected
  useEffect(() => {
    if (selectedDrink) {
      const fetchReviews = async () => {
        const docRef = doc(db, "drinks", selectedDrink.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setReviews(docSnap.data().reviews || []);
        } else {
          setReviews([]);
        }
      };

      fetchReviews();
    }
  }, [selectedDrink]);

  // Submit new review to Firestore
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      const docRef = doc(db, "drinks", selectedDrink.id);
      await setDoc(docRef, { 
        reviews: arrayUnion(newReview.trim()) }, { merge: true });

      setNewReview(""); // Clear review input field
      setReviews((prevReviews) => [...prevReviews, newReview.trim()]); // Update local reviews
    }
  };

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
          <h2>
            {selectedCategory === "All" ? "All Drinks" : selectedCategory}
          </h2>
          <div className="drinks-grid">
            {filteredDrinks.map((drink, index) => (
              <div
                key={index}
                className="drink-card"
                onClick={() => handleDrinkClick(drink)}
              >
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="drink-image"
                />
                <p className="drink-name">{drink.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedDrink && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={closePopup}>
              &times;
            </button>
            <img
              src={selectedDrink.image}
              alt={selectedDrink.name}
              className="popup-image"
            />
            <div className="popup-content">
              <h3>{selectedDrink.name}</h3>
              <div className="popup-tab-content">
                {activeTab === "description" ? (
                  <p>{selectedDrink.description}</p>
                ) : (
                  <div>
                    <h4>Reviews</h4>
                    {/* Display reviews */}
                    <ul>
                      {reviews.map((review, index) => (
                        <li key={index}>{review}</li>
                      ))}
                    </ul>

                    {/* Add your review form */}
                    <form onSubmit={handleReviewSubmit}>
                      <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Add your review"
                      ></textarea>
                      <button type="submit">Submit Review</button>
                    </form>
                  </div>
                )}
              </div>
              <div className="popup-buttons">
                <button
                  className={`description-btn ${
                    activeTab === "description" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`reviews-btn ${
                    activeTab === "reviews" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinksMenu;
