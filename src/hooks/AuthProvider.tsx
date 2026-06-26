import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './auth-context';
import { authApi } from '@/features/auth/api';
import type { Cliente } from '@/features/clientes/types';

const STORAGE_KEY = 'pizzeria_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  // Cast necesario: JSON.parse devuelve unknown, envuelto en try/catch por si el
  // dato en localStorage está corrupto o fue modificado externamente
  const [user, setUser] = useState<Cliente | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Cliente) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (correo: string) => {
    setLoading(true);
    setError(null);
    try {
      const cliente = await authApi.login({ correo });
      setUser(cliente);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}