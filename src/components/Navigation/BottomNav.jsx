import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USER_ROLES } from '../../data/mockData';
import { Compass, Bookmark, PlusSquare, User, MessageSquare } from 'lucide-react';

const BottomNav = ({ onLoginClick }) => {
  const { getRole } = useAuth();
  const role = getRole();

  if (role === MOCK_USER_ROLES.ADMIN) return null; // Admin has a different layout

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '80px',
      background: 'rgba(18, 18, 18, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: '20px', // iPhone home indicator padding
      zIndex: 'var(--z-bottom-nav, 20)'
    }}>
      <NavItem to="/" icon={<Compass size={24} />} label="Explore" />
      
      {role === MOCK_USER_ROLES.SELLER ? (
         <>
           <NavItem to="/seller" icon={<PlusSquare size={24} />} label="Dashboard" />
           <NavItem to="/inbox" icon={<MessageSquare size={24} />} label="Inbox" />
         </>
      ) : (
         <>
           <NavItem to="/saved" icon={<Bookmark size={24} />} label="Saved" onClick={(e) => {
             if (role === MOCK_USER_ROLES.GUEST) {
               e.preventDefault();
               onLoginClick();
             }
           }} />
           <NavItem to="/inbox" icon={<MessageSquare size={24} />} label="Inbox" onClick={(e) => {
             if (role === MOCK_USER_ROLES.GUEST) {
               e.preventDefault();
               onLoginClick();
             }
           }} />
         </>
      )}

      {role === MOCK_USER_ROLES.GUEST ? (
        <button className="btn-ghost" onClick={onLoginClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textDecoration: 'none', color: 'var(--text-secondary)' }}>
          <User size={24} />
          <span style={{ fontSize: '12px' }}>Login</span>
        </button>
      ) : (
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
      )}
    </div>
  );
};

const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink 
    to={to} 
    onClick={onClick}
    style={({ isActive }) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      textDecoration: 'none',
      color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
      transition: 'color 0.2s',
      pointerEvents: isActive ? 'none' : 'auto'
    })}
  >
    {({ isActive }) => (
      <>
        {React.cloneElement(icon, { color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)' })}
        <span style={{ fontSize: '12px', fontWeight: 500 }}>{label}</span>
      </>
    )}
  </NavLink>
);

export default BottomNav;
