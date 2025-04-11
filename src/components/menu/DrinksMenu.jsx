// src/components/menu/DrinksMenu.jsx
import React, { useState, useEffect, useContext } from 'react';
import './DrinksMenu.css';
import drinksData from './drinksData';
import { db } from './firebase';
import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import Basket from './Basket';
import { BasketContext } from '../../context/BasketContext.jsx';

const DrinksMenu = () => {
  const { basket, setBasket } = useContext(BasketContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [activeTab, setActiveTab] = useState('Description');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [addedDrinkName, setAddedDrinkName] = useState('');

  const categories = ['All', ...new Set(drinksData.map(drink => drink.category))];

  const filteredDrinks =
    selectedCategory === 'All'
      ? drinksData
      : drinksData.filter(drink => drink.category === selectedCategory);

  const openPopup = async (drink) => {
    setSelectedDrink(drink);
    setActiveTab('Description');
    setNewReview('');
    try {
      const drinkRef = doc(db, 'drinks', drink.id.toString());
      const docSnap = await getDoc(drinkRef);
      if (docSnap.exists()) {
        setReviews(docSnap.data().reviews || []);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const closePopup = () => {
    setSelectedDrink(null);
    setReviews([]);
    setNewReview('');
  };

  const handleReviewSubmit = async () => {
    if (!selectedDrink || newReview.trim() === '') return;

    setIsSubmitting(true);
    try {
      const drinkRef = doc(db, 'drinks', selectedDrink.id.toString());
      const drinkSnap = await getDoc(drinkRef);

      const reviewData = {
        text: newReview,
        timestamp: new Date().toISOString(),
      };

      if (!drinkSnap.exists()) {
        await setDoc(drinkRef, { reviews: [reviewData] });
      } else {
        await updateDoc(drinkRef, {
          reviews: arrayUnion(reviewData),
        });
      }

      setReviews(prev => [...prev, reviewData]);
      setNewReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addToBasket = (drink) => {
    setBasket(prevBasket => {
      const existingItem = prevBasket.find(item => item.id === drink.id);
      if (existingItem) {
        // If the drink is already in the basket, don’t add it again or increase quantity
        return prevBasket; // Return unchanged basket
      }
      // Add the drink with quantity 1 only if it’s not already in the basket
      return [...prevBasket, { ...drink, quantity: 1 }];
    });
    setAddedDrinkName(drink.name);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  return (
    <div className="drinks-menu">
      <h1>Drinks Menu</h1>
      <div className="menu-layout">
        <aside className="menu-sidebar">
          <ul>
            {categories.map((category, index) => (
              <li
                key={index}
                className={category === selectedCategory ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>
        <main className="menu-content">
          {filteredDrinks.map(drink => (
            <div
              key={drink.id}
              className="drink-card"
              onClick={() => openPopup(drink)}
            >
              <img src={drink.image} alt={drink.name} />
              <p>{drink.name}</p>
              <p className="drink-price">${drink.price}</p>
              <button
                className="add-to-basket"
                onClick={(e) => {
                  e.stopPropagation();
                  addToBasket(drink);
                }}
              >
                <i className="fa fa-shopping-cart"></i> Add to Basket
              </button>
            </div>
          ))}
        </main>
      </div>

      <Basket />

      {showSuccessPopup && (
        <div className="success-popup">
          <p>{addedDrinkName} successfully added to cart!</p>
        </div>
      )}

      {selectedDrink && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>×</button>
            <h2>{selectedDrink.name}</h2>
            <div className="popup-tabs">
              <button
                className={activeTab === 'Description' ? 'active' : ''}
                onClick={() => setActiveTab('Description')}
              >
                Description
              </button>
              <button
                className={activeTab === 'Reviews' ? 'active' : ''}
                onClick={() => setActiveTab('Reviews')}
              >
                Reviews
              </button>
            </div>

            {activeTab === 'Description' && (
              <div className="drink-description">
                <p>{selectedDrink.description}</p>
              </div>
            )}

            {activeTab === 'Reviews' && (
              <div className="drink-reviews">
                <h3>Reviews</h3>
                <div className="reviews-list">
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={index} className="review-item">
                        <p>{review.text}</p>
                        <span className="review-timestamp">
                          {new Date(review.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet. Be the first to add one!</p>
                  )}
                </div>
                <div className="review-input">
                  <textarea
                    placeholder="Write your review..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    rows={3}
                  />
                  <button
                    onClick={handleReviewSubmit}
                    disabled={isSubmitting || newReview.trim() === ''}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinksMenu;