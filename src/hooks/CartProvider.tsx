import { useReducer, type ReactNode } from 'react';
import { CartContext, type CartContextType } from './cart-context';
import type { ItemPersonalizado } from '@/features/pedidos/types';

export type CartItem = {
  productoId: string;
  nombre: string;
  cantidad: number;
  precioBase: number;
  precioUnitario: number;
  itemsPersonalizados: ItemPersonalizado[];
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; index: number }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((_, i) => i !== action.index) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (index: number) => dispatch({ type: 'REMOVE_ITEM', index });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const total = calcTotal(state.items);
  const toRequest = () => ({
    productos: state.items.map((item) => ({
      productoId: item.productoId,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
      itemsPersonalizados: item.itemsPersonalizados,
    })),
  });

  const value: CartContextType = { items: state.items, addItem, removeItem, clearCart, total, toRequest };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
