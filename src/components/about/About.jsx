// About.jsx
import React from "react";
import "./About.css";
import aboutImage from "../../assets/newOneFeatures.png"; // Replace with your own image path

function About() {
  return (
    <div className="aboutSection">
      <div className="aboutContainer">
        <h2>About Us</h2>
        <p>
        We pride ourselves in sourcing high-quality ingredients from around the world such as premium tea leaves from Taiwan, matcha from Japan, and fresh kumquat juice from Vietnam. Each drink is carefully crafted with excellence and always from fresh fruit. Now R&B Tea has more than 1500 stores globally in Singapore, the Philippines, Cambodia, China, Vietnam, and USA.
        </p>
        <div className="aboutImageContainer">
          <img src={aboutImage} alt="About Us" className="aboutImage" />
        </div>
      </div>
    </div>
  );
}

export default About;
