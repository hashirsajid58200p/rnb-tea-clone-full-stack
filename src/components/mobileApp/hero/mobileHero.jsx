import React from "react";
import "./mobileHero.css";
import mobileImage from "../../../assets/mobile-bKgi5ta_.png"; // Your mobile app image
import googlePlayImage from "../../../assets/googleplay-j0L81E0Z.png"; // Your Google Play image

function MobileHero() {
  return (
    <div className="mobileHeroWrapper">
      <div className="mobileHero-container">
        <div className="mobileHero-image">
          <img src={mobileImage} alt="Mobile App" className="mobileHero-img" />
        </div>

        <div className="mobileHero-text">
          <h1 className="mobileHero-heading">Coming Soon</h1>
          <p className="mobileHero-paragraph">
            Start earning rewards with easy ordering & delivery
          </p>
          <div className="mobileHero-image-container">
            <img
              src={googlePlayImage}
              alt="Google Play"
              className="mobileHero-googleplay-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileHero;
