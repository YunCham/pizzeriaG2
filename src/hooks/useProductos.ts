import { useQuery } from '@tanstack/react-query';
import { productosApi } from '@/features';

export function useProductos() {
  const { data: productos = [], isLoading, error } = useQuery({
    queryKey: ['productos'],
    queryFn: () => productosApi.getAll(),
  });

  return { productos, loading: isLoading, error };
}
