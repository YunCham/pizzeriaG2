import { httpClient } from '@/http';
import type { Pedido, PedidoFormData, CrearPedidoRequest, EstadoPedido } from '../types';

export const pedidosApi = {
  getAll: async (): Promise<Pedido[]> => {
    const response = await httpClient.get('/pedidos');
    return response.data;
  },

  getById: async (id: string): Promise<Pedido> => {
    const response = await httpClient.get(`/pedidos/${id}`);
    return response.data;
  },

  getByClienteId: async (clienteId: string): Promise<Pedido[]> => {
    const response = await httpClient.get('/pedidos', {
      params: { clienteId },
    });
    return response.data;
  },

  create: async (data: CrearPedidoRequest): Promise<Pedido> => {
    const total = data.productos.reduce((sum, p) => sum + p.precioUnitario * p.cantidad, 0);
    const response = await httpClient.post('/pedidos', {
      ...data,
      total,
      estado: 'pendiente',
      repartidorId: null,
      creadoEn: new Date().toISOString(),
    });
    return response.data;
  },

  updateEstado: async (id: string, estado: EstadoPedido): Promise<Pedido> => {
    const response = await httpClient.patch(`/pedidos/${id}`, { estado });
    return response.data;
  },

  asignarRepartidor: async (id: string, repartidorId: string): Promise<Pedido> => {
    const response = await httpClient.patch(`/pedidos/${id}`, { repartidorId });
    return response.data;
  },

  update: async (id: string, data: Partial<PedidoFormData>): Promise<Pedido> => {
    const response = await httpClient.patch(`/pedidos/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await httpClient.delete(`/pedidos/${id}`);
  },
};
