import React, { useState, useEffect, useContext } from "react";
import "./DrinksMenu.css";
import { createClient } from "@supabase/supabase-js";
import Basket from "./Basket";
import { BasketContext } from "../../context/BasketContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simple Loader Component
const Loader = () => (
  <div className="loader">
    {/* You can add a CSS spinner here if you want! */}
  </div>
);

const DrinksMenu = () => {
  const { basket, setBasket } = useContext(BasketContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [addedDrinkName, setAddedDrinkName] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Supabase client
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;
        setDrinks(data || []);
      } catch (err) {
        setError(err.message);
        toast.error(
          `Failed to load drinks: ${err.message}. Please try again.`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrinks();
  }, []);

  useEffect(() => {
    if (selectedDrink) {
      fetchReviews(selectedDrink.id);
    }
  }, [selectedDrink]);

  const categories = ["All", ...new Set(drinks.map((drink) => drink.category))];

  const filteredDrinks =
    selectedCategory === "All"
      ? drinks
      : drinks.filter((drink) => drink.category === selectedCategory);

  const openPopup = async (drink) => {
    setSelectedDrink(drink);
    setActiveTab("Description");
    setRating(0);
    setComment("");
    await fetchReviews(drink.id);
  };

  const closePopup = () => {
    setSelectedDrink(null);
    setReviews([]);
    setRating(0);
    setComment("");
  };

  const fetchReviews = async (drinkId) => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("drink_id", drinkId)
      .order("created_at", { ascending: false });
    if (error) {
    } else setReviews(data || []);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDrink || !rating || comment.trim() === "") return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from("reviews").insert({
        drink_id: selectedDrink.id,
        user_email: "johndoe@example.com", // Replace with logged-in user email if applicable
        rating: parseInt(rating),
        comment: comment,
        created_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success(
        `Your review for ${selectedDrink.name} has been submitted!`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setRating(0);
      setComment("");
      await fetchReviews(selectedDrink.id);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addToBasket = (drink) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find((item) => item.id === drink.id);
      if (existingItem) {
        return prevBasket;
      }
      return [...prevBasket, { ...drink, quantity: 1 }];
    });
    setAddedDrinkName(drink.name);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  const handleStarClick = (value) => {
    setRating(value === rating ? 0 : value);
  };

  return (
    <div className="drinks-menu">
      <ToastContainer />
      <h1>Drinks Menu</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div className="menu-layout">
          <aside className="menu-sidebar">
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={category === selectedCategory ? "active" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </aside>
          <main className="menu-content">
            {filteredDrinks.length > 0 ? (
              filteredDrinks.map((drink) => (
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
              ))
            ) : (
              <p>
                No drinks available. Please add products in the admin dashboard.
              </p>
            )}
          </main>
        </div>
      )}

      <Basket />

      {showSuccessPopup && (
        <div className="success-popup">
          <p>{addedDrinkName} successfully added to cart!</p>
        </div>
      )}

      {selectedDrink && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>
              ×
            </button>
            <h2>{selectedDrink.name}</h2>
            <div className="popup-tabs">
              <button
                className={activeTab === "Description" ? "active" : ""}
                onClick={() => setActiveTab("Description")}
              >
                Description
              </button>
              <button
                className={activeTab === "Reviews" ? "active" : ""}
                onClick={() => setActiveTab("Reviews")}
              >
                Reviews
              </button>
            </div>

            {activeTab === "Description" && (
              <div className="drink-description">
                <p>{selectedDrink.description}</p>
              </div>
            )}

            {activeTab === "Reviews" && (
              <div className="drink-reviews">
                <h3>Reviews</h3>
                <div className="reviews-list">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <p>Rating: {review.rating} stars</p>
                        <p>{review.comment}</p>
                        <span className="review-timestamp">
                          {new Date(review.created_at).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet. Be the first to add one!</p>
                  )}
                </div>
                <div className="review-input">
                  <div className="star-rating">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <span
                          key={starValue}
                          className={`star ${
                            starValue <= rating ? "filled" : ""
                          }`}
                          onClick={() => handleStarClick(starValue)}
                        >
                          ★
                        </span>
                      );
                    })}
                  </div>
                  <textarea
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  <button
                    onClick={handleReviewSubmit}
                    disabled={isSubmitting || !rating || comment.trim() === ""}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
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
