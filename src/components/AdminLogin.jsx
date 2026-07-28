import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function AdminLogin() {
  const { loginAdmin } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(pin);
    if (!success) {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="admin-login-backdrop">
      <div className="admin-login-card">
        <div className="login-header">
          <img src="/logo.jpg" alt="EAT GELATO Logo" className="login-logo" />
          <h2>Acceso Administrador</h2>
          <p>Ingresa el PIN de seguridad para gestionar tu heladería</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>PIN de Seguridad</label>
            <div className="input-with-icon">
              <KeyRound size={18} className="input-icon" />
              <input
                type="password"
                maxLength="8"
                placeholder="Ingresa tu PIN"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                autoFocus
              />
            </div>
          </div>

          {error && (
            <div className="error-alert">
              <ShieldAlert size={16} /> PIN incorrecto. Intenta de nuevo (Default: 1234).
            </div>
          )}

          <button type="submit" className="btn-primary btn-block">
            Ingresar al Panel <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-footer">
          <span>🔒 PIN por defecto: <strong>1234</strong> (Puedes cambiarlo dentro del panel)</span>
          <a href="#" className="back-link">← Volver a la Landing Page</a>
        </div>
      </div>

      <style jsx>{`
        .admin-login-backdrop {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--color-chocolate) 0%, #1A100E 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .admin-login-card {
          background: #FFFFFF;
          width: 100%;
          max-width: 420px;
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-lg);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-logo {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--color-terracotta);
          margin-bottom: 1rem;
        }

        .login-header h2 {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-chocolate);
          margin-bottom: 0.3rem;
        }

        .login-header p {
          font-size: 0.88rem;
          color: var(--color-chocolate-muted);
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-chocolate-muted);
        }

        .input-with-icon input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.8rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(61, 39, 34, 0.15);
          font-size: 1.1rem;
          letter-spacing: 2px;
          outline: none;
        }

        .input-with-icon input:focus {
          border-color: var(--color-terracotta);
          box-shadow: 0 0 0 3px rgba(228, 122, 90, 0.15);
        }

        .error-alert {
          background: rgba(200, 62, 77, 0.1);
          color: var(--color-cherry);
          padding: 0.6rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .btn-block {
          width: 100%;
          padding: 0.9rem;
          font-size: 1rem;
        }

        .login-footer {
          margin-top: 2rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(61, 39, 34, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.8rem;
          color: var(--color-chocolate-muted);
        }

        .back-link {
          color: var(--color-blue-dark);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
