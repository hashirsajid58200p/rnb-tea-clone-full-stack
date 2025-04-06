// src/MobileAppPage.jsx

import React from "react";
import Header from "./components/header/Header";
import MobileHero from "./components/mobileApp/hero/mobileHero"; // Adjust path if needed
import Features from "./components/mobileApp/features/Features.jsx";
import Footer from "./components/footer/Footer";

const MobileAppPage = () => {
  return (
    <>
      <Header />
      <MobileHero />
      <Features />
      <Footer />
    </>
  );
};

export default MobileAppPage;
