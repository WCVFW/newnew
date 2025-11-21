import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN' | 'EMPLOYEE';
  kyc_status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthContextType {
  auth: AuthState;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
  });

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null });
  }, []);

  const refreshUser = useCallback(async () => {
    if (!auth.token) return;
    try {
      const { data } = await api.get('/auth/me');
      setAuth((prev) => ({ ...prev, user: data }));
    } catch (error) {
      console.error("Session invalid, logging out:", error);
      // This is the crucial part: if fetching the user fails, the token is bad. Log out.
      logout();
    }
  }, [auth.token, logout]);

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    setAuth({ user: null, token });
    await refreshUser();
  };

  useEffect(() => {
    if (auth.token && !auth.user) {
      refreshUser();
    }
  }, [auth.token, auth.user, refreshUser]);

  const value = { auth, login, logout, refreshUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};