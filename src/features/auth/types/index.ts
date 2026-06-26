import type { Cliente } from '@/features/clientes/types';

export type LoginRequest = {
  correo: string;
};

export type LoginResponse = Cliente;
