import React, { useState } from 'react';

const StepDetails = ({ gajamArea, onSubmit }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    surveyNum: '',
    landType: 'Agricultural',
    pricePerGajam: ''
  });

  // Dynamic pricing calculation
  const price = parseFloat(formData.pricePerGajam) || 0;
  const computedGajam = gajamArea > 0 ? gajamArea : 1000; // fallback if state lost
  const total = price * computedGajam;
  
  // Format to Indian system (Crores/Lakhs)
  let totalPriceFormatted = `₹ ${total.toLocaleString('en-IN')}`;
  if (total >= 10000000) {
    totalPriceFormatted = `₹ ${(total / 10000000).toFixed(2)} Cr`;
  } else if (total >= 100000) {
    totalPriceFormatted = `₹ ${(total / 100000).toFixed(2)} Lakhs`;
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (!formData.ownerName || !formData.surveyNum || !formData.pricePerGajam) {
      alert("Please fill all required fields.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
       <div>
         <label className="input-label">Title Holder Name</label>
         <input 
           name="ownerName"
           value={formData.ownerName}
           onChange={handleChange}
           className="input-field" 
           placeholder="As per Dharani/Registration" 
         />
       </div>

       <div style={{ display: 'flex', gap: '16px' }}>
         <div style={{ flex: 1 }}>
           <label className="input-label">Survey Number</label>
           <input 
             name="surveyNum"
             value={formData.surveyNum}
             onChange={handleChange}
             className="input-field" 
             placeholder="e.g. 123/A" 
           />
         </div>
         <div style={{ flex: 1 }}>
           <label className="input-label">Land Type</label>
           <select 
             name="landType"
             value={formData.landType}
             onChange={handleChange}
             className="input-field"
             style={{ appearance: 'none' }}
           >
             <option>Agricultural</option>
             <option>Commercial</option>
             <option>Open Plot</option>
           </select>
         </div>
       </div>

       <div>
         <label className="input-label">Price per Gajam (₹)</label>
         <input 
           name="pricePerGajam"
           type="number"
           value={formData.pricePerGajam}
           onChange={handleChange}
           className="input-field" 
           placeholder="0" 
         />
       </div>

       {/* Dynamic Output Box */}
       <div className="glass-panel" style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--accent-glow)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
           <div>
             <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Calculated Total Value</p>
             <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{totalPriceFormatted}</p>
           </div>
           <div style={{ textAlign: 'right' }}>
             <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Area</p>
             <p style={{ fontSize: '16px', fontWeight: 600 }}>{gajamArea.toFixed(0)} Gajam</p>
           </div>
         </div>
       </div>

       <button className="btn-primary" onClick={handleNext} style={{ marginTop: '16px' }}>
          Continue to Documents
       </button>
    </div>
  );
}

export default StepDetails;
