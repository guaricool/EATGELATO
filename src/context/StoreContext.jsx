import React, { createContext, useContext, useState, useEffect } from 'react';
import { FLAVORS, DAILY_OFFERS, TUB_SIZES, TOPPINGS, PAYMENT_METHODS } from '../data/flavors';

const StoreContext = createContext();

const DEFAULT_STORE_INFO = {
  name: 'EAT GELATO',
  tagline: 'GOURMET ARTESANAL',
  address: 'Av. Principal de Las Mercedes, Caracas - Venezuela 🇻🇪',
  reference: 'Frente a la plaza principal. Estacionamiento exclusivo.',
  phone: '+58 412-1234567',
  whatsapp: '584121234567',
  email: 'contacto@eatgelato.com.ve',
  hours: {
    weekdays: '12:00 PM - 10:00 PM',
    weekends: '12:00 PM - 11:30 PM',
    sunday: '12:00 PM - 10:30 PM'
  },
  paymentMethods: ['pago-movil', 'zelle', 'efectivo', 'punto'],
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com'
  }
};

const DEFAULT_STORY = {
  title: 'Pasión Artesanal y Atención Familiar',
  badge: 'Atendido por su propio dueño',
  subtitle: 'Nuestra Esencia',
  text: 'En EAT GELATO no hacemos producción industrial. Somos una heladería atendida personalmente por su dueño y maestro gelatero. Creemos en el valor de las cosas hechas sin prisa, cuidando cada detalle desde la elección de las materias primas hasta la textura final en la copa.',
  image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
};

export function StoreProvider({ children }) {
  // Flavors
  const [flavors, setFlavors] = useState(() => {
    const saved = localStorage.getItem('eat_gelato_flavors');
    return saved ? JSON.parse(saved) : FLAVORS.map(f => ({ ...f, inStock: true }));
  });

  // Offers
  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('eat_gelato_offers');
    return saved ? JSON.parse(saved) : DAILY_OFFERS.map(o => ({ ...o, active: true }));
  });

  // Store Info
  const [storeInfo, setStoreInfo] = useState(() => {
    const saved = localStorage.getItem('eat_gelato_info');
    return saved ? JSON.parse(saved) : DEFAULT_STORE_INFO;
  });

  // Story
  const [story, setStory] = useState(() => {
    const saved = localStorage.getItem('eat_gelato_story');
    return saved ? JSON.parse(saved) : DEFAULT_STORY;
  });

  // Orders Log
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('eat_gelato_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Admin Authentication
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('eat_gelato_pin') || '1234';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('eat_gelato_auth') === 'true';
  });

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('eat_gelato_flavors', JSON.stringify(flavors));
  }, [flavors]);

  useEffect(() => {
    localStorage.setItem('eat_gelato_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('eat_gelato_info', JSON.stringify(storeInfo));
  }, [storeInfo]);

  useEffect(() => {
    localStorage.setItem('eat_gelato_story', JSON.stringify(story));
  }, [story]);

  useEffect(() => {
    localStorage.setItem('eat_gelato_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('eat_gelato_pin', adminPin);
  }, [adminPin]);

  // Actions
  const loginAdmin = (pin) => {
    if (pin === adminPin) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('eat_gelato_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('eat_gelato_auth');
  };

  // Flavor actions
  const addFlavor = (newFlavor) => {
    const flavorWithId = {
      ...newFlavor,
      id: 'f_' + Date.now(),
      inStock: true,
      rating: newFlavor.rating || 5.0
    };
    setFlavors([flavorWithId, ...flavors]);
  };

  const updateFlavor = (id, updatedData) => {
    setFlavors(flavors.map(f => f.id === id ? { ...f, ...updatedData } : f));
  };

  const deleteFlavor = (id) => {
    setFlavors(flavors.filter(f => f.id !== id));
  };

  const toggleFlavorStock = (id) => {
    setFlavors(flavors.map(f => f.id === id ? { ...f, inStock: !f.inStock } : f));
  };

  // Offer actions
  const addOffer = (newOffer) => {
    const offerWithId = {
      ...newOffer,
      id: 'offer_' + Date.now(),
      active: true
    };
    setOffers([offerWithId, ...offers]);
  };

  const updateOffer = (id, updatedData) => {
    setOffers(offers.map(o => o.id === id ? { ...o, ...updatedData } : o));
  };

  const deleteOffer = (id) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  // Store Info & Story
  const updateStoreInfo = (newInfo) => {
    setStoreInfo(prev => ({ ...prev, ...newInfo }));
  };

  const updateStory = (newStory) => {
    setStory(prev => ({ ...prev, ...newStory }));
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: 'ord_' + Date.now(),
      date: new Date().toLocaleString('es-VE')
    };
    setOrders([newOrder, ...orders]);
  };

  return (
    <StoreContext.Provider value={{
      flavors,
      offers,
      storeInfo,
      story,
      orders,
      adminPin,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      addFlavor,
      updateFlavor,
      deleteFlavor,
      toggleFlavorStock,
      addOffer,
      updateOffer,
      deleteOffer,
      updateStoreInfo,
      updateStory,
      addOrder,
      setAdminPin
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
