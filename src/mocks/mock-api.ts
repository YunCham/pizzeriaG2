import type { Cliente, ClienteFormData } from '@/features/clientes/types';
import type { Item, ItemFormData } from '@/features/items/types';
import type { Producto, ProductoFormData } from '@/features/productos/types';
import type { Pedido, CrearPedidoRequest, EstadoPedido } from '@/features/pedidos/types';
import { db, getAllPedidos, getPedidoById, getPedidosByClienteId, createPedido, updatePedidoEstado, asignarRepartidor } from './data';

function delay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), 200));
}

export const mockClientesApi = {
  getAll: () => delay([...db.clientes]),
  getById: (id: string) => delay(db.clientes.find((c: Cliente) => c.id === id)!),
  create: (data: ClienteFormData) => {
    const nuevo = { id: `cli-${Date.now()}`, ...data };
    db.clientes = [...db.clientes, nuevo];
    return delay(nuevo);
  },
  update: (id: string, data: Partial<ClienteFormData>) => {
    db.clientes = db.clientes.map((c: Cliente) => c.id === id ? { ...c, ...data } as Cliente : c);
    return delay(db.clientes.find((c: Cliente) => c.id === id)!);
  },
  delete: (id: string) => {
    db.clientes = db.clientes.filter((c: Cliente) => c.id !== id);
    return delay(undefined);
  },
};

export const mockItemsApi = {
  getAll: () => delay([...db.items]),
  getById: (id: string) => delay(db.items.find((i: Item) => i.id === id)!),
  create: (data: ItemFormData) => {
    const nuevo = { id: `item-${Date.now()}`, ...data };
    db.items = [...db.items, nuevo];
    return delay(nuevo);
  },
  update: (id: string, data: Partial<ItemFormData>) => {
    db.items = db.items.map((i: Item) => i.id === id ? { ...i, ...data } as Item : i);
    return delay(db.items.find((i: Item) => i.id === id)!);
  },
  delete: (id: string) => {
    db.items = db.items.filter((i: Item) => i.id !== id);
    return delay(undefined);
  },
};

export const mockProductosApi = {
  getAll: () => delay([...db.productos]),
  getById: (id: string) => delay(db.productos.find((p: Producto) => p.id === id)!),
  create: (data: ProductoFormData) => {
    const nuevo = { id: `prod-${Date.now()}`, ...data };
    db.productos = [...db.productos, nuevo];
    return delay(nuevo);
  },
  update: (id: string, data: Partial<ProductoFormData>) => {
    db.productos = db.productos.map((p: Producto) => p.id === id ? { ...p, ...data } as Producto : p);
    return delay(db.productos.find((p: Producto) => p.id === id)!);
  },
  delete: (id: string) => {
    db.productos = db.productos.filter((p: Producto) => p.id !== id);
    return delay(undefined);
  },
};

export const mockPedidosApi = {
  getAll: () => getAllPedidos(),
  getById: (id: string) => getPedidoById(id) as Promise<Pedido>,
  getByClienteId: (clienteId: string) => getPedidosByClienteId(clienteId) as Promise<Pedido[]>,
  create: (data: CrearPedidoRequest) => createPedido(data) as Promise<Pedido>,
  updateEstado: (id: string, estado: EstadoPedido) => updatePedidoEstado(id, estado) as Promise<Pedido>,
  asignarRepartidor: (id: string, repartidorId: string) => asignarRepartidor(id, repartidorId) as Promise<Pedido>,
  update: (id: string, _data: unknown) => getPedidoById(id) as Promise<Pedido>,
  delete: (id: string) => {
    const old = db.pedidos;
    db.pedidos = old.filter((p: Pedido) => p.id !== id);
    return delay(undefined);
  },
};
