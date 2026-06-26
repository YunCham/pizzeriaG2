import { createContext, useContext } from 'react';
import type { Cliente } from '@/features/clientes/types';

export type AuthContextType = {
  user: Cliente | null;
  login: (correo: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
