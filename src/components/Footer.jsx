import React from 'react';
import { Heart, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer({ onOpenAdmin }) {
  const { storeInfo } = useStore();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="brand-logo">
            <img src="/logo.jpg" alt="EAT GELATO Logo" className="logo-img" />
            <div className="brand-text">
              <span className="brand-title">{storeInfo.name}</span>
              <span className="brand-subtitle">{storeInfo.tagline}</span>
            </div>
          </div>
          <p className="footer-desc">
            Heladería gourmet artesanal. Elaborados diariamente en pequeños lotes y atendida personalmente por su propio dueño.
          </p>
        </div>

        <div className="footer-links">
          <h4>Navegación</h4>
          <a href="#inicio">Inicio</a>
          <a href="#ofertas">Ofertas del Día</a>
          <a href="#sabores">Menú de Sabores</a>
          <a href="#armar-pote">Armar Pote</a>
          <a href="#historia">El Gelataio</a>
        </div>

        <div className="footer-links">
          <h4>Contacto y Pedidos</h4>
          <a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Directo</a>
          <a href="#contacto">Ubicación y Mapas</a>
          <a href={`mailto:${storeInfo.email}`}>{storeInfo.email}</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>© {new Date().getFullYear()} {storeInfo.name}. Todos los derechos reservados.</p>
          <div className="bottom-right-links">
            <button className="admin-footer-btn" onClick={onOpenAdmin}>
              <Lock size={12} /> Acceso Administrador
            </button>
            <span className="made-with">
              Hecho con <Heart size={14} fill="#C83E4D" color="#C83E4D" /> para los amantes del buen gelato
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--color-chocolate);
          color: #FFFFFF;
          padding-top: 4rem;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3.5rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--color-terracotta);
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.3rem;
          color: #FFF;
        }

        .brand-subtitle {
          font-size: 0.65rem;
          color: var(--color-vanilla);
          letter-spacing: 1.5px;
        }

        .footer-desc {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 380px;
          line-height: 1.6;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .footer-links h4 {
          font-size: 1.05rem;
          color: var(--color-vanilla);
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.75);
          transition: var(--transition);
        }

        .footer-links a:hover {
          color: var(--color-terracotta);
        }

        .footer-bottom {
          padding: 1.5rem 0;
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.5);
          background: #2D1C19;
        }

        .bottom-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .bottom-right-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .admin-footer-btn {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.7);
          border: none;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: var(--transition);
        }

        .admin-footer-btn:hover {
          background: var(--color-terracotta);
          color: #FFF;
        }

        .made-with {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        @media (max-width: 900px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
}
