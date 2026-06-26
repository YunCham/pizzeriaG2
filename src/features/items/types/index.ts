export type Item = {
  id: string;
  nombre: string;
  cantidadDisponible: number;
};

export type ItemFormData = Omit<Item, 'id'>;
