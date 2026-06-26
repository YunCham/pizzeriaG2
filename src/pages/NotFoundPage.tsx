import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="page">
      <h1>404 — Página no encontrada</h1>
      <p>Esta pizza no está en nuestro menú.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}
