import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, ScanLine, XCircle } from 'lucide-react';

const VerificationScanner = ({ ownerName, surveyNum, onComplete }) => {
  const [phase, setPhase] = useState('scanning'); // scanning | matches | result
  const [logs, setLogs] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const [resultPhase, setResultPhase] = useState('review'); // verified | review | rejected

  // Simulate OCR text extraction
  useEffect(() => {
    const sequence = [
      { t: 500, log: "Initializing AI Model [v4.2]..." },
      { t: 1500, log: "Scanning Encrypted Layer 1..." },
      { t: 2200, log: "Extracting Geometry Entities..." },
      { t: 3000, log: "OCR Engine Parsing Text..." },
      { t: 4000, log: `Detected Surveyor Title: "${surveyNum}"` },
      { t: 4800, log: `Detected Registrant: "${ownerName.toUpperCase()}"` },
      { t: 5500, log: "Cross-referencing Official Records..." }
    ];

    let timerIds = [];
    sequence.forEach((item) => {
      const id = setTimeout(() => {
        setLogs(prev => [...prev, item.log]);
        setConfidence(prev => Math.min(prev + Math.floor(Math.random() * 15 + 5), 98));
      }, item.t);
      timerIds.push(id);
    });

    // Determine Logic Result
    const resolveComplete = setTimeout(() => {
       setPhase('result');
       // Fake validation logic
       const nameLen = ownerName.trim().length;
       if (nameLen > 6) {
         setResultPhase('verified');
         setConfidence(98);
       } else if (nameLen > 2) {
         setResultPhase('review');
         setConfidence(72);
       } else {
         setResultPhase('rejected');
         setConfidence(24);
       }
    }, 6500);

    return () => {
      timerIds.forEach(clearTimeout);
      clearTimeout(resolveComplete);
    };
  }, [ownerName, surveyNum]);

  return (
    <div style={{ width: '100%' }}>
      
      {phase === 'scanning' && (
        <div style={{ position: 'relative', width: '100%', height: '200px', background: 'var(--bg-elevated)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
           {/* Mock Deed */}
           <div style={{ padding: '24px', opacity: 0.3 }}>
             <FileText size={48} />
             <div style={{ width: '60%', height: '8px', background: 'var(--text-secondary)', marginTop: '16px', borderRadius: '4px' }} />
             <div style={{ width: '40%', height: '8px', background: 'var(--text-secondary)', marginTop: '8px', borderRadius: '4px' }} />
             <div style={{ width: '80%', height: '8px', background: 'var(--text-secondary)', marginTop: '8px', borderRadius: '4px' }} />
           </div>

           {/* Scanner Laser */}
           <motion.div 
             initial={{ y: 0 }}
             animate={{ y: 200 }}
             transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatType: 'reverse' }}
             style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(234, 179, 8, 0.4))', borderBottom: '2px solid var(--accent-primary)', zIndex: 10 }}
           >
              <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                 <ScanLine size={24} color="var(--accent-primary)" />
              </div>
           </motion.div>

           {/* Confidence Metric Overlay */}
           <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.8)', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
              Conf: {confidence}%
           </div>
        </div>
      )}

      {/* Result Phase */}
      {phase === 'result' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          style={{ width: '100%', background: 'var(--bg-elevated)', borderRadius: '16px', padding: '24px', textAlign: 'center', border: `1px solid ${resultPhase === 'verified' ? 'var(--success-base)' : resultPhase === 'review' ? 'var(--accent-primary)' : 'var(--error-base)'}` }}
        >
          {resultPhase === 'verified' && <CheckCircle size={48} color="var(--success-base)" style={{ margin: '0 auto' }} />}
          {resultPhase === 'review' && <AlertTriangle size={48} color="var(--accent-primary)" style={{ margin: '0 auto' }} />}
          {resultPhase === 'rejected' && <XCircle size={48} color="var(--error-base)" style={{ margin: '0 auto' }} />}
          
          <h3 style={{ marginTop: '16px', fontSize: '20px' }}>
            {resultPhase === 'verified' ? 'Identity Verified' : resultPhase === 'review' ? 'Manual Review Required' : 'Verification Failed'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
            {resultPhase === 'verified' ? `Algorithms matched "${ownerName}" to Title Deed successfully.` : 
             resultPhase === 'review' ? 'Name variations found. Sent to Admin Queue for manual screening.' : 
             'Survey mismatch. Please re-upload legitimate documents.'}
          </p>
          <div style={{ marginTop: '16px', fontSize: '14px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
             Final Confidence: {confidence}%
          </div>
        </motion.div>
      )}

      {/* Terminal Readout Logs */}
      <div style={{ marginTop: '24px', background: '#000', borderRadius: '8px', padding: '12px', height: '120px', overflowY: 'auto', border: '1px solid var(--border-subtle)' }}>
         <div style={{ color: 'var(--text-secondary)', fontSize: '10px', marginBottom: '8px', textTransform: 'uppercase' }}>System Timeline</div>
         {logs.map((log, i) => (
           <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: 'var(--success-base)', fontSize: '12px', fontFamily: 'monospace', marginBottom: '4px' }}>
             {'>'} {log}
           </motion.div>
         ))}
      </div>

      {phase === 'result' && (
        <button className="btn-primary" onClick={onComplete} style={{ marginTop: '24px' }}>
           Complete Listing
        </button>
      )}
    </div>
  );
};

export default VerificationScanner;
