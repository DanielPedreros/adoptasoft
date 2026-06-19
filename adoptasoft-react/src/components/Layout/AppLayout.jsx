import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const roleMap = {
  owner: { subtitle: 'Gestión de Mascotas' },
  vet: { subtitle: 'Panel Veterinario' },
  admin: { subtitle: 'Panel de Administración' },
};

function AppLayout() {
  const location = useLocation();
  const [, role] = location.pathname.split('/');
  const config = roleMap[role] || roleMap.owner;

  return (
    <div className="app-shell active">
      <Header subtitle={config.subtitle} />
      <div className="app-body">
        <Sidebar role={role} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <div className="sidebar-overlay" />
    </div>
  );
}

export default AppLayout;
