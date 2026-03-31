import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageSquare, Send } from 'lucide-react';

const AIAssistantBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your AI Land Legal Guide. Type a question like "What is Gajam?" or "Is this land verified?"' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let aiResponse = "I am a simulated AI. Registration requires dual-party verification at the sub-registrar office.";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('gajam')) {
        aiResponse = "1 Gajam is equal to 1 Square Yard in Telangana/AP. 4840 Gajams make 1 Acre!";
      } else if (lower.includes('verified') || lower.includes('safe')) {
        aiResponse = "Properties marked with the Green Verified badge have had their Name and Survey Numbers checked against the mock registry.";
      } else if (lower.includes('buy') || lower.includes('step')) {
         aiResponse = "To buy land: 1) Verify documents. 2) Draft Sale Agreement. 3) Pay Token advance. 4) Execute final Deed at Registrar.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '100px', right: '16px', zIndex: 999 }}>
      
      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.8, y: 20 }}
             style={{ position: 'absolute', bottom: '60px', right: 0, width: '300px', height: '400px', background: 'var(--bg-elevated)', borderRadius: '24px', border: '1px solid var(--border-strong)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
           >
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Bot size={20} color="var(--accent-primary)" />
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>AI Land Copilot</span>
                 </div>
                 <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <X size={16} />
                 </button>
              </div>

              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 {messages.map((m, i) => (
                    <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', color: m.role === 'user' ? '#000' : '#fff', padding: '10px 14px', borderRadius: '16px', fontSize: '14px', maxWidth: '85%', borderBottomRightRadius: m.role === 'user' ? '4px' : '16px', borderBottomLeftRadius: m.role === 'ai' ? '4px' : '16px' }}>
                       {m.text}
                    </div>
                 ))}
              </div>

              <div style={{ padding: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
                 <input 
                   value={input}
                   onChange={e => setInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleSend()}
                   placeholder="Ask me anything..."
                   style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: 'none', padding: '10px 16px', borderRadius: '99px', color: '#fff', fontSize: '14px', outline: 'none' }}
                 />
                 <button onClick={handleSend} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Send size={16} color="#000" />
                 </button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-primary)', border: 'none', boxShadow: '0 8px 16px rgba(250, 204, 21, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
         {isOpen ? <X size={24} color="#000" /> : <MessageSquare size={24} color="#000" />}
      </motion.button>
    </div>
  );
};

export default AIAssistantBubble;
