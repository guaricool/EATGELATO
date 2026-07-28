import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Save, MapPin, Phone, Mail, Clock, CreditCard, ShieldCheck, KeyRound, Check } from 'lucide-react';
import { PAYMENT_METHODS } from '../../data/flavors';

export default function StoreSettings() {
  const { storeInfo, updateStoreInfo, adminPin, setAdminPin } = useStore();
  const [formData, setFormData] = useState({ ...storeInfo });
  const [newPin, setNewPin] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value
      }
    });
  };

  const handleTogglePayment = (methodId) => {
    const current = formData.paymentMethods || [];
    if (current.includes(methodId)) {
      setFormData({ ...formData, paymentMethods: current.filter(m => m !== methodId) });
    } else {
      setFormData({ ...formData, paymentMethods: [...current, methodId] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update whatsapp number format without spaces
    const cleanWa = formData.phone ? formData.phone.replace(/[^0-9]/g, '') : '584121234567';
    updateStoreInfo({
      ...formData,
      whatsapp: cleanWa
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdatePin = (e) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      setAdminPin(newPin.trim());
      setPinSuccess(true);
      setNewPin('');
      setTimeout(() => setPinSuccess(false), 3000);
    }
  };

  return (
    <div className="admin-module">
      <div className="module-header">
        <div>
          <h3>🏪 Datos del Local y Contacto (Venezuela 🇻🇪)</h3>
          <p>Actualiza la dirección, número de WhatsApp, horarios y formas de pago</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="success-banner">
          <Check size={18} /> ¡Información del local guardada exitosamente! Se actualizó en la landing page.
        </div>
      )}

      <form onSubmit={handleSubmit} className="settings-form">
        {/* Contact info */}
        <div className="settings-section">
          <h4><Phone size={18} /> WhatsApp y Teléfono de Pedidos</h4>
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Número de WhatsApp (+58 Venezuela)</label>
              <input
                type="text"
                required
                placeholder="Ej. +58 412-1234567"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
              <small className="help-text">Los pedidos armados por los clientes llegarán directamente a este número.</small>
            </div>

            <div className="form-group flex-1">
              <label>Correo Electrónico de Recepción</label>
              <input
                type="email"
                required
                placeholder="pedidos@eatgelato.com.ve"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Location info */}
        <div className="settings-section">
          <h4><MapPin size={18} /> Ubicación Física</h4>
          <div className="form-group">
            <label>Dirección del Local</label>
            <input
              type="text"
              required
              placeholder="Ej. Av. Principal de Las Mercedes, Caracas - Venezuela 🇻🇪"
              value={formData.address}
              onChange={e => handleChange('address', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Punto de Referencia / Detalles</label>
            <input
              type="text"
              placeholder="Ej. Frente a la plaza principal. Estacionamiento exclusivo."
              value={formData.reference}
              onChange={e => handleChange('reference', e.target.value)}
            />
          </div>
        </div>

        {/* Opening Hours */}
        <div className="settings-section">
          <h4><Clock size={18} /> Horarios de Atención</h4>
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Lunes a Jueves</label>
              <input
                type="text"
                value={formData.hours?.weekdays || ''}
                onChange={e => handleNestedChange('hours', 'weekdays', e.target.value)}
              />
            </div>
            <div className="form-group flex-1">
              <label>Viernes y Sábados</label>
              <input
                type="text"
                value={formData.hours?.weekends || ''}
                onChange={e => handleNestedChange('hours', 'weekends', e.target.value)}
              />
            </div>
            <div className="form-group flex-1">
              <label>Domingos</label>
              <input
                type="text"
                value={formData.hours?.sunday || ''}
                onChange={e => handleNestedChange('hours', 'sunday', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="settings-section">
          <h4><CreditCard size={18} /> Métodos de Pago Activos</h4>
          <div className="payment-toggle-grid">
            {PAYMENT_METHODS.map(method => {
              const isActive = (formData.paymentMethods || []).includes(method.id);
              return (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-toggle-chip ${isActive ? 'active' : ''}`}
                  onClick={() => handleTogglePayment(method.id)}
                >
                  {isActive ? <Check size={16} /> : null} {method.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="form-actions-bar">
          <button type="submit" className="btn-primary">
            <Save size={18} /> Guardar Configuración
          </button>
        </div>
      </form>

      {/* Security PIN Change */}
      <div className="settings-section pin-change-box">
        <h4><KeyRound size={18} /> Cambiar PIN de Seguridad</h4>
        {pinSuccess && (
          <div className="success-banner">
            <Check size={16} /> ¡PIN de seguridad actualizado correctamente!
          </div>
        )}
        <form onSubmit={handleUpdatePin} className="pin-form">
          <div className="form-group">
            <label>Nuevo PIN (Mínimo 4 dígitos)</label>
            <input
              type="password"
              placeholder="Ingresa nuevo PIN"
              value={newPin}
              onChange={e => setNewPin(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-secondary" disabled={newPin.length < 4}>
            Actualizar PIN
          </button>
        </form>
      </div>

      <style jsx>{`
        .module-header h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 0.2rem; }
        .success-banner {
          background: rgba(37, 211, 102, 0.15);
          color: #1EBE5A;
          padding: 0.8rem 1.2rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .settings-form { display: flex; flex-direction: column; gap: 2rem; }

        .settings-section {
          background: #FFF;
          padding: 1.8rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(61, 39, 34, 0.08);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .settings-section h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-chocolate);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid rgba(61, 39, 34, 0.06);
        }

        .form-row { display: flex; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .form-group label { font-size: 0.8rem; font-weight: 700; color: var(--color-chocolate-muted); }
        .form-group input {
          padding: 0.65rem 0.9rem; border-radius: var(--radius-sm);
          border: 1px solid rgba(61, 39, 34, 0.15); font-family: var(--font-body); font-size: 0.9rem; outline: none;
        }

        .help-text { font-size: 0.75rem; color: var(--color-blue-dark); font-weight: 600; }
        .flex-1 { flex: 1; }

        .payment-toggle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.8rem;
        }

        .payment-toggle-chip {
          padding: 0.7rem 1rem;
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          border: 1px solid rgba(61, 39, 34, 0.12);
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--color-chocolate-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: var(--transition);
        }

        .payment-toggle-chip.active {
          background: var(--color-terracotta);
          color: #FFF;
          border-color: var(--color-terracotta);
        }

        .form-actions-bar {
          display: flex;
          justify-content: flex-end;
        }

        .pin-change-box {
          margin-top: 2rem;
        }

        .pin-form {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}
