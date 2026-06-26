# AGENTS.md

## Proyecto
Frontend web de pedidos de una pizzeria construido con React, TypeScript y Vite.

## CASO
El negocio
Una pizzería de barrio que vendía solo por teléfono quiere lanzar su plataforma de pedidos en línea.
Los clientes arman su pizza, hacen el pedido y siguen su preparación hasta que sale a reparto.
El flujo imita una cocina real: cuando entra un pedido, la cocina verifica que existan los ingredientes,
lo prepara y, una vez listo, se asigna a un repartidor. Si falta un ítem, el pedido se rechaza antes de
cocinarse.

## Objetivo de código
Generar código simple, legible, mantenible y fácil de entender para otro desarrollador y responsive.

## Stack
- React
- TypeScript
- Vite
- React Router
- TanStack Query para datos remotos
- Axios para HTTP
- Zod para validación
- React Hook Form para formularios
- Vitest + React Testing Library
- Playwright para pruebas E2E

## Arquitectura
- Usar Atomic Design para componentes reutilizables:
  - atoms
  - molecules
  - organisms
  - templates
  - pages
- Usar arquitectura por funcionalidades en `src/features`.
- Cada feature puede tener: api, components, hooks, types, pages y schemas.
- No colocar lógica de negocio compleja en componentes visuales.
- No hacer llamadas HTTP directamente desde componentes.
- Todas las llamadas HTTP deben vivir en `src/features/<feature>/api`.

## TypeScript
- TypeScript estricto.
- No usar `any`.
- Usar `type` para estructuras de datos.
- Usar `interface` solo cuando se requiera extensión o contratos orientados a objetos.
- Tipar props, respuestas API, parámetros y estados.
- No usar casts (`as`) salvo que sea estrictamente necesario y documentar el motivo.

## Componentes
- Un componente por archivo.
- Usar nombres descriptivos en PascalCase.
- Props con nombres claros.
- Evitar componentes de más de 200 líneas.
- Extraer lógica a hooks personalizados cuando sea reutilizable.
- No crear componentes genéricos innecesarios.

## Atomic Design
- Atom: elemento básico reutilizable, por ejemplo Button, Input, Label, Icon.
- Molecule: combinación pequeña de atoms, por ejemplo SearchInput, FormField.
- Organism: bloque funcional completo, por ejemplo UserForm, ProductTable, Header.
- Template: estructura de página sin datos específicos.
- Page: conecta ruta, datos y template.

## API
- Usar Axios mediante un cliente HTTP centralizado.
- Usar variables de entorno para base URL.
- Manejar errores de forma centralizada.
- Definir tipos Request y Response.
- Usar GET, POST, PUT, PATCH y DELETE según corresponda.
- Nunca dejar URLs hardcodeadas dentro de componentes.
- Nunca usar datos mock directamente dentro de una página si existe un servicio mock.

## Datos mock
- Los mocks deben estar en `public/mocks/*.json`.
- Crear una capa de servicio mock para simular GET, POST, PUT, PATCH y DELETE.
- Los mocks deben mantener consistencia de IDs.
- No modificar archivos JSON sin indicar qué cambió.

## Calidad
Antes de marcar una tarea como terminada ejecutar:
1. pnpm run lint
2. pnpm run typecheck
3. pnpm run test
4. pnpm run build

Si se modifica una pantalla o flujo principal:
5. Ejecutar prueba E2E o probar manualmente en navegador.

## Verificación
No afirmar que algo funciona si no se ejecutaron las verificaciones.
Informar siempre:
- archivos modificados;
- comandos ejecutados;
- resultado real;
- errores encontrados;
- tareas pendientes.

## Seguridad
- Nunca exponer `.env`, tokens o claves.
- No hacer deploy, git push o cambios destructivos sin confirmación.
- No borrar archivos, rutas ni mocks sin confirmación.
- Solo ignorar opencode.json en .gitignore