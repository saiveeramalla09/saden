import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Undo2, Check, X } from 'lucide-react';
import { area as turfArea } from '@turf/area';
import { polygon } from '@turf/helpers';

const DrawControlsUI = ({ points, onUndo, onCancel, onSave }) => {
  
  const calculateMetrics = useMemo(() => {
    if (points.length < 3) return { sqMeters: 0, acres: 0, sqYards: 0, gajam: 0 };
    
    // Turf area expects longitude, latitude coords
    const polyCoords = [...points.map(p => [p[1], p[0]]), [points[0][1], points[0][0]]]; // closing the loop
    
    try {
      const sqMeters = turfArea(polygon([polyCoords]));
      const sqYards = sqMeters * 1.19599;
      const acres = sqMeters / 4046.86;
      const gajam = sqYards; // 1 Sq Yard = 1 Gajam in TS/AP
      
      return { sqMeters, acres, sqYards, gajam };
    } catch {
      return { sqMeters: 0, acres: 0, sqYards: 0, gajam: 0 };
    }
  }, [points]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '16px',
        right: '16px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Metrics Card */}
      <div className="glass-panel" style={{ 
        padding: '16px', 
        borderRadius: '20px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'var(--shadow-float)'
      }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Calculated Area</p>
          {points.length < 3 ? (
            <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--accent-primary)' }}>Tap 3+ points</p>
          ) : (
             <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                   {calculateMetrics.acres < 0.1 ? calculateMetrics.sqYards.toFixed(0) : calculateMetrics.acres.toFixed(2)}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                   {calculateMetrics.acres < 0.1 ? 'Sq. Yds' : 'Acres'}
                </span>
             </div>
          )}
        </div>
        
        {points.length >= 3 && calculateMetrics.acres < 0.1 && (
           <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Also</p>
              <p style={{ fontSize: '14px', fontWeight: 600 }}>{calculateMetrics.gajam.toFixed(0)} Gajam</p>
           </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="glass-panel" onClick={onCancel} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', color: 'var(--text-primary)', display: 'flex', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <X size={20} /> Cancel
        </button>
        
        <button 
          className="glass-panel" 
          onClick={onUndo} 
          disabled={points.length === 0}
          style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', color: points.length > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)', display: 'flex', justifyContent: 'center', gap: '8px', cursor: points.length > 0 ? 'pointer' : 'not-allowed' }}
        >
          <Undo2 size={20} /> Undo
        </button>

        <button 
          className="btn-primary" 
          onClick={() => onSave(calculateMetrics)}
          disabled={points.length < 3}
          style={{ flex: 1.5, padding: '16px', borderRadius: '16px', gap: '6px' }}
        >
          <Check size={20} /> Save Shape
        </button>
      </div>
    </motion.div>
  );
};

export default DrawControlsUI;
