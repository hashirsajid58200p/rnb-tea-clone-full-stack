// src/components/menu/order/CheckOutPage.jsx
import React from "react";
import Header from "./components/header/Header.jsx"; // Importing from components/header/
import Footer from "./components/footer/Footer.jsx"; // Importing from components/footer/
import CheckOut from "./components/menu/checkout/CheckOut.jsx";

const CheckOutPage = () => {
  return (
    <>
      <Header />
      <CheckOut />
      <Footer />
    </>
  );
};

export default CheckOutPage;
