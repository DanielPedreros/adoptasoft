import { useState } from 'react';
import MascotaController from '../../controllers/MascotaController';
import HistorialController from '../../controllers/HistorialController';

const mascotaController = new MascotaController();
const historialController = new HistorialController();

function RegistrarConsulta() {
  const mascotas = mascotaController.getAll();
  const [selected, setSelected] = useState(mascotas[0]?.id || '');
  const [form, setForm] = useState({ tipo: 'Diagnóstico', fecha: '', descripcion: '', peso: '', medicamento: '', proximaCita: '' });
  const [message, setMessage] = useState('');

  const handleSave = () => {
    const mascota = mascotas.find(p => p.id === selected);
    if (!mascota || !form.descripcion) {
      setMessage('Selecciona paciente y descripción.');
      return;
    }
    historialController.addRecord({
      paciente: `${mascota.nombre} - ${mascota.raza || mascota.especie.replace(/^\S+\s/, '')}`,
      tipo: form.tipo,
      descripcion: form.descripcion,
      fecha: form.fecha || new Date().toISOString().slice(0, 10),
      medicacion: form.medicamento,
    });
    setMessage('Registro guardado en historial.');
    setForm({ ...form, descripcion: '', medicamento: '' });
  };

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>📋 Registrar Consulta</h2>
          <p>Diagnóstico, vacunas y tratamientos</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-title">✏️ Nueva Entrada de Historial</div>
        <div className="fgrid g3">
          <div className="fgrp">
            <label>Paciente *</label>
            <select value={selected} onChange={e => setSelected(e.target.value)}>
              {mascotas.map(p => (<option key={p.id} value={p.id}>{`${p.nombre} - ${p.raza || p.especie.replace(/^\S+\s/, '')}`}</option>))}
            </select>
          </div>
          <div className="fgrp">
            <label>Tipo de Registro</label>
            <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
              <option>Diagnóstico</option>
              <option>Vacuna</option>
              <option>Tratamiento</option>
              <option>Control</option>
            </select>
          </div>
          <div className="fgrp"><label>Fecha</label><input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} /></div>
          <div className="fgrp span2"><label>Descripción / Diagnóstico *</label><input type="text" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción detallada..." /></div>
          <div className="fgrp"><label>Peso Actual (kg)</label><input type="number" value={form.peso} onChange={e => setForm({ ...form, peso: e.target.value })} placeholder="12.5" step="0.1" /></div>
          <div className="fgrp span2"><label>Medicamento / Tratamiento</label><input type="text" value={form.medicamento} onChange={e => setForm({ ...form, medicamento: e.target.value })} placeholder="Medicamento, dosis, duración..." /></div>
          <div className="fgrp"><label>Próxima Cita</label><input type="date" value={form.proximaCita} onChange={e => setForm({ ...form, proximaCita: e.target.value })} /></div>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" type="button" onClick={handleSave}>💾 Guardar Registro</button>
          <button className="btn btn-ghost" type="button">Cancelar</button>
        </div>
        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </div>
    </div>
  );
}

export default RegistrarConsulta;
