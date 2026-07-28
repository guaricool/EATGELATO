import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Edit2, Trash2, Tag, Upload, Clock } from 'lucide-react';

export default function OfferManager() {
  const { offers, addOffer, updateOffer, deleteOffer } = useStore();
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState('');

  const openFormForAdd = () => {
    setEditingId(null);
    setTitle('');
    setBadge('PROMO DEL DÍA');
    setDescription('');
    setPrice('$8.00');
    setOriginalPrice('$16.00');
    setTag('Solo por hoy');
    setImage('');
    setIsFormOpen(true);
  };

  const openFormForEdit = (offer) => {
    setEditingId(offer.id);
    setTitle(offer.title);
    setBadge(offer.badge);
    setDescription(offer.description);
    setPrice(offer.price);
    setOriginalPrice(offer.originalPrice);
    setTag(offer.tag);
    setImage(offer.image || '');
    setIsFormOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formData = {
      title,
      badge,
      description,
      price,
      originalPrice,
      tag,
      image: image || 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'
    };

    if (editingId) {
      updateOffer(editingId, formData);
    } else {
      addOffer(formData);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="admin-module">
      <div className="module-header">
        <div>
          <h3>🏷️ Gestión de Ofertas del Día</h3>
          <p>Crea y publica promociones especiales con precios en $ USD y tasa BCV</p>
        </div>
        <button className="btn-primary" onClick={openFormForAdd}>
          <Plus size={18} /> Crear Nueva Oferta
        </button>
      </div>

      {isFormOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title-row">
              <h4>{editingId ? 'Editar Oferta' : 'Crear Nueva Oferta'}</h4>
              <button className="btn-close" onClick={() => setIsFormOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Título de la Oferta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Martes 2x1 en Potes de 1/2 Kg"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Insignia Destacada</label>
                  <input
                    type="text"
                    placeholder="Ej. ¡PROMO ESPECIAL!"
                    value={badge}
                    onChange={e => setBadge(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Descripción de la Oferta</label>
                <textarea
                  rows="3"
                  placeholder="Detalla qué incluye la oferta..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Precio Promocional</label>
                  <input
                    type="text"
                    placeholder="Ej. $8.00"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Precio Anterior (Tachado)</label>
                  <input
                    type="text"
                    placeholder="Ej. $16.00"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(e.target.value)}
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Etiqueta de Tiempo / Disponibilidad</label>
                  <input
                    type="text"
                    placeholder="Ej. Solo por Hoy, Stock Limitado"
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="form-group">
                <label>Foto de la Promoción</label>
                <div className="image-upload-box">
                  {image ? (
                    <div className="image-preview-wrapper">
                      <img src={image} alt="Preview" className="image-preview" />
                      <button type="button" className="btn-change-img" onClick={() => setImage('')}>
                        Cambiar Foto
                      </button>
                    </div>
                  ) : (
                    <label className="upload-dropzone">
                      <Upload size={28} className="upload-icon" />
                      <span>Subir foto promocional</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Guardar Cambios' : 'Publicar Oferta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offers Grid */}
      <div className="admin-offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className="admin-offer-card">
            <img src={offer.image} alt={offer.title} className="offer-preview-img" />
            <div className="admin-offer-info">
              <span className="badge-tag">{offer.badge}</span>
              <h4>{offer.title}</h4>
              <p>{offer.description}</p>
              <div className="offer-price-line">
                <strong className="price">{offer.price}</strong>
                <span className="old-price">{offer.originalPrice}</span>
              </div>
              <div className="offer-card-actions">
                <button className="btn-icon" onClick={() => openFormForEdit(offer)}>
                  <Edit2 size={16} /> Editar
                </button>
                <button className="btn-icon delete" onClick={() => deleteOffer(offer.id)}>
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .module-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .module-header h3 {
          font-size: 1.4rem;
          font-weight: 800;
        }

        .admin-offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .admin-offer-card {
          background: #FFF;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(61, 39, 34, 0.08);
          display: flex;
          flex-direction: column;
        }

        .offer-preview-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .admin-offer-info {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-grow: 1;
        }

        .badge-tag {
          background: var(--color-terracotta);
          color: #FFF;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          align-self: flex-start;
        }

        .admin-offer-info h4 {
          font-size: 1.1rem;
          font-weight: 800;
        }

        .admin-offer-info p {
          font-size: 0.85rem;
          color: var(--color-chocolate-muted);
        }

        .offer-price-line {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .price {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          color: var(--color-terracotta-dark);
        }

        .old-price {
          font-size: 0.85rem;
          color: #999;
          text-decoration: line-through;
        }

        .offer-card-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 0.8rem;
          border-top: 1px solid rgba(61, 39, 34, 0.06);
        }

        .admin-modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .admin-modal-card {
          background: #FFF;
          width: 100%;
          max-width: 580px;
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-lg);
        }

        .modal-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .btn-close {
          background: none; border: none; font-size: 1.2rem; cursor: pointer;
        }

        .admin-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: flex; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-size: 0.8rem; font-weight: 700; color: var(--color-chocolate-muted); }
        .form-group input, .form-group textarea {
          padding: 0.65rem 0.9rem; border-radius: var(--radius-sm);
          border: 1px solid rgba(61, 39, 34, 0.15); font-family: var(--font-body); font-size: 0.9rem; outline: none;
        }
        .flex-1 { flex: 1; }

        .upload-dropzone {
          border: 2px dashed rgba(61, 39, 34, 0.2); border-radius: var(--radius-md);
          padding: 1.5rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; cursor: pointer; background: var(--bg-primary);
        }
        .upload-icon { color: var(--color-terracotta); }
        .image-preview-wrapper { text-align: center; }
        .image-preview { max-height: 160px; border-radius: var(--radius-md); object-fit: cover; }
        .btn-change-img { display: block; margin: 0.5rem auto 0; background: var(--bg-card-alt); border: none; padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.78rem; font-weight: 700; cursor: pointer; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem; }
      `}</style>
    </div>
  );
}
