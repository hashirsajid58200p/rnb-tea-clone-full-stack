import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasketProvider } from "./context/BasketContext.jsx";
import "./index.css";

import HomePage from "./HomePage.jsx";
import MenuPage from "./MenuPage.jsx";
import MobileAppPage from "./MobileAppPage.jsx";
import FranchisePage from "./FranchisePage.jsx";
import ContactPage from "./ContactPage.jsx";
import OrderPage from "./OrderPage.jsx";
import CheckOutPage from "./CheckOutPage.jsx";
import ThankYouPage from "./ThankYouPage.jsx";
import AdminDashboard from "./components/franchise/adminDashboard/AdminDashboard.jsx";

createRoot(document.getElementById("root")).render(
  <BasketProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mobileApp" element={<MobileAppPage />} />
        <Route path="/franchise" element={<FranchisePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </BasketProvider>
);