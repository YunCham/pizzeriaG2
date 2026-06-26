export type Cliente = {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
};

export type ClienteFormData = Omit<Cliente, 'id'>;
