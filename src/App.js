// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import MainPage from './MainPage';
import PopularPage from './PopularPage';
import NewArrivalsPage from './NewArrivalsPage';
import AboutPage from './AboutPage';
import GameFiguresPage from './GameFiguresPage';
import SuperheroFiguresPage from './SuperheroFiguresPage';
import GundamFiguresPage from './GundamFiguresPage';
import AnimeFiguresPage from './AnimeFiguresPage';
import CheckoutPage from './CheckoutPage';
import ReceiptPage from './ReceiptPage';
import AnalyticsDashboard from './AnalyticsDashboard';
import './App.css'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/popular" element={<PopularPage />} />
      <Route path="/newarrivals" element={<NewArrivalsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/game-figures" element={<GameFiguresPage />} />
      <Route path="/superhero-figures" element={<SuperheroFiguresPage />} />
      <Route path="/gundam-models" element={<GundamFiguresPage />} />
      <Route path="/anime-figures" element={<AnimeFiguresPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/receipt" element={<ReceiptPage />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
    </Routes>
  );
}

export default App;