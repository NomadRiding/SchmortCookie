import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import './App.css'

function App() {
 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> 
      </Routes>
    </>
  )
}

export default App
