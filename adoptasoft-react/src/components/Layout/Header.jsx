import { useNavigate } from 'react-router-dom';

function Header({ subtitle = 'Sistema de Gestión de Adopciones' }) {
  const navigate = useNavigate();

  return (
    <header className="app-hdr">
      <button className="sidebar-toggle" type="button" aria-label="Menú" onClick={() => document.body.classList.toggle('sidebar-open')}>
        ☰
      </button>
      <div className="hdr-logo">🐾</div>
      <div>
        <div className="hdr-title">Adoptasoft</div>
        <div className="hdr-sub">{subtitle}</div>
      </div>
      <div className="hdr-role show">Sesión activa</div>
      <button className="hdr-logout show" type="button" onClick={() => navigate('/')}>⬅ Salir</button>
    </header>
  );
}

export default Header;
