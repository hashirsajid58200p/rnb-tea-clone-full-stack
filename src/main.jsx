// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import MenuPage from "./MenuPage.jsx";
import MobileAppPage from "./MobileAppPage.jsx";
import FranchisePage from "./FranchisePage.jsx";
import ContactPage from "./ContactPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/mobileApp" element={<MobileAppPage />} />
      <Route path="/franchise" element={<FranchisePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </BrowserRouter>
);
 