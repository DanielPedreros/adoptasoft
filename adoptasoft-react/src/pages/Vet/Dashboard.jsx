import MascotaController from '../../controllers/MascotaController';
import CitaController from '../../controllers/CitaController';
import VeterinarioController from '../../controllers/VeterinarioController';

const mascotaController = new MascotaController();
const citaController = new CitaController();
const veterinarioController = new VeterinarioController();

function Dashboard() {
  const pets = mascotaController.getAll();
  const citas = citaController.getAll();
  const vets = veterinarioController.getAll();

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>🏠 Panel Veterinario</h2>
          <p>Bienvenido de vuelta, Dr.</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="sv">{citas.length}</div><div className="sl">Citas Totales</div></div>
        <div className="stat accent-stat"><div className="sv">{pets.length}</div><div className="sl">Pacientes Activos</div></div>
        <div className="stat green-stat"><div className="sv">{vets.length}</div><div className="sl">Veterinarios</div></div>
        <div className="stat blue-stat"><div className="sv">{pets.filter(p => p.especie.includes('🐈')).length}</div><div className="sl">Mascotas Gatos</div></div>
      </div>
    </div>
  );
}

export default Dashboard;
