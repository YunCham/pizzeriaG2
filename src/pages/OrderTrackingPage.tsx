import { useParams, Link } from 'react-router-dom';
import { usePedido } from '../hooks/usePedido';
import { OrderTracker } from '../components/organisms/OrderTracker';
import { Spinner } from '../components/atoms/Spinner';

export default function OrderTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const { pedido, loading, error } = usePedido(id);

  if (loading) return <Spinner />;

  if (error || !pedido) {
    return (
      <section className="page">
        <h1>Seguimiento del Pedido</h1>
        <p className="empty">No encontramos el pedido. {error instanceof Error ? error.message : ''}</p>
        <Link to="/">Volver al inicio</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Seguimiento del Pedido</h1>
      <p>Pedido: <strong>{pedido.id}</strong></p>
      <p>Dirección: {pedido.direccion}</p>
      <OrderTracker estadoActual={pedido.estado} />
      <div style={{ marginTop: 20 }}>
        <Link to="/">Volver al menú</Link>
      </div>
    </section>
  );
}
