import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem('user_name'));
  const navigate = useNavigate();

  const login = (name: string) => {
    localStorage.setItem('user_name', name);
    setUser(name);
    navigate('/dashboard');
  };
  const logout = () => {
    localStorage.removeItem('user_name');
    setUser(null);
    navigate('/login');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}