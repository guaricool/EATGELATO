import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/flavors';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Image as ImageIcon, Upload, Star } from 'lucide-react';

export default function FlavorManager() {
  const { flavors, addFlavor, updateFlavor, deleteFlavor, toggleFlavorStock } = useStore();
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('cremas');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('5.0');
  const [badge, setBadge] = useState('');

  const openFormForAdd = () => {
    setEditingId(null);
    setName('');
    setCategory('cremas');
    setDescription('');
    setTags('Sin Gluten, Gourmet');
    setImage('');
    setRating('5.0');
    setBadge('');
    setIsFormOpen(true);
  };

  const openFormForEdit = (flavor) => {
    setEditingId(flavor.id);
    setName(flavor.name);
    setCategory(flavor.category);
    setDescription(flavor.description);
    setTags(flavor.tags ? flavor.tags.join(', ') : '');
    setImage(flavor.image || '');
    setRating(flavor.rating || '5.0');
    setBadge(flavor.badge || '');
    setIsFormOpen(true);
  };

  // Image Upload Handler (Convert file to Base64 data URI)
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
    if (!name.trim()) return;

    const tagsArray = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    const formData = {
      name,
      category,
      description,
      tags: tagsArray,
      image: image || 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80',
      rating: parseFloat(rating) || 5.0,
      badge: badge.trim() || undefined
    };

    if (editingId) {
      updateFlavor(editingId, formData);
    } else {
      addFlavor(formData);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="admin-module">
      <div className="module-header">
        <div>
          <h3>🍦 Gestión de Sabores y Catálogo</h3>
          <p>Agrega, edita o marca la disponibilidad de tus helados en tiempo real</p>
        </div>
        <button className="btn-primary" onClick={openFormForAdd}>
          <Plus size={18} /> Agregar Nuevo Sabor
        </button>
      </div>

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-title-row">
              <h4>{editingId ? 'Editar Sabor' : 'Agregar Nuevo Sabor'}</h4>
              <button className="btn-close" onClick={() => setIsFormOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Nombre del Sabor</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Parchita Cremosa con Chocolate"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Categoría</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}>
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Descripción del Sabor</label>
                <textarea
                  rows="3"
                  placeholder="Detalla los insumos, textura y perfil de sabor..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Etiquetas (separadas por coma)</label>
                  <input
                    type="text"
                    placeholder="Ej. Sin Lactosa, 100% Cacao, Gourmet"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Insignia Especial (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej. Top 1, Recomendado"
                    value={badge}
                    onChange={e => setBadge(e.target.value)}
                  />
                </div>
              </div>

              {/* Upload Real Photo */}
              <div className="form-group">
                <label>Foto Real del Helado</label>
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
                      <span>Subir foto desde tu teléfono o computadora</span>
                      <small>Soporta JPG, PNG, WEBP</small>
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
                  {editingId ? 'Guardar Cambios' : 'Agregar Sabor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Flavors Table */}
      <div className="flavors-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Sabor</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {flavors.map(flavor => (
              <tr key={flavor.id} className={!flavor.inStock ? 'out-of-stock-row' : ''}>
                <td>
                  <img src={flavor.image} alt={flavor.name} className="table-img" />
                </td>
                <td>
                  <div className="flavor-cell-info">
                    <strong>{flavor.name}</strong>
                    <small>{flavor.description}</small>
                    {flavor.tags && (
                      <div className="tags-micro">
                        {flavor.tags.map((t, idx) => <span key={idx}>{t}</span>)}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <span className="category-badge">
                    {CATEGORIES.find(c => c.id === flavor.category)?.label || flavor.category}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className={`stock-toggle-btn ${flavor.inStock ? 'in-stock' : 'out-stock'}`}
                    onClick={() => toggleFlavorStock(flavor.id)}
                  >
                    {flavor.inStock ? (
                      <>
                        <CheckCircle size={14} /> Disponible
                      </>
                    ) : (
                      <>
                        <XCircle size={14} /> Agotado
                      </>
                    )}
                  </button>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="btn-icon" onClick={() => openFormForEdit(flavor)} title="Editar">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon delete" onClick={() => deleteFlavor(flavor.id)} title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

        .flavors-table-card {
          background: #FFFFFF;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(61, 39, 34, 0.08);
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th, .admin-table td {
          padding: 1rem 1.2rem;
          border-bottom: 1px solid rgba(61, 39, 34, 0.06);
        }

        .admin-table th {
          background: var(--bg-primary);
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--color-chocolate-muted);
          text-transform: uppercase;
        }

        .table-img {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          object-fit: cover;
        }

        .flavor-cell-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .flavor-cell-info small {
          color: var(--color-chocolate-muted);
          font-size: 0.8rem;
          max-width: 320px;
        }

        .tags-micro {
          display: flex;
          gap: 0.3rem;
          margin-top: 0.2rem;
        }

        .tags-micro span {
          background: var(--bg-card-alt);
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        .category-badge {
          background: var(--bg-accent-light);
          color: var(--color-blue-dark);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-full);
        }

        .stock-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.8rem;
          border: none;
          cursor: pointer;
        }

        .stock-toggle-btn.in-stock {
          background: rgba(37, 211, 102, 0.12);
          color: #1EBE5A;
        }

        .stock-toggle-btn.out-stock {
          background: rgba(200, 62, 77, 0.12);
          color: var(--color-cherry);
        }

        .table-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-icon {
          background: var(--bg-primary);
          border: 1px solid rgba(61, 39, 34, 0.1);
          color: var(--color-chocolate);
          padding: 0.4rem;
          border-radius: 6px;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-icon:hover {
          background: var(--color-blue);
          color: #FFF;
        }

        .btn-icon.delete:hover {
          background: var(--color-cherry);
          color: #FFF;
        }

        .admin-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
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
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-chocolate-muted);
        }

        .form-group input, .form-group select, .form-group textarea {
          padding: 0.65rem 0.9rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(61, 39, 34, 0.15);
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
        }

        .flex-1 { flex: 1; }

        .upload-dropzone {
          border: 2px dashed rgba(61, 39, 34, 0.2);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          background: var(--bg-primary);
          transition: var(--transition);
        }

        .upload-dropzone:hover {
          border-color: var(--color-terracotta);
          background: rgba(228, 122, 90, 0.05);
        }

        .upload-icon { color: var(--color-terracotta); }

        .image-preview-wrapper {
          position: relative;
          text-align: center;
        }

        .image-preview {
          max-height: 160px;
          border-radius: var(--radius-md);
          object-fit: cover;

        }

        .btn-change-img {
          display: block;
          margin: 0.5rem auto 0;
          background: var(--bg-card-alt);
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
}
