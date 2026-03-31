import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, Search, Crosshair } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SmartAssistModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [surveyNumber, setSurveyNumber] = useState('');
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = () => {
    if (!surveyNumber.trim() || !location.trim()) {
      setErrorMsg("Please provide both Survey Number and Region.");
      return;
    }

    setIsSearching(true);
    setErrorMsg('');

    // Simulate API Database Lookup
    setTimeout(() => {
       if (surveyNumber.trim() === '123') {
         // Success - Route with query parameter to hydrate mock boundary
         navigate('/?mode=draw&survey=123');
       } else {
         // Failure - Route cleanly but gracefully to manual drawer
         setErrorMsg("Boundary not found in registry. Redirecting to manual plot...");
         setTimeout(() => {
            navigate('/?mode=draw');
         }, 2500);
       }
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 'var(--z-modal, 100)', background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
    }}>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          width: '100%', maxWidth: '400px', background: 'var(--bg-elevated)',
          borderRadius: '24px', border: '1px solid var(--border-subtle)',
          padding: '24px', position: 'relative', boxShadow: 'var(--shadow-float)'
        }}
      >
        <button className="btn-ghost" onClick={onClose} disabled={isSearching} style={{ position: 'absolute', top: '16px', right: '16px', padding: '8px' }}>
          <X size={20} />
        </button>

        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="glass-panel" style={{ padding: '12px', borderRadius: '12px', color: 'var(--accent-primary)' }}>
            <Crosshair size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Smart Locate</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Auto-plot using official land registry.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="input-label">Survey / Khasra Number</label>
            <div style={{ position: 'relative' }}>
               <input 
                 className={`input-field ${errorMsg && !isSearching ? 'input-error' : ''}`}
                 placeholder="e.g. 123"
                 value={surveyNumber}
                 onChange={(e) => setSurveyNumber(e.target.value)}
                 disabled={isSearching}
               />
               <Map size={18} color="var(--text-tertiary)" style={{ position: 'absolute', right: '16px', top: '16px' }} />
            </div>
          </div>

          <div>
            <label className="input-label">Village / Mandal / District</label>
            <input 
              className={`input-field ${errorMsg && !isSearching ? 'input-error' : ''}`}
              placeholder="e.g. Gachibowli, Hyderabad"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isSearching}
            />
          </div>

          <AnimatePresence>
            {errorMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={errorMsg.includes('Redirecting') ? "text-gradient" : "err-msg"} style={{ fontSize: '14px' }}>
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            className="btn-primary" 
            onClick={handleSearch}
            disabled={isSearching}
            style={{ marginTop: '8px' }}
          >
            {isSearching ? (
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                   style={{ width: '18px', height: '18px', border: '2px solid transparent', borderTopColor: 'var(--bg-base)', borderRadius: '50%' }}
                 />
                 <span>Fetching geometry bounds...</span>
               </div>
            ) : (
               <><Search size={18} /> Auto-Detect Boundary</>
            )}
          </button>

          {!isSearching && (
             <button className="btn-ghost" onClick={() => navigate('/?mode=draw')} style={{ width: '100%', padding: '12px' }}>
                Skip & Draw Manually
             </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SmartAssistModal;
