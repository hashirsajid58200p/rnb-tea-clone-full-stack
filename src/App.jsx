import React from "react";
import "./App.css";
import Header from "./components/header/Header.jsx";
import Hero from "./components/home/hero/Hero.jsx";
import About from "./components/home/about/About.jsx";
import Menu from "./components/home/menu/Menu.jsx";
import MobileApp from "./components/home/mobileapp/MobileApp.jsx";
import JoinUs from "./components/home/joinus/JoinUs.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Menu />
      <MobileApp />
      <JoinUs />
      <Footer />
    </>
  );
}

export default App;
