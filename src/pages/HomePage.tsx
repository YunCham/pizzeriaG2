import { useProductos } from '../hooks/useProductos';
import { ProductGrid } from '../components/organisms/ProductGrid';

export default function HomePage() {
  const { productos, loading, error } = useProductos();

  if (error) {
    return (
      <section className="page">
        <h1>Nuestras Pizzas</h1>
        <p className="empty">Error al cargar el menú. Intenta de nuevo.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Nuestras Pizzas</h1>
      <p>Elige tu pizza favorita y personalízala a tu gusto.</p>
      <ProductGrid productos={productos} loading={loading} />
    </section>
  );
}
