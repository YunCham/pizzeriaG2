import { useMutation } from '@tanstack/react-query';
import { pedidosApi } from '@/features';
import type { CrearPedidoRequest, Pedido } from '@/features/pedidos/types';
import { crearPedidoSchema } from '@/features/pedidos/schemas';
import { useCarrito } from './useCarrito';

export function useCrearPedido() {
  const { clearCart } = useCarrito();

  const mutation = useMutation({
    mutationFn: (data: CrearPedidoRequest) => {
      const validated = crearPedidoSchema.parse(data);
      return pedidosApi.create(validated);
    },
    onSuccess: () => {
      clearCart();
    },
  });

  return {
    crearPedido: mutation.mutateAsync,
    pedido: mutation.data as Pedido | undefined,
    loading: mutation.isPending,
    error: mutation.error,
  };
}
