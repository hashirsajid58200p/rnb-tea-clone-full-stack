import React from 'react'
import "./App.css"
import Header from "./components/header/Header.jsx"
import Hero from "./components/hero/Hero.jsx"
import About from './components/about/About.jsx'
import Menu from "./components/menu/Menu.jsx"

function App() {
  return (
    <>
    <Header/>
    <Hero/>
    <About/>
    <Menu/>
    </>
  )
}

export default App