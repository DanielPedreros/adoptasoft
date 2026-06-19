import { useState } from 'react';
import CitaController from '../../controllers/CitaController';

const citaController = new CitaController();

function Agenda() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const agenda = citaController.getAll();

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>📆 Mi Agenda</h2>
          <p>Citas del día</p>
        </div>
        <div className="fgrp" style={{ margin: 0, width: 160 }}>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ margin: 0 }} />
        </div>
      </div>
      <div className="ilist">
        {agenda.map(cita => (
          <div className="iitem" key={cita.id}>
            <div className="iico">🕗</div>
            <div className="iinfo"><strong>{cita.hora} — {cita.mascota}</strong><span>{cita.tipo} · {cita.veterinario}</span></div>
            <div className="status-sel">
              <button className="ss-btn active-st">Activo</button>
              <button className="ss-btn pending-st">Pendiente</button>
              <button className="ss-btn">Rechazado</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agenda;
