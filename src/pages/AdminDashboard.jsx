import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_LAND_DATA } from '../data/mockData';
import { LogOut, CheckCircle, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  
  const pendingListing = MOCK_LAND_DATA.find(l => l.status === 'PENDING_ADMIN');

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '24px', paddingBottom: '100px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h2 className="text-gradient">Admin Panel</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Welcome, {user?.identifier}</p>
        </div>
        <button className="btn-ghost" onClick={logout} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <LogOut size={20} /> Logout
        </button>
      </header>
      
      <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Pending Approvals (1)</h3>

      {pendingListing ? (
        <div style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}>
          <img src={pendingListing.images[0]} alt="Land" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
          <div style={{ padding: '16px' }}>
            <h4 style={{ fontSize: '18px' }}>{pendingListing.title}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>{pendingListing.location}</p>
            
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button style={{ 
                flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
                background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-base)', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer'
              }}>
                <CheckCircle size={20} /> Approve
              </button>
              <button style={{ 
                flex: 1, padding: '12px', borderRadius: '8px', border: 'none',
                background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-base)', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer'
              }}>
                <AlertTriangle size={20} /> Reject
              </button>
            </div>
          </div>
        </div>
      ) : (
         <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>No pending approvals.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
