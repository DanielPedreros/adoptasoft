import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MascotaController from '../../controllers/MascotaController';
import CitaController from '../../controllers/CitaController';

const mascotaController = new MascotaController();
const citaController = new CitaController();
const veterinarios = ['Dr. Ramírez — General', 'Dra. Torres — Cirugía', 'Dr. Medina — Derma'];

function Citas() {
  const [form, setForm] = useState({ mascota: '', veterinario: '', tipo: '', fecha: '', motivo: '', hora: '' });
  const [citas, setCitas] = useState(citaController.getAll());
  const [slots] = useState(citaController.getAvailableSlots());
  const mascotas = mascotaController.getAll();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const result = citaController.scheduleCita(form);
    if (result.success) {
      setCitas(citaController.getAll());
      setForm({ mascota: '', veterinario: '', tipo: '', fecha: '', motivo: '', hora: '' });
    }
  };

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>📅 Citas</h2>
          <p>Agenda y administra tus citas veterinarias</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-title">📅 Nueva Cita Veterinaria</div>
        <div className="fgrid g3">
          <div className="fgrp">
            <label>Mascota *</label>
            <select value={form.mascota} onChange={e => setForm({ ...form, mascota: e.target.value })}>
              <option value="">Seleccionar</option>
              {mascotas.map(p => (<option key={p.id}>{`${p.nombre} - ${p.raza || p.especie.replace(/^\S+\s/, '')}`}</option>))}
            </select>
          </div>
          <div className="fgrp">
            <label>Veterinario</label>
            <select value={form.veterinario} onChange={e => setForm({ ...form, veterinario: e.target.value })}>
              <option value="">Seleccionar</option>
              {veterinarios.map(v => (<option key={v} value={v}>{v}</option>))}
            </select>
          </div>
          <div className="fgrp">
            <label>Tipo de Consulta</label>
            <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
              <option value="">—</option>
              <option>Consulta General</option>
              <option>Vacunación</option>
              <option>Control</option>
              <option>Urgencia</option>
            </select>
          </div>
          <div className="fgrp"><label>Fecha *</label><input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} /></div>
          <div className="fgrp span2"><label>Motivo</label><input type="text" value={form.motivo} onChange={e => setForm({ ...form, motivo: e.target.value })} placeholder="Descripción breve" /></div>
        </div>
        <div className="sec-label" style={{ marginTop: 8 }}>Turnos Disponibles · {form.veterinario || 'Dr. Ramírez'}</div>
        <div className="schedule" style={{ marginTop: 8 }}>
          {slots.map(slot => (
            <button key={slot} type="button" className={`slot${form.hora === slot ? ' selected' : ''}`} onClick={() => setForm({ ...form, hora: slot })}>{slot}</button>
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: 14 }}>
          <button className="btn btn-primary" type="button" onClick={handleSubmit}>📅 Confirmar Cita</button>
          <button className="btn btn-ghost" type="button" onClick={() => setForm({ mascota: '', veterinario: '', tipo: '', fecha: '', motivo: '', hora: '' })}>Limpiar</button>
        </div>
      </div>
      <div className="sec-label">Mis Citas</div>
      <div className="ilist">
        {citas.map(cita => (
          <div className="iitem" key={cita.id}>
            <div className="iico">📅</div>
            <div className="iinfo"><strong>{cita.mascota} — {cita.tipo}</strong><span>{cita.veterinario} · {cita.fecha} · {cita.hora}</span></div>
            <span className="ibadge green">{cita.estado}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Citas;
