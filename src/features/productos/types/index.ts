export type ItemProducto = {
  itemId: string;
  nombre: string;
  cantidad: number;
};

export type Producto = {
  id: string;
  nombre: string;
  precio: number;
  itemsBase: ItemProducto[];
};

export type ProductoFormData = Omit<Producto, 'id'>;
