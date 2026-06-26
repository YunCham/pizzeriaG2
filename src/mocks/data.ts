import type { Cliente } from '@/features/clientes/types';
import type { Item } from '@/features/items/types';
import type { Producto } from '@/features/productos/types';
import type { Pedido, CrearPedidoRequest } from '@/features/pedidos/types';

const clientesIniciales: Cliente[] = [
  { id: 'cli-001', nombre: 'Carlos', apellido: 'López', correo: 'carlos@email.com' },
  { id: 'cli-002', nombre: 'María', apellido: 'García', correo: 'maria@email.com' },
  { id: 'cli-003', nombre: 'Pedro', apellido: 'Martínez', correo: 'pedro@email.com' },
];

const itemsIniciales: Item[] = [
  { id: 'item-001', nombre: 'Queso Mozzarella', cantidadDisponible: 50 },
  { id: 'item-002', nombre: 'Jamón', cantidadDisponible: 30 },
  { id: 'item-003', nombre: 'Pepperoni', cantidadDisponible: 40 },
  { id: 'item-004', nombre: 'Champiñones', cantidadDisponible: 25 },
  { id: 'item-005', nombre: 'Pimiento', cantidadDisponible: 20 },
  { id: 'item-006', nombre: 'Cebolla', cantidadDisponible: 35 },
  { id: 'item-007', nombre: 'Aceitunas', cantidadDisponible: 30 },
  { id: 'item-008', nombre: 'Salsa de Tomate', cantidadDisponible: 60 },
  { id: 'item-009', nombre: 'Orégano', cantidadDisponible: 45 },
  { id: 'item-010', nombre: 'Piña', cantidadDisponible: 15 },
];

const productosIniciales: Producto[] = [
  {
    id: 'prod-001', nombre: 'Pizza Margherita', precio: 89,
    itemsBase: [
      { itemId: 'item-008', nombre: 'Salsa de Tomate', cantidad: 1 },
      { itemId: 'item-001', nombre: 'Queso Mozzarella', cantidad: 2 },
    ],
  },
  {
    id: 'prod-002', nombre: 'Pizza Pepperoni', precio: 109,
    itemsBase: [
      { itemId: 'item-008', nombre: 'Salsa de Tomate', cantidad: 1 },
      { itemId: 'item-001', nombre: 'Queso Mozzarella', cantidad: 2 },
      { itemId: 'item-003', nombre: 'Pepperoni', cantidad: 1 },
    ],
  },
  {
    id: 'prod-003', nombre: 'Pizza Jamón y Queso', precio: 99,
    itemsBase: [
      { itemId: 'item-008', nombre: 'Salsa de Tomate', cantidad: 1 },
      { itemId: 'item-001', nombre: 'Queso Mozzarella', cantidad: 2 },
      { itemId: 'item-002', nombre: 'Jamón', cantidad: 1 },
    ],
  },
  {
    id: 'prod-004', nombre: 'Pizza Vegetariana', precio: 99,
    itemsBase: [
      { itemId: 'item-008', nombre: 'Salsa de Tomate', cantidad: 1 },
      { itemId: 'item-001', nombre: 'Queso Mozzarella', cantidad: 1 },
      { itemId: 'item-004', nombre: 'Champiñones', cantidad: 1 },
      { itemId: 'item-005', nombre: 'Pimiento', cantidad: 1 },
      { itemId: 'item-006', nombre: 'Cebolla', cantidad: 1 },
    ],
  },
  {
    id: 'prod-005', nombre: 'Pizza Hawaiana', precio: 109,
    itemsBase: [
      { itemId: 'item-008', nombre: 'Salsa de Tomate', cantidad: 1 },
      { itemId: 'item-001', nombre: 'Queso Mozzarella', cantidad: 2 },
      { itemId: 'item-002', nombre: 'Jamón', cantidad: 1 },
      { itemId: 'item-010', nombre: 'Piña', cantidad: 1 },
    ],
  },
];

const pedidosIniciales: Pedido[] = [
  {
    id: 'ped-001', clienteId: 'cli-001', direccion: 'Av. Roca y Coronado #456',
    total: 178, estado: 'entregado', repartidorId: 'rep-001',
    creadoEn: '2026-06-24T18:30:00.000Z',
    productos: [{
      id: 'pp-001', productoId: 'prod-001', cantidad: 2, precioUnitario: 89,
      itemsPersonalizados: [
        { itemId: 'item-001', nombre: 'Queso Mozzarella', cantidad: 2 },
        { itemId: 'item-008', nombre: 'Salsa de Tomate', cantidad: 1 },
      ],
    }],
  },
  {
    id: 'ped-002', clienteId: 'cli-002', direccion: 'Calle 7 #123',
    total: 109, estado: 'preparando', repartidorId: null,
    creadoEn: '2026-06-25T12:00:00.000Z',
    productos: [{
      id: 'pp-002', productoId: 'prod-002', cantidad: 1, precioUnitario: 109,
      itemsPersonalizados: [
        { itemId: 'item-001', nombre: 'Queso Mozzarella', cantidad: 2 },
        { itemId: 'item-003', nombre: 'Pepperoni', cantidad: 2 },
      ],
    }],
  },
];

let pedidos = [...pedidosIniciales];

export const db = {
  clientes: [...clientesIniciales],
  items: [...itemsIniciales],
  productos: [...productosIniciales],
  get pedidos() { return pedidos; },
  set pedidos(value: Pedido[]) { pedidos = value; },
};

function delay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), 150));
}

export async function getAllPedidos(): Promise<Pedido[]> {
  return delay([...pedidos]);
}

export async function getPedidoById(id: string): Promise<Pedido | undefined> {
  return delay(pedidos.find((p) => p.id === id));
}

export async function getPedidosByClienteId(clienteId: string): Promise<Pedido[]> {
  return delay(pedidos.filter((p) => p.clienteId === clienteId));
}

export async function createPedido(data: CrearPedidoRequest): Promise<Pedido> {
  const total = data.productos.reduce((sum, p) => sum + p.precioUnitario * p.cantidad, 0);
  const nuevo: Pedido = {
    id: `ped-${Date.now()}`,
    clienteId: data.clienteId,
    direccion: data.direccion,
    total,
    estado: 'pendiente',
    repartidorId: null,
    creadoEn: new Date().toISOString(),
    productos: data.productos.map((p, i) => ({
      id: `pp-${Date.now()}-${i}`,
      productoId: p.productoId,
      cantidad: p.cantidad,
      precioUnitario: p.precioUnitario,
      itemsPersonalizados: p.itemsPersonalizados,
    })),
  };
  pedidos = [...pedidos, nuevo];
  return delay(nuevo);
}

export async function updatePedidoEstado(id: string, estado: Pedido['estado']): Promise<Pedido> {
  pedidos = pedidos.map((p) => (p.id === id ? { ...p, estado } : p));
  const updated = pedidos.find((p) => p.id === id);
  if (!updated) throw new Error('Pedido no encontrado');
  return delay(updated);
}

export async function asignarRepartidor(id: string, repartidorId: string): Promise<Pedido> {
  pedidos = pedidos.map((p) =>
    p.id === id ? { ...p, repartidorId, estado: 'enviado' as const } : p
  );
  const updated = pedidos.find((p) => p.id === id);
  if (!updated) throw new Error('Pedido no encontrado');
  return delay(updated);
}
