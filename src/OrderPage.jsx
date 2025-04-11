// src/components/menu/order/OrderPage.jsx
import React from "react";
import Header from "./components/header/Header.jsx"; // Importing from components/header/
import Footer from "./components/footer/Footer.jsx"; // Importing from components/footer/
import OrderSummary from "./components/menu/order/OrderSummary.jsx";

const OrderPage = () => {
  return (
    <>
      <Header />
      <OrderSummary />
      <Footer />
    </>
  );
};

export default OrderPage;
