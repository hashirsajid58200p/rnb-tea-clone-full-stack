import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import MobileAppPage from "./MobileAppPage.jsx";
import ContactPage from "./ContactPage.jsx";
import FranchisePage from "./FranchisePage.jsx";
import MenuPage from "./MenuPage.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    {/* <MobileAppPage />
    <ContactPage />
    <FranchisePage/> */}
    <MenuPage />
  </>
);
