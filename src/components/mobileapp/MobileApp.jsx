import React from "react";
import "./MobileApp.css";
import appImage from "../../assets/mobile_cover.jpg"; // Make sure to replace this with your actual image path

function MobileApp() {
  return (
    <div className="mobileAppWrapper">
      <div className="mobileApp-container">
        <img src={appImage} alt="Mobile App" className="mobileApp-image" />
        <div className="mobileApp-text">
          <h2 className="mobileApp-heading">R&B USA Mobile App</h2>
          <p className="mobileApp-paragraph">
            We are proud to announce the launch of our new Mobile App coming soon. 
            It’s a convenient way to order ahead and pay right on your phone.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobileApp;
