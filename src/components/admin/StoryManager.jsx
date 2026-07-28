import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, Upload, HeartHandshake, Check } from 'lucide-react';

export default function StoryManager() {
  const { story, updateStory } = useStore();
  const [formData, setFormData] = useState({ ...story });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStory(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="admin-module">
      <div className="module-header">
        <div>
          <h3>👨‍🍳 Historia del Dueño ("El Gelataio")</h3>
          <p>Personaliza el mensaje del dueño, tu foto de perfil y la visión artesanal</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="success-banner">
          <Check size={18} /> ¡Historia del dueño actualizada exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form-card">
        <div className="form-row">
          <div className="form-group flex-1">
            <label>Titular Principal</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Insignia Destacada</label>
            <input
              type="text"
              value={formData.badge}
              onChange={e => setFormData({ ...formData, badge: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mensaje y Historia del Dueño</label>
          <textarea
            rows="5"
            required
            value={formData.text}
            onChange={e => setFormData({ ...formData, text: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Foto de Perfil del Dueño / Gelataio</label>
          <div className="image-upload-box">
            {formData.image ? (
              <div className="image-preview-wrapper">
                <img src={formData.image} alt="Preview" className="image-preview" />
                <button type="button" className="btn-change-img" onClick={() => setFormData({ ...formData, image: '' })}>
                  Cambiar Foto
                </button>
              </div>
            ) : (
              <label className="upload-dropzone">
                <Upload size={28} className="upload-icon" />
                <span>Subir foto del dueño o proceso de elaboración</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
            )}
          </div>
        </div>

        <div className="form-actions-bar">
          <button type="submit" className="btn-primary">
            <Save size={18} /> Guardar Historia
          </button>
        </div>
      </form>

      <style jsx>{`
        .module-header h3 { font-size: 1.4rem; font-weight: 800; }
        .success-banner {
          background: rgba(37, 211, 102, 0.15); color: #1EBE5A;
          padding: 0.8rem 1.2rem; border-radius: var(--radius-md); font-weight: 700;
          display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.5rem;
        }

        .admin-form-card {
          background: #FFF; padding: 2rem; border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm); border: 1px solid rgba(61, 39, 34, 0.08);
          display: flex; flex-direction: column; gap: 1.2rem;
        }

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
        .image-preview { max-height: 180px; border-radius: var(--radius-md); object-fit: cover; }
        .btn-change-img { display: block; margin: 0.5rem auto 0; background: var(--bg-card-alt); border: none; padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-size: 0.78rem; font-weight: 700; cursor: pointer; }

        .form-actions-bar { display: flex; justify-content: flex-end; margin-top: 1rem; }
      `}</style>
    </div>
  );
}
