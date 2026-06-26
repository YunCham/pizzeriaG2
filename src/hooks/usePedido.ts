import { useQuery } from '@tanstack/react-query';
import { pedidosApi } from '@/features';

export function usePedido(id: string | undefined) {
  const { data: pedido, isLoading, error } = useQuery({
    queryKey: ['pedido', id],
    queryFn: () => pedidosApi.getById(id!),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3000;
      const noFinal = ['pendiente', 'preparando', 'listo', 'enviado'];
      return noFinal.includes(data.estado) ? 3000 : false;
    },
  });

  return { pedido: pedido ?? null, loading: isLoading, error };
}
