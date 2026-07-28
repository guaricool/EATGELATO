import React from 'react';
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, Star, Award, CreditCard } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PAYMENT_METHODS } from '../data/flavors';

export default function LocationHours() {
  const { storeInfo } = useStore();

  const activePayments = (storeInfo.paymentMethods || [])
    .map(id => PAYMENT_METHODS.find(p => p.id === id)?.label)
    .filter(Boolean)
    .join(' • ');

  return (
    <section id="contacto" className="location-section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-blue">Visitanos o Pedí a Domicilio</span>
          <h2 className="section-title">Ubicación y Horarios de Atención</h2>
          <p className="section-subtitle">
            Te esperamos en nuestro local con la cálida bienvenida de su propio dueño.
          </p>
        </div>

        <div className="location-grid">
          {/* Information Card */}
          <div className="info-card">
            <div className="info-item">
              <MapPin className="info-icon" size={24} />
              <div>
                <h4>Dirección del Local</h4>
                <p>{storeInfo.address}</p>
                {storeInfo.reference && <span className="info-sub">{storeInfo.reference}</span>}
              </div>
            </div>

            <div className="info-item">
              <Clock className="info-icon" size={24} />
              <div>
                <h4>Horarios de Atención</h4>
                <p><strong>Lunes a Jueves:</strong> {storeInfo.hours?.weekdays || '12:00 PM - 10:00 PM'}</p>
                <p><strong>Viernes y Sábados:</strong> {storeInfo.hours?.weekends || '12:00 PM - 11:30 PM'}</p>
                <p><strong>Domingos:</strong> {storeInfo.hours?.sunday || '12:00 PM - 10:30 PM'}</p>
              </div>
            </div>

            <div className="info-item">
              <Phone className="info-icon" size={24} />
              <div>
                <h4>Teléfono & WhatsApp Directo</h4>
                <p>{storeInfo.phone}</p>
              </div>
            </div>

            {activePayments && (
              <div className="info-item">
                <CreditCard className="info-icon" size={24} />
                <div>
                  <h4>Métodos de Pago Aceptados</h4>
                  <p>{activePayments}</p>
                </div>
              </div>
            )}

            <div className="social-links">
              {storeInfo.social?.instagram && (
                <a href={storeInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              )}
              {storeInfo.social?.facebook && (
                <a href={storeInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Map Preview Card & Reviews */}
          <div className="map-card">
            <div className="map-placeholder">
              <div className="map-overlay">
                <Award size={40} className="map-award-icon" />
                <h3>{storeInfo.name} GOURMET</h3>
                <p>{storeInfo.address}</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary btn-sm mt-3"
                >
                  Abrir en Google Maps
                </a>
              </div>
            </div>

            {/* Testimonials */}
            <div className="testimonials-box">
              <div className="testimonial-single">
                <div className="stars-row">
                  <Star size={16} fill="#E47A5A" color="#E47A5A" />
                  <Star size={16} fill="#E47A5A" color="#E47A5A" />
                  <Star size={16} fill="#E47A5A" color="#E47A5A" />
                  <Star size={16} fill="#E47A5A" color="#E47A5A" />
                  <Star size={16} fill="#E47A5A" color="#E47A5A" />
                </div>
                <p className="testimonial-quote">
                  "El mejor gelato de la ciudad. El sabor a Cacao de Chuao y Arequipe Real son increíbles. Además el dueño siempre te atiende con la mejor disposición."
                </p>
                <span className="testimonial-author">- Valentina M., Cliente Satisfecho</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .location-section {
          padding: 6rem 0;
          background: #FFFFFF;
        }

        .location-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .info-card {
          background: var(--bg-primary);
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(61, 39, 34, 0.08);
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .info-item {
          display: flex;
          gap: 1.2rem;
        }

        .info-icon {
          color: var(--color-terracotta);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .info-item h4 {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 0.3rem;
        }

        .info-item p {
          font-size: 0.92rem;
          color: var(--color-chocolate-muted);
        }

        .info-sub {
          font-size: 0.8rem;
          color: var(--color-blue-dark);
          font-weight: 600;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(61, 39, 34, 0.08);
        }

        .social-links a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          color: var(--color-chocolate);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .social-links a:hover {
          background: var(--color-terracotta);
          color: #FFF;
          transform: translateY(-2px);
        }

        .map-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .map-placeholder {
          height: 280px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, var(--color-chocolate) 0%, #1F1411 100%);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-overlay {
          text-align: center;
          color: #FFF;
          padding: 2rem;
        }

        .map-award-icon {
          color: var(--color-vanilla);
          margin-bottom: 0.5rem;
        }

        .map-overlay h3 {
          font-size: 1.4rem;
          color: #FFF;
          margin-bottom: 0.2rem;
        }

        .map-overlay p {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }

        .mt-3 {
          margin-top: 1rem;
        }

        .testimonials-box {
          background: var(--bg-card-alt);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(61, 39, 34, 0.06);
        }

        .stars-row {
          display: flex;
          gap: 0.3rem;
          margin-bottom: 0.6rem;
        }

        .testimonial-quote {
          font-style: italic;
          font-size: 0.92rem;
          color: var(--color-chocolate);
          margin-bottom: 0.6rem;
        }

        .testimonial-author {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-terracotta-dark);
        }

        @media (max-width: 900px) {
          .location-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
