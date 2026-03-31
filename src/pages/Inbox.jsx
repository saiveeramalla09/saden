import React from 'react';
import { User, CheckCheck, Clock } from 'lucide-react';

const Inbox = () => {
  const conversations = [
    { id: 1, user: 'Prakash Reddy', prop: '5 Acres Shankarpalli', msg: 'Is the price partially negotiable?', time: '2m ago', unread: true },
    { id: 2, user: 'Srinivas Rao', prop: '1200 Sq.Yds Commercial', msg: 'I will be visiting the plot tomorrow morning.', time: '1h ago', unread: false },
    { id: 3, user: 'Admin Review', prop: 'Verification Team', msg: 'Your deed mismatch requires additional proofs.', time: '1d ago', unread: false }
  ];

  return (
    <div style={{ padding: '24px', paddingBottom: '120px' }}>
      <h2 className="text-gradient" style={{ marginBottom: '24px' }}>Communications</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
         {conversations.map(chat => (
            <div key={chat.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-elevated)', padding: '16px', borderRadius: '20px', border: chat.unread ? '1px solid var(--accent-glow)' : 'auto' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={24} color={chat.unread ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
               </div>
               
               <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                     <h4 style={{ fontWeight: 600, fontSize: '15px' }}>{chat.user}</h4>
                     <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {chat.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--accent-primary)', marginBottom: '4px' }}>Re: {chat.prop}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <p style={{ fontSize: '14px', color: chat.unread ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                       {chat.msg}
                     </p>
                     {!chat.unread && <CheckCheck size={16} color="var(--success-base)" />}
                  </div>
               </div>
               
               {chat.unread && <div style={{ width: '10px', height: '10px', background: 'var(--accent-primary)', borderRadius: '50%' }} />}
            </div>
         ))}
      </div>
    </div>
  );
};

export default Inbox;
