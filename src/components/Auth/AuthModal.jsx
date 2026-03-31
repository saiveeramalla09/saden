import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USER_ROLES } from '../../data/mockData';

const AuthModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleNext = async () => {
    setError('');
    
    // Step 1: Identifier
    if (step === 1) {
      if (!identifier.trim() || identifier.length < 5) {
        setError("Please enter a valid Phone or Email.");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 600);
      return;
    }
    
    // Step 2: OTP
    if (step === 2) {
      if (otp.join('').length !== 4) {
        setError("Please enter the 4-digit code.");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 600);
      return;
    }
    
    // Step 3: Password / Complete
    if (step === 3) {
      if (password.length < 4) {
        setError("Password must be at least 4 characters.");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Map roles based on identifier trick for testing
        let role = MOCK_USER_ROLES.BUYER;
        if (identifier === '1111111111' || identifier === 'admin@saden.com') role = MOCK_USER_ROLES.ADMIN;
        if (identifier === '2222222222' || identifier === 'seller@saden.com') role = MOCK_USER_ROLES.SELLER;
        
        login({ id: Date.now(), role, identifier });
        onClose();
      }, 800);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto focus next
    if (value !== '' && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full flex flex-col gap-6"
          >
            <div>
              <h2 className="text-gradient">Welcome back</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
                Enter your mobile number or email to proceed.
              </p>
            </div>
            
            <div>
               <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                 <input 
                   type="text" 
                   value={identifier}
                   onChange={(e) => setIdentifier(e.target.value)}
                   className={`input-field ${error ? 'input-error' : ''}`}
                   placeholder="Phone or Email"
                 />
                 <div style={{ position: 'absolute', right: '16px', color: 'var(--text-tertiary)' }}>
                   {identifier.includes('@') ? <Mail size={20} /> : <Phone size={20} />}
                 </div>
               </div>
               {error && <div className="err-msg" style={{ marginTop: '8px' }}>{error}</div>}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full flex flex-col gap-6"
          >
             <div>
              <h2 className="text-gradient">Verify OTP</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
                We sent a securely encrypted code to <strong style={{ color: 'var(--text-primary)'}}>{identifier}</strong>
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className={`input-field flex-center ${error ? 'input-error' : ''}`}
                    style={{ width: '64px', height: '64px', fontSize: '24px', textAlign: 'center', padding: 0 }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus();
                      }
                    }}
                  />
                ))}
              </div>
               {error && <div className="err-msg flex-center" style={{ marginTop: '16px' }}>{error}</div>}
            </div>
          </motion.div>
        );
      case 3:
        return (
           <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full flex flex-col gap-6"
          >
            <div>
              <h2 className="text-gradient">Set Password</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>
                Secure your account with a strong password.
              </p>
            </div>
            
            <div>
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className={`input-field ${error ? 'input-error' : ''}`}
                 placeholder="Enter password"
               />
               {error && <div className="err-msg" style={{ marginTop: '8px' }}>{error}</div>}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 'var(--z-modal, 100)',
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'end',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          width: '100%',
          maxWidth: 'var(--max-width, 480px)',
          background: 'var(--bg-base)',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          borderTop: '1px solid var(--border-subtle)',
          padding: '32px 24px 48px',
          position: 'relative',
          boxShadow: 'var(--shadow-float)'
        }}
      >
        <button className="btn-ghost" onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--bg-elevated)' }}>
          <X size={20} />
        </button>

        <div style={{ overflow: 'hidden', paddingBottom: '32px' }}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        <button 
          className="btn-primary" 
          onClick={handleNext}
          disabled={isLoading}
          style={{ width: '100%' }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{ width: '24px', height: '24px', border: '2px solid transparent', borderTopColor: 'var(--bg-base)', borderRadius: '50%' }}
            />
          ) : (
            <>
              {step === 3 ? 'Secure & Login' : 'Continue'} 
              {step !== 3 && <ArrowRight size={20} />}
              {step === 3 && <ShieldCheck size={20} />}
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default AuthModal;
