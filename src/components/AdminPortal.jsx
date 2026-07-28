import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import FlavorManager from './admin/FlavorManager';
import OfferManager from './admin/OfferManager';
import StoreSettings from './admin/StoreSettings';
import StoryManager from './admin/StoryManager';
import OrderHistory from './admin/OrderHistory';
import { 
  LayoutDashboard, 
  IceCream, 
  Tag, 
  Store, 
  UserCheck, 
  ShoppingBag, 
  LogOut, 
  ExternalLink, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function AdminPortal({ onGoToLanding }) {
  const { logoutAdmin, flavors, offers, orders, storeInfo } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  const inStockFlavors = flavors.filter(f => f.inStock).length;
  const outOfStockFlavors = flavors.length - inStockFlavors;

  return (
    <div className="admin-portal-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
          <div className="sidebar-brand-text">
            <span className="brand-name">EAT GELATO</span>
            <span className="brand-badge">PANEL ADMIN</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'flavors' ? 'active' : ''}`}
            onClick={() => setActiveTab('flavors')}
          >
            <IceCream size={18} /> Sabores & Catálogo
            <span className="count-pill">{flavors.length}</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            <Tag size={18} /> Ofertas del Día
            <span className="count-pill">{offers.length}</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'store' ? 'active' : ''}`}
            onClick={() => setActiveTab('store')}
          >
            <Store size={18} /> Datos del Local
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
            onClick={() => setActiveTab('story')}
          >
            <UserCheck size={18} /> Historia del Dueño
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={18} /> Pedidos
            {orders.length > 0 && <span className="count-pill highlight">{orders.length}</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={logoutAdmin}>
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-content-wrapper">
        <header className="admin-topbar">
          <div className="topbar-left">
            <h2>Panel de Control - EAT GELATO</h2>
            <span className="store-addr-tag">📍 {storeInfo.address}</span>
          </div>

          <div className="topbar-actions">
            <button className="btn-secondary btn-sm" onClick={onGoToLanding}>
              <ExternalLink size={16} /> Ver Landing Page Live
            </button>
          </div>
        </header>

        <main className="admin-main-body">
          {activeTab === 'dashboard' && (
            <div className="dashboard-overview">
              <div className="overview-cards">
                <div className="kpi-card">
                  <div className="kpi-icon-box blue">
                    <IceCream size={24} />
                  </div>
                  <div>
                    <span className="kpi-value">{flavors.length}</span>
                    <span className="kpi-label">Sabores Registrados ({inStockFlavors} Activos)</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box terracotta">
                    <Tag size={24} />
                  </div>
                  <div>
                    <span className="kpi-value">{offers.length}</span>
                    <span className="kpi-label">Ofertas Especiales Vigentes</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box cherry">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <span className="kpi-value">{orders.length}</span>
                    <span className="kpi-label">Pedidos Recibidos</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions-box">
                <h4>Acciones Rápidas para el Dueño</h4>
                <div className="quick-buttons-row">
                  <button className="quick-btn" onClick={() => setActiveTab('flavors')}>
                    <IceCream size={20} /> Agregar Sabor o Foto Real
                  </button>
                  <button className="quick-btn" onClick={() => setActiveTab('offers')}>
                    <Tag size={20} /> Crear Promoción del Día
                  </button>
                  <button className="quick-btn" onClick={() => setActiveTab('store')}>
                    <Store size={20} /> Cambiar Número de WhatsApp / Dirección
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flavors' && <FlavorManager />}
          {activeTab === 'offers' && <OfferManager />}
          {activeTab === 'store' && <StoreSettings />}
          {activeTab === 'story' && <StoryManager />}
          {activeTab === 'orders' && <OrderHistory />}
        </main>
      </div>

      <style jsx>{`
        .admin-portal-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .admin-sidebar {
          background: var(--color-chocolate);
          color: #FFF;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-logo {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid var(--color-terracotta);
        }

        .sidebar-brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.1rem;
        }

        .brand-badge {
          font-size: 0.62rem;
          color: var(--color-vanilla);
          font-weight: 800;
          letter-spacing: 1px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex-grow: 1;
        }

        .nav-tab-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          background: transparent;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition);
          border: none;
        }

        .nav-tab-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #FFF;
        }

        .nav-tab-btn.active {
          background: var(--color-terracotta);
          color: #FFF;
          font-weight: 700;
        }

        .count-pill {
          background: rgba(255,255,255,0.2);
          color: #FFF;
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .count-pill.highlight {
          background: var(--color-cherry);
        }

        .sidebar-footer {
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .btn-logout {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(200, 62, 77, 0.15);
          color: #FF8A95;
          padding: 0.6rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.84rem;
          border: none;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-logout:hover {
          background: var(--color-cherry);
          color: #FFF;
        }

        .admin-content-wrapper {
          display: flex;
          flex-direction: column;
        }

        .admin-topbar {
          background: #FFF;
          padding: 1.2rem 2rem;
          border-bottom: 1px solid rgba(61, 39, 34, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .admin-topbar h2 {
          font-size: 1.3rem;
          font-weight: 800;
        }

        .store-addr-tag {
          font-size: 0.8rem;
          color: var(--color-chocolate-muted);
        }

        .admin-main-body {
          padding: 2rem;
          flex-grow: 1;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .kpi-card {
          background: #FFF;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(61, 39, 34, 0.08);
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }

        .kpi-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kpi-icon-box.blue { background: rgba(72, 137, 168, 0.15); color: var(--color-blue-dark); }
        .kpi-icon-box.terracotta { background: rgba(228, 122, 90, 0.15); color: var(--color-terracotta-dark); }
        .kpi-icon-box.cherry { background: rgba(200, 62, 77, 0.15); color: var(--color-cherry); }

        .kpi-value {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--color-chocolate);
          display: block;
          line-height: 1;
        }

        .kpi-label {
          font-size: 0.8rem;
          color: var(--color-chocolate-muted);
          font-weight: 600;
        }

        .quick-actions-box {
          background: #FFF;
          padding: 1.8rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          border: 1px solid rgba(61, 39, 34, 0.08);
        }

        .quick-actions-box h4 {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .quick-buttons-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .quick-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1.4rem;
          border-radius: var(--radius-md);
          background: var(--bg-primary);
          border: 1px solid rgba(61, 39, 34, 0.1);
          color: var(--color-chocolate);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .quick-btn:hover {
          background: var(--color-terracotta);
          color: #FFF;
          border-color: var(--color-terracotta);
        }

        @media (max-width: 900px) {
          .admin-portal-layout {
            grid-template-columns: 1fr;
          }
          .admin-sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
