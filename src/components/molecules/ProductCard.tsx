import { Link } from 'react-router-dom';
import type { Producto } from '@/features/productos/types';

type ProductCardProps = {
  producto: Producto;
};

export function ProductCard({ producto }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__body">
        <h3 className="product-card__name">{producto.nombre}</h3>
        <p className="product-card__price">${producto.precio}</p>
        <p className="product-card__items">
          {producto.itemsBase.map((i) => i.nombre).join(', ')}
        </p>
      </div>
      <Link to={`/producto/${producto.id}`} className="product-card__action">
        Personalizar
      </Link>
    </article>
  );
}
