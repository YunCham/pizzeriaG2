import { test, expect } from '@playwright/test';

test.describe('Flujo completo de pedido', () => {
  test('muestra el catálogo de pizzas', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Nuestras Pizzas/i })).toBeVisible();
    await expect(page.getByText('Pizza Margherita')).toBeVisible();
  });

  test('navega a personalizar y muestra precio en el botón', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Personalizar').first().click();
    await expect(page.getByRole('heading', { name: /Pizza Margherita/i })).toBeVisible();
    await expect(page.getByText('Base de la pizza')).toBeVisible();
    await expect(page.getByText('Extras disponibles')).toBeVisible();
    const btn = page.getByRole('button', { name: /Agregar al carrito/i });
    await expect(btn).toBeVisible();
  });

  test('flujo completo: seleccionar, carrito, checkout y tracking', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Personalizar').first().click();
    await page.getByRole('button', { name: /Agregar al carrito/i }).click();

    await expect(page.getByRole('heading', { name: /Tu Carrito/i })).toBeVisible();
    await expect(page.getByText('$')).toBeVisible();

    await page.getByRole('button', { name: /Ir a pagar/i }).click();
    await expect(page.getByRole('heading', { name: /Confirmar Pedido/i })).toBeVisible();

    await page.getByLabel(/Nombre/i).fill('Test User');
    await page.getByLabel(/Dirección/i).fill('Calle Falsa 123');
    await page.getByLabel(/Correo/i).fill('test@email.com');

    await page.getByRole('button', { name: /Confirmar pedido/i }).click();
    await expect(page.getByRole('heading', { name: /Seguimiento/i })).toBeVisible();
  });
});
