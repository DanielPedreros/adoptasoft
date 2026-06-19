import MascotaController from '../../controllers/MascotaController';

const mascotaController = new MascotaController();

function Pacientes() {
  const mascotas = mascotaController.getAll();

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>🐾 Mis Pacientes</h2>
          <p>Todos los pacientes bajo tu cuidado</p>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar por nombre o dueño..." />
        <button className="btn btn-outline btn-sm" type="button">🔍 Buscar</button>
      </div>
      <div className="ilist">
        {mascotas.map(p => (
          <div className="iitem" key={p.id}>
            <div className="iico">{p.especie.includes('🐈') ? '🐈' : '🐕'}</div>
            <div className="iinfo"><strong>{p.nombre} — {p.raza || p.especie.replace(/^\S+\s/, '')}</strong><span>Última consulta reciente</span></div>
            <div className="status-sel">
              <button className="ss-btn active-st">Activo</button>
              <button className="ss-btn">Pendiente</button>
              <button className="ss-btn">Rechazado</button>
            </div>
            <button className="btn btn-ghost btn-sm" type="button">Ver historial</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pacientes;
