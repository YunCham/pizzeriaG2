import { createContext } from 'react';
import type { CartItem } from './CartProvider';

export type CartContextType = {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  toRequest: () => {
    productos: Array<{
      productoId: string;
      cantidad: number;
      precioUnitario: number;
      itemsPersonalizados: Array<{ itemId: string; nombre: string; cantidad: number }>;
    }>;
  };
};

export const CartContext = createContext<CartContextType | null>(null);
