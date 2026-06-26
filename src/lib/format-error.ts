import { ZodError } from 'zod';

export function formatError(err: unknown): string {
  if (err instanceof ZodError) {
    const first = err.issues[0];
    if (first) return first.message;
    return 'Error de validación';
  }
  if (err instanceof Error) return err.message;
  return 'Error inesperado';
}
