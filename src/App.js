import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Success from './pages/Success';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;