import React, { createContext, useContext, useState } from 'react';
import { MOCK_USER_ROLES } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check local storage for persistent simulated session
    const storedUser = localStorage.getItem('saden_user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
         console.error("Failed to parse user session");
      }
    }
    return null;
  });
  const [isLoading] = useState(false);

  const login = (userData) => {
    // Ensure the userData includes a 'role'
    setUser(userData);
    localStorage.setItem('saden_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('saden_user');
  };

  const getRole = () => user?.role || MOCK_USER_ROLES.GUEST;

  return (
    <AuthContext.Provider value={{ user, login, logout, getRole, isLoading, MOCK_USER_ROLES }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
