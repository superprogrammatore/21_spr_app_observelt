import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'observeit-authenticated';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Controlla se l'utente era già autenticato
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    // Rimuovi anche il flag dell'intro per mostrarlo di nuovo al prossimo login
    localStorage.removeItem('observeit-intro-seen');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
