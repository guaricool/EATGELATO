import React from 'react';
import { HeartHandshake, CheckCircle2, RefreshCw, Flame } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function OurStory() {
  const { story } = useStore();

  return (
    <section id="historia" className="story-section">
      <div className="container story-container">
        <div className="story-image-box">
          <img 
            src={story.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"} 
            alt="El Gelataio - Dueño de EAT GELATO" 
            className="story-main-img"
          />
          <div className="story-floating-card">
            <HeartHandshake className="story-card-icon" size={32} />
            <div>
              <h4>{story.badge || "Atención del Dueño"}</h4>
              <p>Cada cliente es recibido con una sonrisa y una recomendación experta.</p>
            </div>
          </div>
        </div>

        <div className="story-content">
          <span className="badge badge-terracotta">{story.subtitle || "Nuestra Esencia"}</span>
          <h2 className="story-title">
            {story.title || "Pasión Artesanal y Atención Familiar"}
          </h2>

          <p className="story-text">
            {story.text}
          </p>

          <div className="story-features">
            <div className="feature-card">
              <CheckCircle2 className="feature-icon" size={22} />
              <div>
                <h5>100% Leche Entera y Fruta Real</h5>
                <p>Sin esencias sintéticas ni aceites hidrogenados.</p>
              </div>
            </div>

            <div className="feature-card">
              <RefreshCw className="feature-icon" size={22} />
              <div>
                <h5>Elaboración Diaria en Batch Chicos</h5>
                <p>Garantizamos frescura total y cremosidad inigualable.</p>
              </div>
            </div>

            <div className="feature-card">
              <Flame className="feature-icon" size={22} />
              <div>
                <h5>Recetas Tradicionales Italianas</h5>
                <p>Inspiradas en los verdaderos gelatos artesanales europeos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .story-section {
          padding: 6rem 0;
          background: radial-gradient(circle at 10% 90%, rgba(72, 137, 168, 0.08) 0%, rgba(250, 246, 240, 1) 70%);
        }

        .story-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .story-image-box {
          position: relative;
        }

        .story-main-img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          border: 6px solid #FFFFFF;
        }

        .story-floating-card {
          position: absolute;
          bottom: -25px;
          right: -20px;
          background: #FFFFFF;
          padding: 1.2rem 1.5rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 320px;
          border: 1px solid rgba(61, 39, 34, 0.08);
        }

        .story-card-icon {
          color: var(--color-terracotta);
          flex-shrink: 0;
        }

        .story-floating-card h4 {
          font-size: 1rem;
          font-weight: 800;
          color: var(--color-chocolate);
        }

        .story-floating-card p {
          font-size: 0.8rem;
          color: var(--color-chocolate-muted);
          line-height: 1.3;
        }

        .story-title {
          font-size: 2.8rem;
          font-weight: 900;
          margin: 1rem 0 1.2rem;
          color: var(--color-chocolate);
        }

        .story-text {
          font-size: 1.05rem;
          color: var(--color-chocolate-muted);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .story-features {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .feature-card {
          display: flex;
          gap: 1rem;
          background: #FFFFFF;
          padding: 1rem 1.2rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(61, 39, 34, 0.06);
          box-shadow: var(--shadow-sm);
        }

        .feature-icon {
          color: var(--color-blue);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .feature-card h5 {
          font-size: 0.98rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .feature-card p {
          font-size: 0.84rem;
          color: var(--color-chocolate-muted);
        }

        @media (max-width: 900px) {
          .story-container {
            grid-template-columns: 1fr;
          }
          .story-floating-card {
            position: relative;
            bottom: 0;
            right: 0;
            margin-top: -30px;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
