import React from 'react'
import "./App.css"
import Header from "./components/header/Header.jsx"
import Hero from "./components/hero/Hero.jsx"
import About from './components/about/About.jsx'
import Menu from "./components/menu/Menu.jsx"
import MobileApp from './components/mobileapp/MobileApp.jsx'
import JoinUs from './components/joinus/JoinUs.jsx'
import Footer from './components/footer/Footer.jsx'

function App() {
  return (
    <>
    <Header/>
    <Hero/>
    <About/>
    <Menu/>
    <MobileApp/>
    <JoinUs/>
    <Footer/>
    </>
  )
}

export default App