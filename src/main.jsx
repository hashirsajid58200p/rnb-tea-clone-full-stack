// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BasketProvider } from './context/BasketContext.jsx';

import App from './App.jsx';
import MenuPage from './MenuPage.jsx';
import MobileAppPage from './MobileAppPage.jsx';
import FranchisePage from './FranchisePage.jsx';
import ContactPage from './ContactPage.jsx';
import OrderSummary from './components/menu/order/OrderSummary.jsx';
import ThankYou from './components/menu/thankyou/ThanksYou.jsx'; // New import

createRoot(document.getElementById('root')).render(
  <BasketProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mobileApp" element={<MobileAppPage />} />
        <Route path="/franchise" element={<FranchisePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order" element={<OrderSummary />} />
        <Route path="/thank-you" element={<ThankYou />} /> {/* New route */}
      </Routes>
    </BrowserRouter>
  </BasketProvider>
);