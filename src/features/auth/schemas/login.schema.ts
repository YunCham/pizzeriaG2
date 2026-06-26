import { z } from 'zod';

export const loginSchema = z.object({
  correo: z
    .string()
    .email('Ingresa un correo electrónico válido'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
