import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { verifyUser } from '../services/db';

interface AuthContextType {
  currentUser: { id: string } | null;
  login: (id: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (id: string, pass: string): Promise<boolean> => {
    const isValid = await verifyUser(id, pass);
    if (isValid) {
      setCurrentUser({ id });
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    window.location.hash = '#admin';
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
