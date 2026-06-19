import VeterinarioController from '../../controllers/VeterinarioController';

const controller = new VeterinarioController();

function Veterinarios() {
  const vets = controller.getAll();

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>🩺 Veterinarios</h2>
          <p>Gestión de especialistas del sistema</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-title">➕ Registrar Veterinario</div>
        <div className="fgrid g3">
          <div className="fgrp"><label>Nombre</label><input type="text" placeholder="Dr. Nombre" /></div>
          <div className="fgrp"><label>Especialidad</label><select><option>Medicina General</option><option>Cirugía</option><option>Dermatología</option><option>Cardiología</option><option>Oncología</option></select></div>
          <div className="fgrp"><label>Clínica</label><input type="text" placeholder="Nombre de la clínica" /></div>
          <div className="fgrp"><label>Registro Médico</label><input type="text" placeholder="RM 00000" /></div>
          <div className="fgrp"><label>Horario Inicio</label><input type="time" value="08:00" readOnly /></div>
          <div className="fgrp"><label>Horario Fin</label><input type="time" value="17:00" readOnly /></div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" type="button">💾 Registrar Veterinario</button>
          <button className="btn btn-ghost" type="button">Cancelar</button>
        </div>
      </div>
      <div className="sec-label">Veterinarios Activos</div>
      <div className="ilist">
        {vets.map(v => (
          <div className="iitem" key={v.id}>
            <div className="iico">🩺</div>
            <div className="iinfo"><strong>{v.nombre}</strong><span>{v.especialidad} · {v.clinica} · {v.horario}</span></div>
            <span className="ibadge green">Activo</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Veterinarios;
