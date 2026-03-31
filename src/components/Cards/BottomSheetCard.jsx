import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomSheetCard = ({ property, onDismiss }) => {
  const navigate = useNavigate();
  if (!property) return null;

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.4}
      onDragEnd={(e, info) => {
        if (info.offset.y > 100) {
          onDismiss(); // Dismiss if dragged down by 100px
        }
      }}
      style={{
        position: 'absolute',
        bottom: '100px', // slightly above the bottom nav
        left: '16px',
        right: '16px',
        background: 'var(--bg-base)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '24px',
        padding: '20px',
        zIndex: 50,
        boxShadow: 'var(--shadow-float)',
        touchAction: 'none' // required for framer-motion drag on mobile
      }}
    >
      {/* Drag Handle Indicator */}
      <div style={{ 
        width: '40px', height: '4px', background: 'var(--border-strong)', 
        borderRadius: '2px', margin: '0 auto 16px auto' 
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', background: 'var(--accent-glow)', color: 'var(--accent-primary)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 600 }}>{property.type}</span>
            {property.verified && (
              <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-base)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 600 }}>Verified</span>
            )}
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '4px', lineHeight: 1.2 }}>{property.title}</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
             <MapPin size={14} />
             <p style={{ fontSize: '14px' }}>{property.location}</p>
          </div>
        </div>
        
        <button className="btn-ghost" onClick={onDismiss} style={{ padding: '4px' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '20px', paddingBottom: '8px' }}>
         <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
               <span>{(property.gajamArea || 0).toLocaleString('en-IN')} Gajam</span>
               <span>•</span>
               <span>{((property.gajamArea || 0) / 4840).toFixed(2)} Acres</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Price</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{property.totalPrice}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{property.price}</p>
         </div>
         <button className="btn-primary" onClick={() => navigate(`/property/${property.id}`)} style={{ padding: '12px 20px', width: 'auto', fontSize: '14px' }}>
            View Details
         </button>
      </div>
      
    </motion.div>
  );
};

export default BottomSheetCard;
