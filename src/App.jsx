import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing context
import { ThemeProvider } from './context/ThemeContext';

// Importing pages
import Home from './pages/Home';
import Publish from './pages/Publish'
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import NewsPage from './pages/NewsPage';
import Finance from './pages/Finance';

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
          <Route path='/newsFeed' element={<Explore />} />
          <Route path='/publishNew' element={<Publish />} />
          <Route path='/profile/:userAdd' element={<Profile />} />
          <Route path='/newsFeed/:feedId' element={<NewsPage />} />
          <Route path='/finance' element={<Finance />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}