import React, { useState } from 'react';
import { CATEGORIES } from '../data/flavors';
import { useStore } from '../context/StoreContext';
import { Search, Star, Plus, Check } from 'lucide-react';

export default function Menu({ onSelectFlavor, selectedFlavors = [] }) {
  const { flavors } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFlavors = flavors.filter((flavor) => {
    const matchesCategory = activeCategory === 'all' || flavor.category === activeCategory;
    const matchesSearch = flavor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          flavor.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="sabores" className="menu-section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-blue">Receta Gourmet</span>
          <h2 className="section-title">Nuestros Sabores Artesanales</h2>
          <p className="section-subtitle">
            Elaborados cada mañana por nuestro maestro helatero con insumos de origen seleccionado.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="filter-controls">
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar sabor (ej. Pistacho, Cacao, Arequipe...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Flavors Grid */}
        <div className="flavors-grid">
          {filteredFlavors.map((flavor) => {
            const isSelected = selectedFlavors.includes(flavor.name);
            const isOutOfStock = flavor.inStock === false;

            return (
              <div key={flavor.id} className={`flavor-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
                <div className="flavor-image-box">
                  <img src={flavor.image} alt={flavor.name} />
                  {flavor.badge && <span className="flavor-badge-tag">{flavor.badge}</span>}
                  {isOutOfStock && <span className="flavor-out-badge">AGOTADO HOY</span>}
                  <div className="flavor-rating">
                    <Star size={14} fill="#E47A5A" color="#E47A5A" />
                    <span>{flavor.rating || 5.0}</span>
                  </div>
                </div>

                <div className="flavor-details">
                  <h3 className="flavor-name">{flavor.name}</h3>
                  <p className="flavor-desc">{flavor.description}</p>

                  {flavor.tags && (
                    <div className="flavor-tags">
                      {flavor.tags.map((tag, idx) => (
                        <span key={idx} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  )}

                  <button
                    className={`btn-add-flavor ${isSelected ? 'selected' : ''} ${isOutOfStock ? 'disabled' : ''}`}
                    disabled={isOutOfStock}
                    onClick={() => !isOutOfStock && onSelectFlavor(flavor.name)}
                  >
                    {isOutOfStock ? (
                      'Agotado por Hoy'
                    ) : isSelected ? (
                      <>
                        <Check size={16} /> Seleccionado
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Agregar a mi Pote
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .menu-section {
          padding: 5rem 0;
          background: var(--bg-primary);
        }

        .filter-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.6rem;
        }

        .tab-btn {
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-full);
          background: #FFFFFF;
          border: 1px solid rgba(61, 39, 34, 0.1);
          color: var(--color-chocolate);
          font-weight: 600;
          font-size: 0.92rem;
          transition: var(--transition);
        }

        .tab-btn:hover {
          border-color: var(--color-blue);
          color: var(--color-blue);
        }

        .tab-btn.active {
          background: var(--color-blue);
          color: #FFFFFF;
          border-color: var(--color-blue);
          box-shadow: 0 4px 14px rgba(72, 137, 168, 0.3);
        }

        .search-box {
          position: relative;
          width: 100%;
          max-width: 420px;
        }

        .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-chocolate-muted);
        }

        .search-box input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 3rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(61, 39, 34, 0.12);
          background: #FFFFFF;
          font-family: var(--font-body);
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition);
        }

        .search-box input:focus {
          border-color: var(--color-terracotta);
          box-shadow: 0 0 0 3px rgba(228, 122, 90, 0.15);
        }

        .flavors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.8rem;
        }

        .flavor-card {
          background: #FFFFFF;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(61, 39, 34, 0.07);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }

        .flavor-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .flavor-card.out-of-stock {
          opacity: 0.7;
        }

        .flavor-image-box {
          position: relative;
          height: 180px;
        }

        .flavor-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .flavor-badge-tag {
          position: absolute;
          top: 0.8rem;
          left: 0.8rem;
          background: var(--color-cherry);
          color: #FFF;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-full);
        }

        .flavor-out-badge {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          background: rgba(61, 39, 34, 0.85);
          color: #FFF;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-full);
        }

        .flavor-rating {
          position: absolute;
          bottom: 0.8rem;
          right: 0.8rem;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-chocolate);
        }

        .flavor-details {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .flavor-name {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 0.4rem;
        }

        .flavor-desc {
          font-size: 0.88rem;
          color: var(--color-chocolate-muted);
          margin-bottom: 1rem;
          flex-grow: 1;
          line-height: 1.4;
        }

        .flavor-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.2rem;
        }

        .tag-pill {
          background: var(--bg-card-alt);
          color: var(--color-chocolate-muted);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
        }

        .btn-add-flavor {
          width: 100%;
          padding: 0.65rem;
          border-radius: var(--radius-md);
          background: var(--bg-accent-light);
          color: var(--color-blue-dark);
          font-weight: 700;
          font-size: 0.88rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: var(--transition);
        }

        .btn-add-flavor:hover:not(.disabled) {
          background: var(--color-blue);
          color: #FFFFFF;
        }

        .btn-add-flavor.selected {
          background: var(--color-terracotta);
          color: #FFFFFF;
        }

        .btn-add-flavor.disabled {
          background: rgba(0,0,0,0.08);
          color: #999;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
