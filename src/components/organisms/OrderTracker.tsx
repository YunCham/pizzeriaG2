import type { EstadoPedido } from '@/features/pedidos/types';
import { StatusBadge } from '../molecules/StatusBadge';

const pasos: EstadoPedido[] = ['pendiente', 'preparando', 'listo', 'enviado', 'entregado'];

type OrderTrackerProps = {
  estadoActual: EstadoPedido;
};

export function OrderTracker({ estadoActual }: OrderTrackerProps) {
  const currentIndex = pasos.indexOf(estadoActual);

  if (estadoActual === 'rechazado') {
    return (
      <div className="order-tracker order-tracker--rejected">
        <p className="order-tracker__rejected-msg">Pedido rechazado por falta de ingredientes.</p>
      </div>
    );
  }

  return (
    <div className="order-tracker">
      <div className="order-tracker__steps">
        {pasos.map((paso, i) => {
          const isCompleted = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div
              key={paso}
              className={`order-tracker__step${isCompleted ? ' order-tracker__step--completed' : ''}${isCurrent ? ' order-tracker__step--current' : ''}`}
            >
              <div className="order-tracker__dot" />
              <StatusBadge estado={paso} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
