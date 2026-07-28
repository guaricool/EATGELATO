import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Clock, User, Phone, MapPin, CreditCard } from 'lucide-react';

export default function OrderHistory() {
  const { orders } = useStore();

  return (
    <div className="admin-module">
      <div className="module-header">
        <div>
          <h3>🛒 Registro de Pedidos Realizados</h3>
          <p>Historial de solicitudes armadas por los clientes desde la landing page</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders-card">
          <ShoppingBag size={48} className="empty-icon" />
          <h4>Aún no hay pedidos registrados</h4>
          <p>Los pedidos armados por los clientes aparecerán aquí automáticamente.</p>
        </div>
      ) : (
        <div className="orders-list-grid">
          {orders.map(ord => (
            <div key={ord.id} className="order-card-admin">
              <div className="order-card-header">
                <div>
                  <span className="order-date"><Clock size={14} /> {ord.date}</span>
                  <h4>{ord.customerName || 'Cliente sin nombre'}</h4>
                </div>
                <span className="order-total">${ord.total.toFixed(2)} USD</span>
              </div>

              <div className="order-card-details">
                <p><strong><Phone size={14} /> Teléfono:</strong> {ord.customerPhone || 'N/A'}</p>
                <p><strong><MapPin size={14} /> Entrega:</strong> {ord.deliveryMethod === 'delivery' ? `Delivery (${ord.address})` : 'Retiro en Local'}</p>
                <p><strong><CreditCard size={14} /> Pago:</strong> {ord.paymentMethod}</p>
              </div>

              <div className="order-items-box">
                <h5>Ítems del Pedido:</h5>
                <ul>
                  {ord.items.map((item, idx) => (
                    <li key={idx}>
                      {item.size ? (
                        <>
                          <strong>{item.size.name}</strong> - Sabores: {item.flavors.join(', ')}
                        </>
                      ) : (
                        <strong>{item.title}</strong>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .module-header h3 { font-size: 1.4rem; font-weight: 800; }
        .empty-orders-card {
          background: #FFF; padding: 4rem 2rem; border-radius: var(--radius-md);
          text-align: center; color: var(--color-chocolate-muted);
          border: 1px solid rgba(61, 39, 34, 0.08);
        }
        .empty-icon { color: var(--color-blue); margin-bottom: 1rem; opacity: 0.5; }

        .orders-list-grid { display: flex; flex-direction: column; gap: 1rem; }

        .order-card-admin {
          background: #FFF; border-radius: var(--radius-md); padding: 1.5rem;
          box-shadow: var(--shadow-sm); border: 1px solid rgba(61, 39, 34, 0.08);
          display: flex; flex-direction: column; gap: 1rem;
        }

        .order-card-header {
          display: flex; align-items: center; justify-content: space-between;
          padding-bottom: 0.8rem; border-bottom: 1px solid rgba(61, 39, 34, 0.06);
        }

        .order-date { font-size: 0.78rem; color: var(--color-chocolate-muted); display: flex; align-items: center; gap: 0.3rem; }
        .order-total { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 900; color: var(--color-terracotta-dark); }

        .order-card-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem; font-size: 0.88rem; }

        .order-items-box {
          background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm);
        }

        .order-items-box h5 { font-size: 0.82rem; margin-bottom: 0.4rem; text-transform: uppercase; color: var(--color-chocolate-muted); }
        .order-items-box ul { padding-left: 1.2rem; font-size: 0.88rem; }
      `}</style>
    </div>
  );
}
