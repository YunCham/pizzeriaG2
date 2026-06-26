export type EstadoPedido = 'pendiente' | 'rechazado' | 'preparando' | 'listo' | 'enviado' | 'entregado';

export type ItemPersonalizado = {
  itemId: string;
  nombre: string;
  cantidad: number;
};

export type ProductoPedido = {
  id: string;
  productoId: string;
  cantidad: number;
  precioUnitario: number;
  itemsPersonalizados: ItemPersonalizado[];
};

export type Pedido = {
  id: string;
  clienteId: string;
  direccion: string;
  total: number;
  estado: EstadoPedido;
  repartidorId: string | null;
  creadoEn: string;
  productos: ProductoPedido[];
};

export type PedidoFormData = Omit<Pedido, 'id' | 'creadoEn' | 'estado'> & {
  estado?: EstadoPedido;
};

export type CrearPedidoRequest = {
  clienteId: string;
  direccion: string;
  productos: Array<{
    productoId: string;
    cantidad: number;
    precioUnitario: number;
    itemsPersonalizados: ItemPersonalizado[];
  }>;
};
