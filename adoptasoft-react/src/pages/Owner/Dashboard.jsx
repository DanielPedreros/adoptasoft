import { useNavigate } from 'react-router-dom';
import MascotaController from '../../controllers/MascotaController';
import CitaController from '../../controllers/CitaController';
import HistorialController from '../../controllers/HistorialController';

const mascotaController = new MascotaController();
const citaController = new CitaController();
const historialController = new HistorialController();

function Dashboard() {
  const mascotas = mascotaController.getAll();
  const citas = citaController.getAll();
  const historiales = historialController.getAll();
  const navigate = useNavigate();

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>🏠 Inicio</h2>
          <p>Resumen de tus mascotas y citas</p>
        </div>
      </div>
      <div className="stats">
        <div className="stat"><div className="sv">{mascotas.length}</div><div className="sl">Mis Mascotas</div></div>
        <div className="stat accent-stat"><div className="sv">{citas.length}</div><div className="sl">Citas programadas</div></div>
        <div className="stat green-stat"><div className="sv">{historiales.length}</div><div className="sl">Entradas de historial</div></div>
        <div className="stat blue-stat"><div className="sv">{mascotas.filter(p => p.especie.includes('🐕')).length}</div><div className="sl">Mascotas activas</div></div>
      </div>
      <div className="sec-label">Accesos Rápidos</div>
      <div className="cg">
        <button className="dc" type="button" onClick={() => navigate('/owner/mascotas')}>
          <div className="di">🐾</div>
          <div><div className="dn">Mis Mascotas</div><div className="ds">Gestiona tus animales</div></div>
        </button>
        <button className="dc" type="button" onClick={() => navigate('/owner/citas')}>
          <div className="di">📅</div>
          <div><div className="dn">Agendar Cita</div><div className="ds">Selecciona turno disponible</div></div>
        </button>
        <button className="dc" type="button" onClick={() => navigate('/owner/historial')}>
          <div className="di">📋</div>
          <div><div className="dn">Historial Médico</div><div className="ds">Vacunas y diagnósticos</div></div>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
