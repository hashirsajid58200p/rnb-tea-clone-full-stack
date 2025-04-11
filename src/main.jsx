// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasketProvider } from "./context/BasketContext.jsx";
import "./index.css"

import App from "./App.jsx";
import MenuPage from "./MenuPage.jsx";
import MobileAppPage from "./MobileAppPage.jsx";
import FranchisePage from "./FranchisePage.jsx";
import ContactPage from "./ContactPage.jsx";
import OrderPage from "./OrderPage.jsx"; // Updated import
import CheckOutPage from "./CheckOutPage.jsx"; // Updated import
import ThankYou from "./components/menu/thankyou/ThanksYou.jsx";

createRoot(document.getElementById("root")).render(
  <BasketProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mobileApp" element={<MobileAppPage />} />
        <Route path="/franchise" element={<FranchisePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order" element={<OrderPage />} /> {/* Updated */}
        <Route path="/checkout" element={<CheckOutPage />} /> {/* Updated */}
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  </BasketProvider>
);
