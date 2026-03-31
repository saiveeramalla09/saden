import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_LAND_DATA } from '../data/mockData';
import { PlusCircle, LogOut } from 'lucide-react';
import SmartAssistModal from '../components/Dashboard/SmartAssistModal';
import { AnimatePresence } from 'framer-motion';

const SellerDashboard = () => {
  const { logout, user } = useAuth();
  const [showSmartModal, setShowSmartModal] = useState(false);
  
  const sellerListings = MOCK_LAND_DATA;

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '24px', paddingBottom: '120px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 className="text-gradient">My Listings</h2>
           <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Seller: {user?.identifier}</p>
        </div>
        <button className="btn-ghost" onClick={logout} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <LogOut size={20} /> Logout
        </button>
      </header>

      <button className="btn-primary" onClick={() => setShowSmartModal(true)} style={{ marginBottom: '24px' }}>
        <PlusCircle size={20} /> Add New Land Bounds
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
         {sellerListings.map(land => (
            <div key={land.id} style={{ display: 'flex', gap: '16px', background: 'var(--bg-elevated)', padding: '12px', borderRadius: '16px', border: '1px solid var(--border-subtle)'}}>
              <img src={land.images[0]} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '16px' }}>{land.title}</h4>
                <p style={{ color: 'var(--accent-primary)', fontSize: '14px', fontWeight: 'bold' }}>{land.totalPrice}</p>
                <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: land.status === 'ACTIVE' ? 'var(--success-base)' : 'var(--accent-primary)', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                    {land.status === 'ACTIVE' ? 'Live' : 'Pending Review'}
                  </span>
                </div>
              </div>
            </div>
         ))}
      </div>

      <AnimatePresence>
         {showSmartModal && <SmartAssistModal onClose={() => setShowSmartModal(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default SellerDashboard;
