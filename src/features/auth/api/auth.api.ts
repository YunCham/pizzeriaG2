import { clientesApi } from '@/features';
import type { LoginRequest, LoginResponse } from '../types';

export const authApi = {
  login: async ({ correo }: LoginRequest): Promise<LoginResponse> => {
    const clientes = await clientesApi.getAll();
    const cliente = clientes.find((c) => c.correo === correo);
    if (!cliente) {
      throw new Error('No se encontró un usuario con ese correo');
    }
    return cliente;
  },
};
