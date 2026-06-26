import type { Producto } from '@/features/productos/types';
import { ProductCard } from '../molecules/ProductCard';

type ProductGridProps = {
  productos: Producto[];
  loading?: boolean;
};

export function ProductGrid({ productos, loading }: ProductGridProps) {
  if (loading) {
    return <p className="loading">Cargando menú...</p>;
  }

  if (productos.length === 0) {
    return <p className="empty">No hay productos disponibles.</p>;
  }

  return (
    <div className="product-grid">
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  );
}
