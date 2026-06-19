import { NavLink } from 'react-router-dom';

const menuByRole = {
  owner: [
    { to: '/owner', label: '🏠 Inicio' },
    { to: '/owner/mascotas', label: '🐾 Mis Mascotas' },
    { to: '/owner/citas', label: '📅 Citas' },
    { to: '/owner/historial', label: '📋 Historial' },
  ],
  vet: [
    { to: '/vet', label: '🏠 Inicio' },
    { to: '/vet/agenda', label: '📆 Mi Agenda' },
    { to: '/vet/pacientes', label: '🐾 Pacientes' },
    { to: '/vet/consultas', label: '📋 Registrar Consulta' },
  ],
  admin: [
    { to: '/admin', label: '🏠 Inicio' },
    { to: '/admin/usuarios', label: '👥 Usuarios' },
    { to: '/admin/veterinarios', label: '🩺 Veterinarios' },
  ],
};

function Sidebar({ role }) {
  const list = menuByRole[role] || [];

  return (
    <nav className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-section">Navegación</div>
        {list.map(item => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}>
            <span className="tico">{item.label.split(' ')[0]}</span>
            <span>{item.label.replace(/^\S+\s?/, '')}</span>
          </NavLink>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="s-user">
          <div className="s-avatar">🐾</div>
          <div className="s-info">
            <strong>Adoptasoft</strong>
            <span>Sesión activa</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
