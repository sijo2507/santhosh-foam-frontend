// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Products from './components/Products';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Products page */}
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
