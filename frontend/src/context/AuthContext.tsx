import * as React from 'react';
import { apiClient } from '@/lib/api-client';
import type { User, AuthResponse } from '@/features/auth/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadUser = React.useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await apiClient.get('/user');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('auth_token');
      delete apiClient.defaults.headers.common['Authorization'];
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (data: any) => {
    const response = await apiClient.post<AuthResponse>('/login', data);
    const { access_token, user } = response.data;
    localStorage.setItem('auth_token', access_token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setUser(user);
  };

  const register = async (data: any) => {
    const response = await apiClient.post<AuthResponse>('/register', data);
    const { access_token, user } = response.data;
    localStorage.setItem('auth_token', access_token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setUser(user);
  };

  const logout = async () => {
    try {
      await apiClient.post('/logout');
    } finally {
      localStorage.removeItem('auth_token');
      delete apiClient.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
