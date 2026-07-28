import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DailyOffers from './components/DailyOffers';
import Menu from './components/Menu';
import TubBuilder from './components/TubBuilder';
import OurStory from './components/OurStory';
import CartModal from './components/CartModal';
import LocationHours from './components/LocationHours';
import Footer from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [builderSelectedFlavors, setBuilderSelectedFlavors] = useState([]);

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
      // Scroll to builder
      const el = document.getElementById('armar-pote');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add daily offer directly to cart
  const handleSelectOffer = (offer) => {
    const offerItem = {
      id: Date.now().toString(),
      title: offer.title,
      totalPrice: parseInt(offer.price.replace(/[^0-9]/g, '')) || 8500
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

      <Footer />

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
