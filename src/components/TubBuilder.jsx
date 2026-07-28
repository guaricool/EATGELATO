import React, { useState } from 'react';
import { TUB_SIZES, FLAVORS, TOPPINGS } from '../data/flavors';
import { Sparkles, Check, ShoppingBag, RotateCcw } from 'lucide-react';

export default function TubBuilder({ onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(TUB_SIZES[2]); // Default 1/2 Kg
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    // If selected flavors exceed new max, trim
    if (selectedFlavors.length > size.maxFlavors) {
      setSelectedFlavors(selectedFlavors.slice(0, size.maxFlavors));
    }
  };

  const handleToggleFlavor = (flavorName) => {
    if (selectedFlavors.includes(flavorName)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavorName));
    } else {
      if (selectedFlavors.length < selectedSize.maxFlavors) {
        setSelectedFlavors([...selectedFlavors, flavorName]);
      }
    }
  };

  const handleToggleTopping = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const totalToppingsPrice = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const totalPrice = selectedSize.price + totalToppingsPrice;

  const handleAdd = () => {
    if (selectedFlavors.length === 0) return;
    onAddToCart({
      id: Date.now().toString(),
      size: selectedSize,
      flavors: selectedFlavors,
      toppings: selectedToppings,
      totalPrice: totalPrice
    });
    // Reset form
    setSelectedFlavors([]);
    setSelectedToppings([]);
  };

  return (
    <section id="armar-pote" className="builder-section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-terracotta">
            <Sparkles size={16} /> Experiencia Personalizada
          </span>
          <h2 className="section-title">Armá tu Pote a Medida</h2>
          <p className="section-subtitle">
            Elegí la presentación, combiná tus sabores favoritos y agregale los mejores toppings.
          </p>
        </div>

        <div className="builder-box">
          {/* STEP 1: Presentation */}
          <div className="builder-step">
            <div className="step-title">
              <span className="step-num">1</span>
              <div>
                <h3>Elegí la Presentación</h3>
                <span className="step-sub">Seleccioná el tamaño ideal para tu momento</span>
              </div>
            </div>

            <div className="sizes-grid">
              {TUB_SIZES.map((size) => (
                <div
                  key={size.id}
                  className={`size-card ${selectedSize.id === size.id ? 'active' : ''}`}
                  onClick={() => handleSelectSize(size)}
                >
                  {size.popular && <span className="popular-badge">MÁS PEDIDO</span>}
                  <h4 className="size-name">{size.name}</h4>
                  <span className="size-capacity">{size.capacity}</span>
                  <p className="size-desc">{size.description}</p>
                  <span className="size-price">{size.priceLabel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2: Flavors */}
          <div className="builder-step">
            <div className="step-title">
              <span className="step-num">2</span>
              <div>
                <h3>Elegí los Sabores</h3>
                <span className="step-sub">
                  Tenés seleccionados ({selectedFlavors.length} de {selectedSize.maxFlavors})
                </span>
              </div>
            </div>

            <div className="flavors-selector-grid">
              {FLAVORS.map((f) => {
                const isSelected = selectedFlavors.includes(f.name);
                const isLimitReached = !isSelected && selectedFlavors.length >= selectedSize.maxFlavors;
                return (
                  <button
                    key={f.id}
                    className={`flavor-select-btn ${isSelected ? 'selected' : ''} ${isLimitReached ? 'disabled' : ''}`}
                    onClick={() => handleToggleFlavor(f.name)}
                    disabled={isLimitReached}
                  >
                    <span className="flavor-select-name">{f.name}</span>
                    {isSelected ? <Check size={18} /> : <span className="plus-icon">+</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Toppings */}
          <div className="builder-step">
            <div className="step-title">
              <span className="step-num">3</span>
              <div>
                <h3>Toppings Opcionales</h3>
                <span className="step-sub">Sumale ese toque extra crujiente o dulce</span>
              </div>
            </div>

            <div className="toppings-grid">
              {TOPPINGS.map((top) => {
                const isSelected = selectedToppings.some((t) => t.id === top.id);
                return (
                  <button
                    key={top.id}
                    className={`topping-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleTopping(top)}
                  >
                    <div>
                      <span className="top-name">{top.name}</span>
                      <span className="top-price">+${top.price}</span>
                    </div>
                    {isSelected && <Check size={18} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Summary & Add */}
          <div className="builder-summary-bar">
            <div className="summary-info">
              <span className="summary-label">Resumen de tu Armado:</span>
              <span className="summary-detail">
                <strong>{selectedSize.name}</strong> • {selectedFlavors.length > 0 ? selectedFlavors.join(', ') : 'Seleccioná sabores'}
              </span>
            </div>

            <div className="summary-action">
              <div className="summary-price">${totalPrice.toLocaleString()}</div>
              <button
                className="btn-primary"
                disabled={selectedFlavors.length === 0}
                onClick={handleAdd}
              >
                <ShoppingBag size={18} /> Agregar Pote
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .builder-section {
          padding: 5rem 0;
          background: #FFFFFF;
        }

        .builder-box {
          background: var(--bg-primary);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(61, 39, 34, 0.08);
        }

        .builder-step {
          margin-bottom: 2.5rem;
        }

        .step-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .step-num {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--color-terracotta);
          color: #FFF;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-title h3 {
          font-size: 1.3rem;
          font-weight: 800;
        }

        .step-sub {
          font-size: 0.88rem;
          color: var(--color-chocolate-muted);
        }

        .sizes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.2rem;
        }

        .size-card {
          position: relative;
          background: #FFFFFF;
          border: 2px solid rgba(61, 39, 34, 0.08);
          border-radius: var(--radius-md);
          padding: 1.5rem 1.2rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .size-card:hover {
          border-color: var(--color-blue);
          transform: translateY(-3px);
        }

        .size-card.active {
          border-color: var(--color-terracotta);
          background: rgba(228, 122, 90, 0.04);
          box-shadow: var(--shadow-sm);
        }

        .popular-badge {
          position: absolute;
          top: -10px;
          right: 12px;
          background: var(--color-cherry);
          color: #FFF;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .size-name {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }

        .size-capacity {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-blue);
          display: block;
          margin-bottom: 0.5rem;
        }

        .size-desc {
          font-size: 0.82rem;
          color: var(--color-chocolate-muted);
          margin-bottom: 1rem;
        }

        .size-price {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 900;
          color: var(--color-terracotta-dark);
        }

        .flavors-selector-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.8rem;
        }

        .flavor-select-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-md);
          background: #FFFFFF;
          border: 1px solid rgba(61, 39, 34, 0.1);
          color: var(--color-chocolate);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .flavor-select-btn:hover:not(.disabled) {
          border-color: var(--color-blue);
          color: var(--color-blue);
        }

        .flavor-select-btn.selected {
          background: var(--color-blue);
          color: #FFFFFF;
          border-color: var(--color-blue);
        }

        .flavor-select-btn.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .toppings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 0.8rem;
        }

        .topping-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-md);
          background: #FFFFFF;
          border: 1px solid rgba(61, 39, 34, 0.1);
          text-align: left;
          cursor: pointer;
          transition: var(--transition);
        }

        .topping-btn:hover {
          border-color: var(--color-terracotta);
        }

        .topping-btn.selected {
          border-color: var(--color-terracotta);
          background: rgba(228, 122, 90, 0.08);
          color: var(--color-terracotta-dark);
        }

        .top-name {
          font-weight: 600;
          font-size: 0.88rem;
          display: block;
        }

        .top-price {
          font-size: 0.78rem;
          color: var(--color-chocolate-muted);
        }

        .builder-summary-bar {
          background: var(--color-chocolate);
          color: #FFFFFF;
          padding: 1.5rem 2rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .summary-label {
          font-size: 0.85rem;
          color: var(--color-vanilla);
          display: block;
        }

        .summary-detail {
          font-size: 1rem;
        }

        .summary-action {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .summary-price {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--color-vanilla);
        }
      `}</style>
    </section>
  );
}
