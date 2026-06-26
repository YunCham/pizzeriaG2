import { useNavigate, Link } from 'react-router-dom';
import { useCarrito } from '../hooks/useCarrito';
import { useCrearPedido } from '../hooks/useCrearPedido';
import { useAuth } from '../hooks/auth-context';
import { useToast } from '../hooks/useToast';
import { formatError } from '../lib/format-error';
import { clientesApi } from '@/features';
import { CheckoutForm } from '../components/organisms/CheckoutForm';
import { Button } from '../components/atoms/Button';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, toRequest } = useCarrito();
  const { crearPedido, loading } = useCrearPedido();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [direccion, setDireccion] = useState('');

  if (items.length === 0) {
    return (
      <section className="page">
        <h1>Confirmar Pedido</h1>
        <p className="empty">Agrega productos al carrito primero.</p>
      </section>
    );
  }

  const handleSubmit = async (values?: { nombre: string; direccion: string; correo: string }) => {
    setError(null);
    try {
      const { productos } = toRequest();
      let clienteId = user?.id;

      if (!clienteId && values) {
        addToast('pending', 'Registrando tus datos...');
        const nuevoCliente = await clientesApi.create({
          nombre: values.nombre,
          apellido: '',
          correo: values.correo,
        });
        clienteId = nuevoCliente.id;
      }

      if (!clienteId) {
        setError('Debes iniciar sesión o completar tus datos');
        addToast('error', 'Debes iniciar sesión o completar tus datos');
        return;
      }

      addToast('pending', 'Preparando tu pedido...');
      const pedido = await crearPedido({
        clienteId,
        direccion: values ? values.direccion : direccion,
        productos,
      });
      addToast('success', 'Pedido confirmado. ¡Lo estamos preparando!');
      navigate(`/pedido/${pedido.id}`);
    } catch (err: unknown) {
      const msg = formatError(err);
      setError(msg);
      addToast('error', msg);
    }
  };

  if (user) {
    return (
      <section className="page">
        <h1>Confirmar Pedido</h1>
        {error && <div className="page__error">{error}</div>}
        <div className="checkout-user">
          <p><strong>Cliente:</strong> {user.nombre} {user.apellido}</p>
          <p><strong>Email:</strong> {user.correo}</p>
          <div className="input-group">
            <label className="input-group__label" htmlFor="direccion">Dirección de entrega</label>
            <input
              id="direccion"
              className="input-group__input"
              name="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Calle y número"
            />
          </div>
          <div className="checkout-user__actions">
            <Button onClick={() => handleSubmit()} loading={loading} disabled={!direccion.trim()}>
              Confirmar pedido
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Confirmar Pedido</h1>
      {error && <div className="page__error">{error}</div>}
      <p className="checkout-hint">
        ¿Ya tienes cuenta? <Link to="/iniciar-sesion" state={{ from: '/checkout' }}>Inicia sesión</Link>
      </p>
      <CheckoutForm onSubmit={handleSubmit} loading={loading} />
    </section>
  );
}