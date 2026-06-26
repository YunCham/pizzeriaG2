import type { CartItem } from '@/hooks/CartProvider';
import { CartItemView } from '../molecules/CartItem';

type CartSummaryProps = {
  items: CartItem[];
  total: number;
  onRemoveItem?: (index: number) => void;
};

export function CartSummary({ items, total, onRemoveItem }: CartSummaryProps) {
  if (items.length === 0) {
    return <p className="empty">Tu carrito está vacío.</p>;
  }

  return (
    <div className="cart-summary">
      <h2>Resumen del pedido</h2>
      {items.map((item, i) => (
        <CartItemView
          key={`${item.productoId}-${i}`}
          item={item}
          onRemove={onRemoveItem ? () => onRemoveItem(i) : undefined}
        />
      ))}
      <div className="cart-summary__total">
        <strong>Total:</strong> ${total}
      </div>
    </div>
  );
}
