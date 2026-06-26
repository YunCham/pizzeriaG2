# API Pizzería - Guía de Uso

Este proyecto cuenta con una estructura de APIs bien organizada para consumir los endpoints de json-server.

## Estructura

```
src/
├── http/
│   ├── client.ts          # Cliente HTTP centralizado con axios
│   └── index.ts
├── features/
│   ├── clientes/
│   │   ├── api/           # Servicios HTTP
│   │   └── types/         # Tipos TypeScript
│   ├── items/
│   │   ├── api/
│   │   └── types/
│   ├── productos/
│   │   ├── api/
│   │   └── types/
│   └── pedidos/
│       ├── api/
│       ├── types/
│       └── schemas/       # Validación con Zod
```

## Uso en Componentes

### 1. Obtener todos los clientes

```typescript
import { clientesApi } from '@/features';

const App = () => {
  const [clientes, setClientes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    clientesApi.getAll().then(setClientes).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando...</div>;
  return <div>{clientes.map(c => <p key={c.id}>{c.nombre}</p>)}</div>;
};
```

### 2. Crear un pedido

```typescript
import { pedidosApi, crearPedidoSchema } from '@/features';

const crearPedido = async () => {
  const datosNuevo = {
    clienteId: 'cli-001',
    direccion: 'Av. Roca y Coronado #456',
    productos: [
      {
        productoId: 'prod-001',
        cantidad: 2,
        itemsPersonalizados: [
          { itemId: 'item-001', nombre: 'Queso Mozzarella', cantidad: 2 },
          { itemId: 'item-002', nombre: 'Jamón', cantidad: 1 }
        ]
      }
    ]
  };

  // Validar antes de enviar
  const validado = crearPedidoSchema.parse(datosNuevo);
  const pedido = await pedidosApi.create(validado);
  console.log('Pedido creado:', pedido);
};
```

### 3. Obtener pedidos de un cliente

```typescript
import { pedidosApi } from '@/features';

const pedidosDelCliente = await pedidosApi.getByClienteId('cli-001');
```

### 4. Actualizar estado de pedido

```typescript
import { pedidosApi } from '@/features';

await pedidosApi.updateEstado('ped-001', 'preparando');
await pedidosApi.updateEstado('ped-001', 'listo');
await pedidosApi.asignarRepartidor('ped-001', 'rep-001');
```

### 5. Con React Query (recomendado)

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { pedidosApi } from '@/features';

function PedidosList() {
  const { data: pedidos, isLoading } = useQuery({
    queryKey: ['pedidos'],
    queryFn: () => pedidosApi.getAll(),
  });

  const { mutate: crearPedido } = useMutation({
    mutationFn: (datos) => pedidosApi.create(datos),
    onSuccess: () => {
      // Refrescar lista
    },
  });

  return (
    <div>
      {isLoading ? <p>Cargando...</p> : pedidos?.map(p => <div key={p.id}>{p.id}</div>)}
    </div>
  );
}
```

## APIs Disponibles

### Clientes

- `clientesApi.getAll()` - Obtener todos
- `clientesApi.getById(id)` - Obtener por ID
- `clientesApi.create(data)` - Crear cliente
- `clientesApi.update(id, data)` - Actualizar
- `clientesApi.delete(id)` - Eliminar

### Items

- `itemsApi.getAll()` - Obtener todos
- `itemsApi.getById(id)` - Obtener por ID
- `itemsApi.create(data)` - Crear
- `itemsApi.update(id, data)` - Actualizar
- `itemsApi.delete(id)` - Eliminar

### Productos

- `productosApi.getAll()` - Obtener todos
- `productosApi.getById(id)` - Obtener por ID
- `productosApi.create(data)` - Crear
- `productosApi.update(id, data)` - Actualizar
- `productosApi.delete(id)` - Eliminar

### Pedidos

- `pedidosApi.getAll()` - Obtener todos
- `pedidosApi.getById(id)` - Obtener por ID
- `pedidosApi.getByClienteId(clienteId)` - Obtener por cliente
- `pedidosApi.create(data)` - Crear nuevo pedido
- `pedidosApi.updateEstado(id, estado)` - Cambiar estado
- `pedidosApi.asignarRepartidor(id, repartidorId)` - Asignar repartidor
- `pedidosApi.update(id, data)` - Actualizar
- `pedidosApi.delete(id)` - Eliminar

## Estados de Pedido

- `'pendiente'` - Recién creado, pendiente de verificación
- `'rechazado'` - Rechazado (falta algún ítem)
- `'preparando'` - En preparación en la cocina
- `'listo'` - Listo para repartir
- `'enviado'` - En ruta con repartidor
- `'entregado'` - Entregado al cliente

## Variables de Entorno

El archivo `.env.local` contiene:

```
VITE_API_BASE_URL=http://localhost:3000
```

Cambia esta URL si tu json-server está en otro puerto.

## Manejo de Errores

Todos los métodos lanzan excepciones. Manéjalas en tus componentes:

```typescript
try {
  const pedido = await pedidosApi.getById('ped-001');
} catch (error) {
  console.error('Error:', error.response?.data || error.message);
}
```

## Validación con Zod

Para pedidos, valida antes de enviar:

```typescript
import { crearPedidoSchema } from '@/features';

try {
  const datos = crearPedidoSchema.parse(datosDelFormulario);
  await pedidosApi.create(datos);
} catch (error) {
  console.error('Errores de validación:', error.errors);
}
```
