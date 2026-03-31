import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ShieldAlert, Phone, MapPin, Share2 } from 'lucide-react';
import { MOCK_LAND_DATA } from '../data/mockData';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Scroll entirely top on route match natively
    window.scrollTo(0, 0);
    const item = MOCK_LAND_DATA.find(l => l.id === id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if(item) setProperty(item);
  }, [id]);

  if (!property) return <div style={{ padding: '24px', textAlign: 'center' }}>Property Not Found</div>;

  // Measurement mathematics formatting
  const gajam = property.gajamArea;
  const sqYds = gajam;
  const acres = (gajam / 4840).toFixed(2);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-120">
      
      {/* Immersive Hero Header */}
      <div style={{ position: 'relative', height: '350px', width: '100%' }}>
         <img src={property.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hero" />
         
         <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-ghost" onClick={() => navigate(-1)} style={{ padding: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', backdropFilter: 'blur(10px)' }}>
               <ArrowLeft size={24} color="#FFF" />
            </button>
            <button className="btn-ghost" style={{ padding: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', backdropFilter: 'blur(10px)' }}>
               <Share2 size={20} color="#FFF" />
            </button>
         </div>

         {/* Gradient overlay for blending */}
         <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px', background: 'linear-gradient(to top, var(--bg-base), transparent)' }} />
      </div>

      <div style={{ padding: '24px' }}>
         {/* Details Header & Verification */}
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1.2, marginBottom: '8px' }}>{property.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                 <MapPin size={16} /> {property.location}
              </div>
            </div>
            
            {property.verified ? (
               <div style={{ textAlign: 'center' }}>
                  <CheckCircle size={28} color="var(--success-base)" />
                  <p style={{ fontSize: '10px', color: 'var(--success-base)', marginTop: '4px', textTransform: 'uppercase' }}>Verified</p>
               </div>
            ) : (
               <div style={{ textAlign: 'center' }}>
                  <ShieldAlert size={28} color="var(--accent-primary)" />
                  <p style={{ fontSize: '10px', color: 'var(--accent-primary)', marginTop: '4px', textTransform: 'uppercase' }}>Review</p>
               </div>
            )}
         </div>

         {/* Pricing Block */}
         <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid var(--accent-glow)' }}>
            <h2 className="text-gradient" style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>{property.totalPrice}</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>{property.price}</p>
         </div>

         {/* Extracted Unit Engine Measurements */}
         <h3 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>Total Extent</h3>
         <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div className="glass-panel" style={{ flex: '1 1 30%', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
               <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--success-base)' }}>{gajam.toLocaleString('en-IN')}</p>
               <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Gajam</p>
            </div>
            <div className="glass-panel" style={{ flex: '1 1 30%', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
               <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{sqYds.toLocaleString('en-IN')}</p>
               <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sq Yards</p>
            </div>
            <div className="glass-panel" style={{ flex: '1 1 30%', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
               <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{acres}</p>
               <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Acres</p>
            </div>
         </div>

         {/* Land Description */}
         <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: 600 }}>About this Land</h3>
         <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            {property.description}
         </p>

         {/* Smart Insights Phase 11 */}
         <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', marginBottom: '32px' }}>
            <h4 style={{ fontSize: '14px', color: 'var(--accent-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <MapPin size={16} /> Smart Location Insights
            </h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
               <span style={{ color: 'var(--text-secondary)' }}>Distance to 100ft Highway</span>
               <span style={{ fontWeight: 600 }}>1.2 KM <span style={{ color: 'var(--success-base)' }}>●</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '8px' }}>
               <span style={{ color: 'var(--text-secondary)' }}>Projected Growth Potential</span>
               <span style={{ fontWeight: 600 }}>High (Upcoming Hub) <span style={{ color: 'var(--success-base)' }}>●</span></span>
            </div>
         </div>

         {/* Map Preview Fake Hook */}
         <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: 600 }}>Location Context</h3>
         <div style={{ position: 'relative', width: '100%', height: '180px', borderRadius: '16px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
            {/* Visual cheat linking to satellite map dynamically */}
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" style={{ opacity: 0.5, objectFit: 'cover', width: '100%', height: '100%' }} />
            <button className="btn-primary" onClick={() => navigate('/')} style={{ position: 'absolute', padding: '12px 24px', borderRadius: '999px', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.1)' }}>
               Open Explored Map
            </button>
         </div>

         {/* Legal Disclaimer Phase 11 */}
         <div style={{ paddingBottom: '120px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
               ⚠️ DISCLAIMER: This tech platform algorithmically assists in secure discovery and verification. Final binding legal ownership transfer must be completed manually through official government Dharani registration at the respective sub-registrar office.
            </p>
         </div>
      </div>

      {/* Sticky Bottom Communications Footer */}
      <motion.div 
         initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.3, type: 'spring' }}
         style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: '24px', background: 'var(--bg-base)', borderTop: '1px solid var(--border-subtle)', zIndex: 50 }}
      >
         <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-ghost" style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', display: 'flex', gap: '8px', justifyContent: 'center' }}>
               <Phone size={20} />
               Call Masked
            </button>
            <button className="btn-primary" style={{ flex: 2, padding: '16px', borderRadius: '16px' }}>
               Express Interest
            </button>
         </div>
      </motion.div>

    </motion.div>
  );
};

export default PropertyDetails;
