import { httpClient } from '@/http';
import type { Producto, ProductoFormData } from '../types';

export const productosApi = {
  getAll: async (): Promise<Producto[]> => {
    const response = await httpClient.get('/productos');
    return response.data;
  },

  getById: async (id: string): Promise<Producto> => {
    const response = await httpClient.get(`/productos/${id}`);
    return response.data;
  },

  create: async (data: ProductoFormData): Promise<Producto> => {
    const response = await httpClient.post('/productos', data);
    return response.data;
  },

  update: async (id: string, data: Partial<ProductoFormData>): Promise<Producto> => {
    const response = await httpClient.patch(`/productos/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await httpClient.delete(`/productos/${id}`);
  },
};
