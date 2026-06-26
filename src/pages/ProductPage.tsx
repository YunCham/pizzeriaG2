import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useProducto } from '../hooks/useProducto';
import { useCarrito } from '../hooks/useCarrito';
import { useToast } from '../hooks/useToast';
import { Button } from '../components/atoms/Button';
import { Spinner } from '../components/atoms/Spinner';
import { ItemRow } from '../components/molecules/ItemRow';
import { itemsApi } from '@/features';
import type { Item } from '@/features/items/types';

const EXTRA_COST = 5;

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { producto, loading: loadingProducto } = useProducto(id);
  const { addItem } = useCarrito();
  const { addToast } = useToast();

  const { data: allItems = [] } = useQuery({
    queryKey: ['items'],
    queryFn: () => itemsApi.getAll(),
  });

  const [cantidadPizzas, setCantidadPizzas] = useState(1);
  const [selected, setSelected] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!producto) return;
    const inicial: Record<string, number> = {};
    for (const base of producto.itemsBase) {
      inicial[base.itemId] = base.cantidad;
    }
    setSelected(inicial);
  }, [producto]);

  if (loadingProducto) return <Spinner />;
  if (!producto) return <p className="empty">Producto no encontrado.</p>;

  const baseItemIds = new Set(producto.itemsBase.map((b) => b.itemId));

  const extrasCount = Object.entries(selected)
    .filter(([itemId]) => !baseItemIds.has(itemId))
    .reduce((sum, [, qty]) => sum + qty, 0);

  const precioUnitario = producto.precio + extrasCount * EXTRA_COST;
  const subtotal = precioUnitario * cantidadPizzas;

  const handleIncrement = (itemId: string) => {
    setSelected((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const handleDecrement = (itemId: string) => {
    setSelected((prev) => {
      const next = { ...prev };
      const val = next[itemId];
      if (val <= 1) {
        delete next[itemId];
      } else {
        next[itemId] = val - 1;
      }
      return next;
    });
  };

  const handleAgregarAlCarrito = () => {
    const itemsPersonalizados = Object.entries(selected).map(([itemId, cantidad]) => {
      const item = allItems.find((i: Item) => i.id === itemId);
      return { itemId, nombre: item?.nombre ?? 'Desconocido', cantidad };
    });

    addItem({
      productoId: producto.id,
      nombre: producto.nombre,
      cantidad: cantidadPizzas,
      precioBase: producto.precio,
      precioUnitario,
      itemsPersonalizados,
    });
    addToast('success', `${producto.nombre} agregada al carrito`);
    navigate('/carrito');
  };

  return (
    <section className="page">
      <h1>{producto.nombre}</h1>
      <p className="product-card__price">${producto.precio} base</p>

      <div className="product-detail">
        <h3>Ingredientes</h3>
        <p className="product-detail__hint">
          Ajusta las cantidades. Pon en 0 para quitar un ingrediente.
          Cada extra suma <strong>$5</strong>.
        </p>

        <div className="item-selector">
          <h4>Base de la pizza</h4>
          {producto.itemsBase.map((base) => {
            const item = allItems.find((i: Item) => i.id === base.itemId);
            return (
              <ItemRow
                key={base.itemId}
                nombre={item?.nombre ?? base.nombre}
                cantidad={selected[base.itemId] ?? 0}
                onIncrement={() => handleIncrement(base.itemId)}
                onDecrement={() => handleDecrement(base.itemId)}
              />
            );
          })}
        </div>

        <div className="item-selector">
          <h4>Extras disponibles (+$5 c/u)</h4>
          {allItems
            .filter((item: Item) => !baseItemIds.has(item.id))
            .map((item: Item) => (
              <ItemRow
                key={item.id}
                nombre={item.nombre}
                cantidad={selected[item.id] ?? 0}
                max={item.cantidadDisponible}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
              />
            ))}
        </div>

        <div className="product-detail__resumen">
          <p>Precio por pizza: <strong>${precioUnitario}</strong></p>
          <p>Subtotal ({cantidadPizzas} pizza{cantidadPizzas > 1 ? 's' : ''}): <strong>${subtotal}</strong></p>
        </div>

        <div className="product-detail__actions">
          <label className="product-detail__label">
            Cantidad:
            <select value={cantidadPizzas} onChange={(e) => setCantidadPizzas(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <Button onClick={handleAgregarAlCarrito}>
            Agregar al carrito — ${subtotal}
          </Button>
        </div>
      </div>
    </section>
  );
}
