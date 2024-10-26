import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { AuthState, LoginCredentials } from '../types/auth';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export function useAuth() {
  const [state, setState] = useState<AuthState>(initialState);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user, token } = await api.login(credentials);
      
      api.setToken(token);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Store token securely
      localStorage.setItem('auth_token', token);
      
      return user;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    api.clearToken();
    localStorage.removeItem('auth_token');
    setState(initialState);
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      api.setToken(token);
      const user = await api.getCurrentUser();
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      localStorage.removeItem('auth_token');
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      }));
    }
  }, []);

  return {
    ...state,
    login,
    logout,
    checkAuth,
  };
}