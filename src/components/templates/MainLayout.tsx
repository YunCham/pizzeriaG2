import { Outlet } from 'react-router-dom';
import { Header } from '../atoms/Header';
import { Footer } from '../atoms/Footer';

export function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
