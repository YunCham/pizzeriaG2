import { httpClient } from '@/http';
import type { Item, ItemFormData } from '../types';

export const itemsApi = {
  getAll: async (): Promise<Item[]> => {
    const response = await httpClient.get('/items');
    return response.data;
  },

  getById: async (id: string): Promise<Item> => {
    const response = await httpClient.get(`/items/${id}`);
    return response.data;
  },

  create: async (data: ItemFormData): Promise<Item> => {
    const response = await httpClient.post('/items', data);
    return response.data;
  },

  update: async (id: string, data: Partial<ItemFormData>): Promise<Item> => {
    const response = await httpClient.patch(`/items/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await httpClient.delete(`/items/${id}`);
  },
};
