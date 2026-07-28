import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Award, Phone } from 'lucide-react';

export default function Header({ cartCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#inicio" className="brand-logo">
          <img src="/logo.jpg" alt="EAT GELATO Gourmet Logo" className="logo-img" />
          <div className="brand-text">
            <span className="brand-title">EAT GELATO</span>
            <span className="brand-subtitle">GOURMET ARTESANAL</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#inicio">Inicio</a>
          <a href="#ofertas">Ofertas del Día</a>
          <a href="#sabores">Menú de Sabores</a>
          <a href="#armar-pote">Armar Pote</a>
          <a href="#historia">El Gelataio</a>
          <a href="#contacto">Ubicación</a>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <a 
            href="https://wa.me/5491112345678?text=Hola%20EAT%20GELATO!%20Quisiera%20consultar%20por%20sus%20sabores%20artesanales." 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-header-wa"
          >
            <MessageCircle size={18} />
            <span className="wa-text">WhatsApp</span>
          </a>

          <button className="cart-badge-btn" onClick={onOpenCart} aria-label="Ver mi pedido">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="cart-count-bubble">{cartCount}</span>}
          </button>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
          <a href="#ofertas" onClick={() => setMobileMenuOpen(false)}>Ofertas del Día</a>
          <a href="#sabores" onClick={() => setMobileMenuOpen(false)}>Menú de Sabores</a>
          <a href="#armar-pote" onClick={() => setMobileMenuOpen(false)}>Armar mi Pote</a>
          <a href="#historia" onClick={() => setMobileMenuOpen(false)}>La Historia del Dueño</a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Ubicación y Horarios</a>
        </div>
      )}

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(250, 246, 240, 0.85);
          backdrop-filter: blur(12px);
          transition: var(--transition);
          border-bottom: 1px solid rgba(61, 39, 34, 0.06);
          padding: 0.8rem 0;
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: var(--shadow-sm);
          padding: 0.5rem 0;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .logo-img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(61, 39, 34, 0.15);
          border: 2px solid var(--color-blue);
          transition: var(--transition);
        }

        .brand-logo:hover .logo-img {
          transform: rotate(5deg) scale(1.05);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.4rem;
          color: var(--color-chocolate);
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .brand-subtitle {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--color-terracotta);
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.8rem;
        }

        .desktop-nav a {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-chocolate);
          position: relative;
          transition: var(--transition);
        }

        .desktop-nav a:hover {
          color: var(--color-terracotta);
        }

        .desktop-nav a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--color-terracotta);
          transition: var(--transition);
          border-radius: 2px;
        }

        .desktop-nav a:hover::after {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .btn-header-wa {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #25D366;
          color: #FFF;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.88rem;
          transition: var(--transition);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }

        .btn-header-wa:hover {
          background: #1EBE5A;
          transform: translateY(-2px);
        }

        .cart-badge-btn {
          position: relative;
          background: var(--bg-card-alt);
          color: var(--color-chocolate);
          border: 1px solid rgba(61, 39, 34, 0.1);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .cart-badge-btn:hover {
          background: var(--color-blue);
          color: #FFF;
          transform: scale(1.05);
        }

        .cart-count-bubble {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--color-cherry);
          color: #FFF;
          font-size: 0.75rem;
          font-weight: 800;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #FFF;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          color: var(--color-chocolate);
          padding: 0.4rem;
        }

        .mobile-nav-drawer {
          display: flex;
          flex-direction: column;
          background: #FFF;
          padding: 1.5rem;
          border-bottom: 2px solid var(--color-terracotta);
          box-shadow: var(--shadow-md);
        }

        .mobile-nav-drawer a {
          padding: 0.8rem 0;
          font-weight: 700;
          font-size: 1.1rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
          .wa-text {
            display: none;
          }
          .btn-header-wa {
            padding: 0.5rem;
            border-radius: 50%;
          }
        }
      `}</style>
    </header>
  );
}
