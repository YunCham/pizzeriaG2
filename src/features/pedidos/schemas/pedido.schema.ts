import { z } from 'zod';

export const itemPersonalizadoSchema = z.object({
  itemId: z.string().min(1, 'El ingrediente necesita un identificador'),
  nombre: z.string().min(1, 'El ingrediente debe tener un nombre'),
  cantidad: z.number().int().positive('La cantidad del ingrediente debe ser mayor a cero'),
});

export const productoPedidoSchema = z.object({
  productoId: z.string().min(1, 'El producto no se reconoce'),
  cantidad: z.number().int().positive('Debes pedir al menos una pizza de este tipo'),
  precioUnitario: z.number().nonnegative('El precio no puede ser negativo'),
  itemsPersonalizados: z.array(itemPersonalizadoSchema),
});

export const crearPedidoSchema = z.object({
  clienteId: z.string().min(1, 'No se ha identificado al cliente'),
  direccion: z
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres'),
  productos: z.array(productoPedidoSchema).min(1, 'Agrega al menos un producto al pedido'),
});

export type CrearPedidoSchema = z.infer<typeof crearPedidoSchema>;
