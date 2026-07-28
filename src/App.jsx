import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import Hero from './components/Hero';
import DailyOffers from './components/DailyOffers';
import Menu from './components/Menu';
import TubBuilder from './components/TubBuilder';
import OurStory from './components/OurStory';
import CartModal from './components/CartModal';
import LocationHours from './components/LocationHours';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPortal from './components/AdminPortal';

function MainApp() {
  const { isAdminAuthenticated, addOrder } = useStore();
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [builderSelectedFlavors, setBuilderSelectedFlavors] = useState([]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check if user navigated to #/admin or /admin
  const isAdminRoute = currentRoute === '#/admin' || window.location.pathname === '/admin';

  if (isAdminRoute) {
    if (!isAdminAuthenticated) {
      return <AdminLogin />;
    }
    return <AdminPortal onGoToLanding={() => { window.location.hash = ''; }} />;
  }

  // Add custom tub to cart
  const handleAddToCart = (newItem) => {
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  // Add single flavor quick Tub
  const handleSelectFlavorFromMenu = (flavorName) => {
    if (builderSelectedFlavors.includes(flavorName)) {
      setBuilderSelectedFlavors(builderSelectedFlavors.filter((f) => f !== flavorName));
    } else {
      setBuilderSelectedFlavors([...builderSelectedFlavors, flavorName]);
      const el = document.getElementById('armar-pote');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add daily offer directly to cart
  const handleSelectOffer = (offer) => {
    const offerItem = {
      id: Date.now().toString(),
      title: offer.title,
      totalPrice: parseFloat((offer.price || '8.00').replace(/[^0-9.]/g, '')) || 8.0
    };
    setCartItems([...cartItems, offerItem]);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="app-main">
      <Header 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main>
        <Hero />
        <DailyOffers onSelectOffer={handleSelectOffer} />
        <Menu 
          onSelectFlavor={handleSelectFlavorFromMenu}
          selectedFlavors={builderSelectedFlavors}
        />
        <TubBuilder onAddToCart={handleAddToCart} />
        <OurStory />
        <LocationHours />
      </main>

      <Footer onOpenAdmin={() => { window.location.hash = '#/admin'; }} />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
