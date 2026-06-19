import { useState } from 'react';
import MascotaController from '../../controllers/MascotaController';
import HistorialController from '../../controllers/HistorialController';

const mascotaController = new MascotaController();
const historialController = new HistorialController();

function Historial() {
  const mascotas = mascotaController.getAll();
  const [selected, setSelected] = useState(mascotas[0]?.id || '');
  const records = historialController.getRecords(selected);

  return (
    <div className="view active">
      <div className="page-hdr" style={{ alignItems: 'flex-start' }}>
        <div>
          <h2>📋 Historial Médico</h2>
          <p>{mascotas.find(p => p.id === selected)?.nombre || 'Selecciona un paciente'}</p>
        </div>
      </div>
      <div className="fgrp" style={{ marginBottom: 18, maxWidth: 320 }}>
        <label>Selecciona mascota</label>
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          {mascotas.map(p => (
            <option key={p.id} value={p.id}>{`${p.nombre} - ${p.raza || p.especie.replace(/^\S+\s/, '')}`}</option>
          ))}
        </select>
      </div>
      {records.length > 0 ? records.map(record => (
        <div key={record.id} className={`hitem ${record.cssClass}`}>
          <div className="ht">{record.icon} {record.tipo}</div>
          <div className="hd">{record.desc} · {record.dateLabel}{record.med ? ` · ${record.med}` : ''}</div>
        </div>
      )) : (
        <div className="empty-state">
          <div className="ei">📋</div>
          <p>Sin registros clínicos aún</p>
        </div>
      )}
    </div>
  );
}

export default Historial;
