import { useContext } from 'react';
import { CartContext } from './cart-context';

export function useCarrito() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCarrito must be used within CartProvider');
  return ctx;
}
