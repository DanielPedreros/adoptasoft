import { useState } from 'react';

function MascotaForm({ onSubmit }) {
  const [form, setForm] = useState({ nombre: '', especie: '', raza: '', edad: '', peso: '', sexo: '' });

  return (
    <>
      <div className="fgrid g3">
        <div className="fgrp"><label>Nombre *</label><input type="text" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Ej: Luna" /></div>
        <div className="fgrp"><label>Especie *</label><select value={form.especie} onChange={e => setForm({ ...form, especie: e.target.value })}><option value="">Seleccionar</option><option>🐕 Perro</option><option>🐈 Gato</option><option>🐇 Conejo</option><option>🐦 Ave</option><option>Otro</option></select></div>
        <div className="fgrp"><label>Raza</label><input type="text" value={form.raza} onChange={e => setForm({ ...form, raza: e.target.value })} placeholder="Ej: Labrador" /></div>
        <div className="fgrp"><label>Edad</label><input type="text" value={form.edad} onChange={e => setForm({ ...form, edad: e.target.value })} placeholder="Ej: 2 años" /></div>
        <div className="fgrp"><label>Peso (kg)</label><input type="number" value={form.peso} onChange={e => setForm({ ...form, peso: e.target.value })} placeholder="12.5" step="0.1" /></div>
        <div className="fgrp"><label>Sexo</label><select value={form.sexo} onChange={e => setForm({ ...form, sexo: e.target.value })}><option value="">—</option><option>Macho</option><option>Hembra</option></select></div>
      </div>
      <div className="btn-row" style={{ marginTop: 8 }}>
        <button className="btn btn-primary" type="button" onClick={() => onSubmit(form)}>🐾 Guardar Mascota</button>
      </div>
    </>
  );
}

export default MascotaForm;
