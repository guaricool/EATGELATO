import React, { createContext, useContext, useState, useEffect } from 'react';
import { FLAVORS, DAILY_OFFERS } from '../data/flavors';

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
  const [flavors, setFlavors] = useState(FLAVORS.map(f => ({ ...f, inStock: true })));
  const [offers, setOffers] = useState(DAILY_OFFERS.map(o => ({ ...o, active: true })));
  const [storeInfo, setStoreInfo] = useState(DEFAULT_STORE_INFO);
  const [story, setStory] = useState(DEFAULT_STORY);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Admin PIN
  const [adminPin, setAdminPin] = useState(() => localStorage.getItem('eat_gelato_pin') || '1234');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => sessionStorage.getItem('eat_gelato_auth') === 'true');

  // Helper for Uploading Base64 images to VPS /api/upload
  const uploadImageIfNeeded = async (imageString) => {
    if (!imageString || !imageString.startsWith('data:image')) {
      return imageString; // Already a URL
    }
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64: imageString })
      });
      const data = await res.json();
      return data.url || imageString;
    } catch (err) {
      console.error('Error uploading image to VPS:', err);
      return imageString;
    }
  };

  // Fetch initial data from VPS API
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/initial-data');
        if (res.ok) {
          const db = await res.json();
          if (db.flavors && db.flavors.length > 0) setFlavors(db.flavors);
          if (db.offers && db.offers.length > 0) setOffers(db.offers);
          if (db.storeInfo) setStoreInfo(db.storeInfo);
          if (db.story) setStory(db.story);
          if (db.orders) setOrders(db.orders);
        }
      } catch (err) {
        console.warn('Backend API not reachable offline, fallback to defaults:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('eat_gelato_pin', adminPin);
  }, [adminPin]);

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

  // Flavor actions with VPS sync
  const addFlavor = async (newFlavor) => {
    const imageUrl = await uploadImageIfNeeded(newFlavor.image);
    const payload = { ...newFlavor, image: imageUrl };

    try {
      const res = await fetch('/api/flavors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const savedFlavor = await res.json();
        setFlavors(prev => [savedFlavor, ...prev]);
        return;
      }
    } catch (e) {
      console.error('API Error adding flavor:', e);
    }
    // Fallback local
    const fallbackId = 'f_' + Date.now();
    setFlavors(prev => [{ ...payload, id: fallbackId, inStock: true }, ...prev]);
  };

  const updateFlavor = async (id, updatedData) => {
    let imageUrl = updatedData.image;
    if (imageUrl) {
      imageUrl = await uploadImageIfNeeded(imageUrl);
    }
    const payload = { ...updatedData, image: imageUrl };

    try {
      const res = await fetch(`/api/flavors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        setFlavors(prev => prev.map(f => f.id === id ? saved : f));
        return;
      }
    } catch (e) {
      console.error('API Error updating flavor:', e);
    }
    setFlavors(prev => prev.map(f => f.id === id ? { ...f, ...payload } : f));
  };

  const deleteFlavor = async (id) => {
    try {
      await fetch(`/api/flavors/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('API Error deleting flavor:', e);
    }
    setFlavors(prev => prev.filter(f => f.id !== id));
  };

  const toggleFlavorStock = async (id) => {
    const target = flavors.find(f => f.id === id);
    if (!target) return;
    const newStock = !target.inStock;

    setFlavors(prev => prev.map(f => f.id === id ? { ...f, inStock: newStock } : f));

    try {
      await fetch(`/api/flavors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: newStock })
      });
    } catch (e) {
      console.error('API Error toggling stock:', e);
    }
  };

  // Offer actions with VPS sync
  const addOffer = async (newOffer) => {
    const imageUrl = await uploadImageIfNeeded(newOffer.image);
    const payload = { ...newOffer, image: imageUrl };

    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        setOffers(prev => [saved, ...prev]);
        return;
      }
    } catch (e) {
      console.error('API Error adding offer:', e);
    }
    setOffers(prev => [{ ...payload, id: 'offer_' + Date.now(), active: true }, ...prev]);
  };

  const updateOffer = async (id, updatedData) => {
    let imageUrl = updatedData.image;
    if (imageUrl) imageUrl = await uploadImageIfNeeded(imageUrl);
    const payload = { ...updatedData, image: imageUrl };

    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const saved = await res.json();
        setOffers(prev => prev.map(o => o.id === id ? saved : o));
        return;
      }
    } catch (e) {
      console.error('API Error updating offer:', e);
    }
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...payload } : o));
  };

  const deleteOffer = async (id) => {
    try {
      await fetch(`/api/offers/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('API Error deleting offer:', e);
    }
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  // Store Info & Story with VPS sync
  const updateStoreInfo = async (newInfo) => {
    setStoreInfo(prev => ({ ...prev, ...newInfo }));
    try {
      await fetch('/api/store-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInfo)
      });
    } catch (e) {
      console.error('API Error updating store info:', e);
    }
  };

  const updateStory = async (newStory) => {
    let imageUrl = newStory.image;
    if (imageUrl) imageUrl = await uploadImageIfNeeded(imageUrl);
    const payload = { ...newStory, image: imageUrl };

    setStory(prev => ({ ...prev, ...payload }));

    try {
      await fetch('/api/story', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error('API Error updating story:', e);
    }
  };

  const addOrder = async (order) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (res.ok) {
        const savedOrder = await res.json();
        setOrders(prev => [savedOrder, ...prev]);
        return;
      }
    } catch (e) {
      console.error('API Error adding order:', e);
    }
    setOrders(prev => [{ ...order, id: 'ord_' + Date.now(), date: new Date().toLocaleString('es-VE') }, ...prev]);
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
      isLoading,
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
