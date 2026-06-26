import { Badge } from '../atoms/Badge';
import type { EstadoPedido } from '@/features/pedidos/types';

const estadoConfig: Record<EstadoPedido, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default' }> = {
  pendiente: { label: 'Pendiente', variant: 'warning' },
  rechazado: { label: 'Rechazado', variant: 'danger' },
  preparando: { label: 'Preparando', variant: 'info' },
  listo: { label: 'Listo', variant: 'info' },
  enviado: { label: 'Enviado', variant: 'success' },
  entregado: { label: 'Entregado', variant: 'success' },
};

type StatusBadgeProps = {
  estado: EstadoPedido;
};

export function StatusBadge({ estado }: StatusBadgeProps) {
  const config = estadoConfig[estado];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
