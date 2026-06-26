import { useQuery } from '@tanstack/react-query';
import { productosApi } from '@/features';

export function useProducto(id: string | undefined) {
  const { data: producto, isLoading, error } = useQuery({
    queryKey: ['producto', id],
    queryFn: () => productosApi.getById(id!),
    enabled: !!id,
  });

  return { producto: producto ?? null, loading: isLoading, error };
}
