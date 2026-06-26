import { httpClient } from '@/http';
import type { Cliente, ClienteFormData } from '../types';

export const clientesApi = {
  getAll: async (): Promise<Cliente[]> => {
    const response = await httpClient.get('/clientes');
    return response.data;
  },

  getById: async (id: string): Promise<Cliente> => {
    const response = await httpClient.get(`/clientes/${id}`);
    return response.data;
  },

  create: async (data: ClienteFormData): Promise<Cliente> => {
    const response = await httpClient.post('/clientes', data);
    return response.data;
  },

  update: async (id: string, data: Partial<ClienteFormData>): Promise<Cliente> => {
    const response = await httpClient.patch(`/clientes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await httpClient.delete(`/clientes/${id}`);
  },
};
