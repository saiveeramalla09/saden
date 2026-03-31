import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadCloud } from 'lucide-react';

import StepDetails from '../components/Listing/StepDetails';
import VerificationScanner from '../components/Listing/VerificationScanner';

const SellerListingFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Read mathematical area forwarded from bounds drawing Map.
  const extractedGajam = location.state?.gajam || 850; 

  const [step, setStep] = useState(1); // 1 = Details, 2 = Docs, 3 = Verification
  const [listingData, setListingData] = useState(null);

  const handleStepDetailsSubmit = (data) => {
    setListingData(data);
    setStep(2);
  };

  const handleDocsSubmit = () => {
    // In real app, we'd wait for file uploads here
    setStep(3);
  };

  const handleFinalComplete = () => {
    alert("Property Submitted for Database Sync! It will be Live shortly.");
    navigate('/seller');
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '24px', position: 'relative' }}>
       {/* Header */}
       <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
         <button className="btn-ghost" onClick={() => navigate(-1)} style={{ padding: '8px', background: 'var(--bg-elevated)', borderRadius: '50%' }}>
           <ArrowLeft size={20} />
         </button>
         <div>
           <h2 className="text-gradient">List Property</h2>
           <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Step {step} of 3</p>
         </div>
       </div>

       {/* Step Progress Bar */}
       <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
         {[1, 2, 3].map(i => (
           <div key={i} style={{ 
             flex: 1, 
             height: '4px', 
             background: i <= step ? 'var(--accent-primary)' : 'var(--bg-elevated)',
             borderRadius: '2px',
             transition: 'background 0.3s ease'
           }} />
         ))}
       </div>

       {/* Content Wrappers */}
       <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
                <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Property Details</h3>
                <StepDetails gajamArea={extractedGajam} onSubmit={handleStepDetailsSubmit} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
                 <h3 style={{ marginBottom: '8px', fontSize: '20px' }}>Upload Documents</h3>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Please securely upload identity and land registry proofs. Our AI will scan them instantly.</p>
                 
                 <div style={{ border: '2px dashed var(--border-strong)', borderRadius: '16px', padding: '40px 20px', textAlign: 'center', marginBottom: '24px' }}>
                    <UploadCloud size={40} color="var(--accent-primary)" style={{ margin: '0 auto 16px' }} />
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>Tap to select Sale Deed</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '8px' }}>PDF, JPEG up to 10MB</p>
                 </div>

                 <button className="btn-primary" onClick={handleDocsSubmit}>Run AI Verification</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                 <h3 style={{ marginBottom: '8px', fontSize: '20px' }}>AI Document Analysis</h3>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>Processing encrypted geospatial layers...</p>
                 
                 <VerificationScanner 
                   ownerName={listingData.ownerName} 
                   surveyNum={listingData.surveyNum} 
                   onComplete={handleFinalComplete} 
                 />
              </motion.div>
            )}

          </AnimatePresence>
       </div>
    </div>
  );
};

export default SellerListingFlow;
