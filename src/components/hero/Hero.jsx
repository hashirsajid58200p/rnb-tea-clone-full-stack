import React from "react";
import "./Hero.css";
import heroTopImg from "../../assets/hero.png";
import img1 from "../../assets/insta_hero_1.png";
import img2 from "../../assets/insta_hero_2.png";
import img3 from "../../assets/insta_hero_3.png";
import img4 from "../../assets/insta_hero_4.png";
import img5 from "../../assets/insta_hero_5.png";
import profile from "../../assets/profile.png";

const images = [img1, img2, img3, img4, img5];

function Hero() {
  return (
    <div className="hero">
      {/* Hero Image */}
      <div className="heroTop">
        <img src={heroTopImg} alt="Hero Background" />
      </div>

      {/* Hero Text */}
      <div className="heroMid">
        <h1 className="heroText">
          Sourcing High Quality Tea from Around the World
        </h1>
      </div>

      {/* Hero Image Slider */}
      <div className="heroBottom">
        {/* Instagram Profile (Fixed at Top of Slider) */}
        <div className="instaProfile">
          <a href="https://www.instagram.com/rbteausa/" target="_blank" rel="noopener noreferrer">
            <img src={profile} alt="Instagram Profile" />
          </a>
        </div>

        {/* Moving Image Slider */}
        <div className="slider">
          <div className="slider-track">
            {images.concat(images).map((image, index) => (
              <img key={index} src={image} alt={`slide-${index}`} className="slide" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
