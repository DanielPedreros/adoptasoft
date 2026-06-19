import { useState } from 'react';
import UsuarioController from '../../controllers/UsuarioController';
import UsuarioList from '../../views/Usuarios/UsuarioList';

const usuarioController = new UsuarioController();

function Usuarios() {
  const [users, setUsers] = useState(usuarioController.getAll());
  const [form, setForm] = useState({ nombre: '', email: '', role: 'owner', telefono: '', documento: '' });

  const handleAdd = () => {
    usuarioController.create({ ...form, password: '123' });
    setUsers(usuarioController.getAll());
    setForm({ nombre: '', email: '', role: 'owner', telefono: '', documento: '' });
  };

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>👥 Usuarios</h2>
          <p>Gestión de todos los usuarios del sistema</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-title">➕ Crear Nuevo Usuario</div>
        <div className="fgrid g3">
          <div className="fgrp"><label>Nombre Completo *</label><input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} type="text" placeholder="Nombre" /></div>
          <div className="fgrp"><label>Correo *</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" placeholder="correo@ejemplo.com" /></div>
          <div className="fgrp"><label>Rol *</label><select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option value="owner">dueño</option><option value="vet">veterinario</option><option value="admin">admin</option></select></div>
          <div className="fgrp"><label>Teléfono</label><input value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} type="tel" placeholder="+57 300 000 0000" /></div>
          <div className="fgrp"><label>Documento</label><input value={form.documento} onChange={e => setForm({ ...form, documento: e.target.value })} type="text" placeholder="CC o NIT" /></div>
          <div className="fgrp center-btn"><button className="btn btn-primary btn-sm" type="button" onClick={handleAdd}>➕ Crear Usuario</button></div>
        </div>
      </div>
      <div className="sec-label">Usuarios Registrados</div>
      <UsuarioList usuarios={users} />
    </div>
  );
}

export default Usuarios;
