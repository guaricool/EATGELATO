import React from 'react';
import { Award, Sparkles, ShoppingBag, ArrowDown, Heart, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="container hero-container">
        {/* Left Text Content */}
        <div className="hero-content">
          <div className="hero-badges">
            <span className="badge badge-terracotta">
              <Award size={16} /> Atendido por su propio dueño
            </span>
            <span className="badge badge-blue">
              <Sparkles size={16} /> 100% Artesanal & Fresco
            </span>
          </div>

          <h1 className="hero-title">
            Gelato Artesanal <br />
            <span className="text-highlight">Hecho con Pasión</span>
          </h1>

          <p className="hero-description">
            En <strong>EAT GELATO</strong> preparamos diariamente cada batch utilizando leche entera de campo, 
            frutas frescas de estación y cacao de origen. Sin conservantes artificiales y servido con la dedicación de su propio dueño.
          </p>

          <div className="hero-actions">
            <a href="#armar-pote" className="btn-primary">
              <ShoppingBag size={20} /> Armar mi Pedido
            </a>
            <a href="#ofertas" className="btn-secondary">
              Ver Ofertas de Hoy <ArrowDown size={18} />
            </a>
          </div>

          <div className="hero-trust-bullets">
            <div className="trust-item">
              <ShieldCheck className="trust-icon" size={20} />
              <span>Insumos Seleccionados</span>
            </div>
            <div className="trust-item">
              <Heart className="trust-icon" size={20} />
              <span>Atención Personalizada</span>
            </div>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="hero-image-wrapper">
          <div className="hero-circle-bg"></div>
          <div className="hero-card-featured">
            <img 
              src="/logo.jpg" 
              alt="EAT GELATO Emblem" 
              className="hero-logo-emblem animate-float"
            />
            <div className="hero-image-badge">
              <span className="stars">⭐⭐⭐⭐⭐ 4.9/5</span>
              <span className="reviews-text">El sabor más auténtico del barrio</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 8.5rem 0 5rem;
          background: radial-gradient(circle at 80% 20%, rgba(245, 215, 161, 0.35) 0%, rgba(250, 246, 240, 1) 60%);
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
        }

        .hero-title {
          font-size: 3.4rem;
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 1.2rem;
          color: var(--color-chocolate);
        }

        .text-highlight {
          color: var(--color-terracotta);
          position: relative;
          display: inline-block;
        }

        .text-highlight::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 12px;
          background: rgba(245, 215, 161, 0.6);
          z-index: -1;
          border-radius: 4px;
        }

        .hero-description {
          font-size: 1.15rem;
          color: var(--color-chocolate-muted);
          margin-bottom: 2rem;
          max-width: 540px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .hero-trust-bullets {
          display: flex;
          gap: 1.8rem;
          border-top: 1px solid rgba(61, 39, 34, 0.1);
          padding-top: 1.5rem;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--color-chocolate);
        }

        .trust-icon {
          color: var(--color-blue);
        }

        .hero-image-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-circle-bg {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(72, 137, 168, 0.15) 0%, rgba(228, 122, 90, 0.2) 100%);
          z-index: 1;
        }

        .hero-card-featured {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-logo-emblem {
          width: 320px;
          height: 320px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 20px 50px rgba(61, 39, 34, 0.18);
          border: 8px solid #FFFFFF;
        }

        .hero-image-badge {
          margin-top: -25px;
          background: #FFFFFF;
          padding: 0.8rem 1.4rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          border: 1px solid rgba(61, 39, 34, 0.08);
        }

        .stars {
          font-weight: 800;
          color: var(--color-terracotta);
          font-size: 0.9rem;
        }

        .reviews-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-chocolate-muted);
        }

        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-badges, .hero-actions, .hero-trust-bullets {
            justify-content: center;
          }
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-description {
            margin: 0 auto 2rem;
          }
          .hero-circle-bg {
            width: 280px;
            height: 280px;
          }
          .hero-logo-emblem {
            width: 240px;
            height: 240px;
          }
        }
      `}</style>
    </section>
  );
}
