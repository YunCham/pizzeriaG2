import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth-context';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          🍕 Pizzería
        </Link>
        <nav className="header__nav">
          <Link to="/">Menú</Link>
          <Link to="/carrito">Carrito</Link>
          {user ? (
            <>
              <span className="header__user">Hola, {user.nombre}</span>
              <button className="header__logout" onClick={logout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/iniciar-sesion">Iniciar sesión</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
