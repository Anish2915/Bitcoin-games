import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing context
import { ThemeProvider } from './context/ThemeContext';

// Importing pages
import Home from './pages/Home';

// Importing components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}