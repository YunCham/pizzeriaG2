import { createContext, useContext } from 'react';

export type ToastType = 'success' | 'error' | 'pending';

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};

export type ToastContextType = {
  toasts: ToastItem[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
