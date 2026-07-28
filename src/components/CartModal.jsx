import React, { useState } from 'react';
import { X, MessageCircle, Mail, Trash2, ShoppingBag, Truck, Store, CreditCard, DollarSign } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/flavors';

export default function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pago-movil');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const totalCart = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Format message for WhatsApp
  const generateWhatsAppMessage = () => {
    let msg = `*¡Hola EAT GELATO! Quisiera realizar el siguiente pedido:* 🍦\n\n`;
    
    cartItems.forEach((item, index) => {
      if (item.size) {
        msg += `*${index + 1}. ${item.size.name}* ($${item.totalPrice.toFixed(2)})\n`;
        msg += `  • Sabores: ${item.flavors.join(', ')}\n`;
        if (item.toppings && item.toppings.length > 0) {
          msg += `  • Toppings: ${item.toppings.map(t => t.name).join(', ')}\n`;
        }
      } else {
        msg += `*${index + 1}. ${item.title}* ($${item.totalPrice.toFixed(2)})\n`;
      }
      msg += `\n`;
    });

    msg += `-------------------------------\n`;
    msg += `*Total a Pagar:* $${totalCart.toFixed(2)} USD (o al cambio BCV)\n\n`;
    msg += `*Datos del Cliente:*\n`;
    msg += `• Nombre: ${customerName || 'No especificado'}\n`;
    msg += `• Teléfono: ${customerPhone || 'No especificado'}\n`;
    msg += `• Método de Entrega: ${deliveryMethod === 'delivery' ? 'Delivery a Domicilio' : 'Retiro en Local'}\n`;
    if (deliveryMethod === 'delivery') {
      msg += `• Dirección: ${address || 'No especificada'}\n`;
    }
    const payLabel = PAYMENT_METHODS.find(p => p.id === paymentMethod)?.label || paymentMethod;
    msg += `• Forma de Pago: ${payLabel}\n`;
    if (notes) {
      msg += `• Notas: ${notes}\n`;
    }

    return encodeURIComponent(msg);
  };

  const handleSendWhatsApp = () => {
    // Venezuelan phone format +58 412 1234567
    const waUrl = `https://wa.me/584121234567?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Nuevo Pedido EAT GELATO - ${customerName || 'Cliente'}`);
    let body = `Hola EAT GELATO,\n\nQuisiera realizar el siguiente pedido:\n\n`;
    
    cartItems.forEach((item, index) => {
      if (item.size) {
        body += `${index + 1}. ${item.size.name} ($${item.totalPrice.toFixed(2)})\n`;
        body += `   Sabores: ${item.flavors.join(', ')}\n`;
        if (item.toppings && item.toppings.length > 0) {
          body += `   Toppings: ${item.toppings.map(t => t.name).join(', ')}\n`;
        }
      } else {
        body += `${index + 1}. ${item.title} ($${item.totalPrice.toFixed(2)})\n`;
      }
    });

    const payLabel = PAYMENT_METHODS.find(p => p.id === paymentMethod)?.label || paymentMethod;
    body += `\nTotal: $${totalCart.toFixed(2)} USD (Tasa BCV)\n\n`;
    body += `Datos:\nNombre: ${customerName}\nTeléfono: ${customerPhone}\nEntrega: ${deliveryMethod}\nDirección: ${address}\nForma de Pago: ${payLabel}\nNotas: ${notes}`;

    const mailtoUrl = `mailto:pedidos@eatgelato.com.ve?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} className="header-icon" />
            <h3>Tu Pedido en EAT GELATO</h3>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} className="empty-icon" />
              <h4>Tu carrito está vacío</h4>
              <p>Elegí tus sabores favoritos en el menú o armá un pote a medida.</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">
                        {item.size ? item.size.name : item.title}
                      </h4>
                      {item.flavors && (
                        <p className="cart-item-sub">
                          Sabores: {item.flavors.join(', ')}
                        </p>
                      )}
                      {item.toppings && item.toppings.length > 0 && (
                        <p className="cart-item-toppings">
                          Toppings: {item.toppings.map((t) => t.name).join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="cart-item-action">
                      <span className="cart-item-price">${item.totalPrice.toFixed(2)}</span>
                      <button 
                        className="btn-remove-item"
                        onClick={() => onRemoveItem(item.id)}
                        title="Eliminar de carrito"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Info Form */}
              <div className="customer-form">
                <h4 className="form-title">Datos de Entrega y Pago (Venezuela 🇻🇪)</h4>

                <div className="form-group">
                  <label>Nombre y Apellido</label>
                  <input
                    type="text"
                    placeholder="Ej. María Rodríguez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono de Contacto (WhatsApp)</label>
                  <input
                    type="tel"
                    placeholder="Ej. 0412-1234567 / 0424-9876543"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>

                <div className="delivery-selector">
                  <button
                    className={`delivery-btn ${deliveryMethod === 'delivery' ? 'active' : ''}`}
                    onClick={() => setDeliveryMethod('delivery')}
                  >
                    <Truck size={16} /> Delivery
                  </button>
                  <button
                    className={`delivery-btn ${deliveryMethod === 'pickup' ? 'active' : ''}`}
                    onClick={() => setDeliveryMethod('pickup')}
                  >
                    <Store size={16} /> Retiro en Tienda
                  </button>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div className="form-group">
                    <label>Dirección de Entrega (Ciudad / Sector)</label>
                    <input
                      type="text"
                      placeholder="Calle, Av., Res. / Edificio, Nro. de Apto"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                )}

                {/* Formas de Pago en Venezuela */}
                <div className="form-group">
                  <label>Forma de Pago</label>
                  <div className="payment-options-grid">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        className={`payment-chip ${paymentMethod === method.id ? 'active' : ''}`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Notas / Punto de Referencia</label>
                  <input
                    type="text"
                    placeholder="Ej. Casa de portón blanco frente a la panadería..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <div>
                <span>Total a Pagar:</span>
                <span className="bcv-note"> (Calculado en $ USD / Tasa BCV)</span>
              </div>
              <span className="total-amount">${totalCart.toFixed(2)} USD</span>
            </div>

            <div className="cart-send-actions">
              <button 
                className="btn-whatsapp flex-1"
                onClick={handleSendWhatsApp}
              >
                <MessageCircle size={18} /> Pedir por WhatsApp
              </button>
              <button 
                className="btn-secondary flex-1"
                onClick={handleSendEmail}
              >
                <Mail size={18} /> Enviar por Correo
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(61, 39, 34, 0.6);
          backdrop-filter: blur(6px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .cart-modal {
          background: #FFFFFF;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: fadeIn 0.3s ease-out;
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 1.5rem;
          background: var(--bg-primary);
          border-bottom: 1px solid rgba(61, 39, 34, 0.08);
        }

        .cart-header-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .header-icon {
          color: var(--color-terracotta);
        }

        .cart-header-title h3 {
          font-size: 1.15rem;
          font-weight: 800;
        }

        .btn-close-modal {
          background: none;
          color: var(--color-chocolate-muted);
          padding: 0.3rem;
          border-radius: 50%;
          transition: var(--transition);
        }

        .btn-close-modal:hover {
          color: var(--color-terracotta);
          background: rgba(0,0,0,0.05);
        }

        .cart-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex-grow: 1;
        }

        .cart-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--color-chocolate-muted);
        }

        .empty-icon {
          color: var(--color-blue);
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .cart-item-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-primary);
          padding: 0.9rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(61, 39, 34, 0.06);
        }

        .cart-item-name {
          font-size: 0.95rem;
          font-weight: 800;
        }

        .cart-item-sub, .cart-item-toppings {
          font-size: 0.8rem;
          color: var(--color-chocolate-muted);
        }

        .cart-item-action {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .cart-item-price {
          font-family: var(--font-heading);
          font-weight: 800;
          color: var(--color-terracotta-dark);
          font-size: 0.95rem;
        }

        .btn-remove-item {
          background: none;
          color: #999;
          padding: 0.3rem;
          transition: var(--transition);
        }

        .btn-remove-item:hover {
          color: var(--color-cherry);
        }

        .customer-form {
          border-top: 1px solid rgba(61, 39, 34, 0.08);
          padding-top: 1.2rem;
        }

        .form-title {
          font-size: 1rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          margin-bottom: 0.8rem;
        }

        .form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-chocolate-muted);
        }

        .form-group input {
          padding: 0.6rem 0.9rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(61, 39, 34, 0.15);
          font-family: var(--font-body);
          font-size: 0.88rem;
          outline: none;
        }

        .delivery-selector {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
        }

        .delivery-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          border: 1px solid rgba(61, 39, 34, 0.1);
          font-weight: 700;
          font-size: 0.84rem;
          color: var(--color-chocolate-muted);
        }

        .delivery-btn.active {
          background: var(--color-blue);
          color: #FFFFFF;
          border-color: var(--color-blue);
        }

        .payment-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .payment-chip {
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          border: 1px solid rgba(61, 39, 34, 0.12);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-chocolate-muted);
          cursor: pointer;
          transition: var(--transition);
        }

        .payment-chip.active {
          background: var(--color-terracotta);
          color: #FFF;
          border-color: var(--color-terracotta);
        }

        .cart-footer {
          padding: 1.2rem 1.5rem;
          background: var(--bg-primary);
          border-top: 1px solid rgba(61, 39, 34, 0.08);
        }

        .cart-total-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .bcv-note {
          font-size: 0.72rem;
          color: var(--color-blue-dark);
          font-weight: 600;
        }

        .total-amount {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--color-terracotta-dark);
        }

        .cart-send-actions {
          display: flex;
          gap: 0.8rem;
        }

        .flex-1 {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
