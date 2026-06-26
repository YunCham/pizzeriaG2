import { clientesApi as realClientesApi } from './clientes/api';
import { itemsApi as realItemsApi } from './items/api';
import { productosApi as realProductosApi } from './productos/api';
import { pedidosApi as realPedidosApi } from './pedidos/api';
import { mockClientesApi, mockItemsApi, mockProductosApi, mockPedidosApi } from '@/mocks/mock-api';

export type { Cliente, ClienteFormData } from './clientes/types';
export type { Item, ItemFormData } from './items/types';
export type { Producto, ProductoFormData } from './productos/types';
export type { Pedido, CrearPedidoRequest, EstadoPedido } from './pedidos/types';
export * from './pedidos/schemas';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const clientesApi = USE_MOCK ? mockClientesApi : realClientesApi;
export const itemsApi = USE_MOCK ? mockItemsApi : realItemsApi;
export const productosApi = USE_MOCK ? mockProductosApi : realProductosApi;
export const pedidosApi = USE_MOCK ? mockPedidosApi : realPedidosApi;
