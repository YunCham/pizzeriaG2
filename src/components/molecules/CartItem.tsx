import type { CartItem } from '@/hooks/CartProvider';

type CartItemProps = {
  item: CartItem;
  onRemove?: () => void;
};

export function CartItemView({ item, onRemove }: CartItemProps) {
  const extrasCount = item.itemsPersonalizados.length - (item.precioBase > 0 ? 1 : 0);

  return (
    <div className="cart-item">
      <div className="cart-item__info">
        <div className="cart-item__header">
          <span className="cart-item__name">{item.nombre}</span>
          <span className="cart-item__qty">x{item.cantidad}</span>
        </div>
        <div className="cart-item__detail">
          <span>Base: ${item.precioBase}</span>
          {extrasCount > 0 && (
            <span> + {extrasCount} extra{extrasCount > 1 ? 's' : ''} ${extrasCount * 5}</span>
          )}
        </div>
        <div className="cart-item__subtotal">
          ${item.precioUnitario * item.cantidad}
        </div>
      </div>
      {onRemove && (
        <button type="button" className="cart-item__remove" onClick={onRemove}>
          Eliminar
        </button>
      )}
    </div>
  );
}
