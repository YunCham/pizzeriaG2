import { Link } from 'react-router-dom';
import { useCarrito } from '../hooks/useCarrito';
import { useToast } from '../hooks/useToast';
import { CartSummary } from '../components/organisms/CartSummary';
import { Button } from '../components/atoms/Button';

export default function CartPage() {
  const { items, total, removeItem } = useCarrito();
  const { addToast } = useToast();

  const handleRemove = (index: number) => {
    const item = items[index];
    removeItem(index);
    if (item) {
      addToast('error', `${item.nombre} eliminada del carrito`);
    }
  };

  return (
    <section className="page">
      <h1>Tu Carrito</h1>
      <CartSummary items={items} total={total} onRemoveItem={handleRemove} />
      {items.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Link to="/checkout">
            <Button>Ir a pagar — ${total}</Button>
          </Link>
        </div>
      )}
    </section>
  );
}