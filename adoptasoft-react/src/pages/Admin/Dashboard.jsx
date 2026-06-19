import UsuarioController from '../../controllers/UsuarioController';
import VeterinarioController from '../../controllers/VeterinarioController';

const usuarioController = new UsuarioController();
const veterinarioController = new VeterinarioController();

function Dashboard() {
  const users = usuarioController.getAll();
  const vets = veterinarioController.getAll();

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>🛡️ Panel de Administración</h2>
          <p>Gestión global del sistema</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="sv">{users.length}</div><div className="sl">Usuarios Totales</div></div>
        <div className="stat accent-stat"><div className="sv">{vets.length}</div><div className="sl">Veterinarios</div></div>
        <div className="stat green-stat"><div className="sv">{users.filter(u => u.role === 'owner').length}</div><div className="sl">Dueños</div></div>
        <div className="stat blue-stat"><div className="sv">98%</div><div className="sl">Uptime</div></div>
      </div>
    </div>
  );
}

export default Dashboard;
