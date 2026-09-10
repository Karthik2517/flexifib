import Home from './pages/Home';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Home />
      <CartDrawer />
    </CartProvider>
  );
}

export default App;