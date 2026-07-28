import React from 'react';
import { DAILY_OFFERS } from '../data/flavors';
import { Tag, Sparkles, ShoppingBag, Clock } from 'lucide-react';

export default function DailyOffers({ onSelectOffer }) {
  return (
    <section id="ofertas" className="offers-section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-terracotta">
            <Tag size={16} /> Exclusivo de Hoy
          </span>
          <h2 className="section-title">Ofertas Especiales del Día</h2>
          <p className="section-subtitle">
            Aprovechá nuestras promociones por tiempo limitado preparadas artesanalmente para hoy.
          </p>
        </div>

        <div className="offers-grid">
          {DAILY_OFFERS.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image-container">
                <img src={offer.image} alt={offer.title} className="offer-image" />
                <span className="offer-badge-top">{offer.badge}</span>
                <span className="offer-tag-bottom"><Clock size={12} /> {offer.tag}</span>
              </div>

              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-desc">{offer.description}</p>

                <div className="offer-footer">
                  <div className="price-box">
                    <span className="price-current">{offer.price}</span>
                    <span className="price-old">{offer.originalPrice}</span>
                  </div>

                  <button 
                    className="btn-primary btn-sm"
                    onClick={() => onSelectOffer(offer)}
                  >
                    <ShoppingBag size={16} /> Pedir Oferta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .offers-section {
          padding: 5rem 0;
          background: #FFFFFF;
        }

        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 3.5rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin: 0.8rem 0 0.5rem;
          color: var(--color-chocolate);
        }

        .section-subtitle {
          color: var(--color-chocolate-muted);
          font-size: 1.05rem;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .offer-card {
          background: var(--bg-primary);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(61, 39, 34, 0.08);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }

        .offer-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--color-terracotta);
        }

        .offer-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .offer-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .offer-card:hover .offer-image {
          transform: scale(1.08);
        }

        .offer-badge-top {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--color-terracotta);
          color: #FFF;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.78rem;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }

        .offer-tag-bottom {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(61, 39, 34, 0.85);
          backdrop-filter: blur(4px);
          color: #FFF;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .offer-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .offer-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 0.6rem;
          color: var(--color-chocolate);
        }

        .offer-desc {
          font-size: 0.92rem;
          color: var(--color-chocolate-muted);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .offer-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(61, 39, 34, 0.08);
          padding-top: 1rem;
        }

        .price-box {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .price-current {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 900;
          color: var(--color-terracotta-dark);
        }

        .price-old {
          font-size: 0.9rem;
          color: #999;
          text-decoration: line-through;
        }

        .btn-sm {
          padding: 0.6rem 1.2rem;
          font-size: 0.88rem;
        }
      `}</style>
    </section>
  );
}
