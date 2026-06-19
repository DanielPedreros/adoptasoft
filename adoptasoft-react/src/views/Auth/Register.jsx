function RegisterView({ form, message, onChange, onSubmit }) {
  return (
    <div className="view active" style={{ padding: 28, maxWidth: 620, margin: '0 auto' }}>
      <div className="page-hdr">
        <div>
          <h2>📝 Crear Cuenta</h2>
          <p>Completa los datos para registrarte en Adoptasoft.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-title">Registro</div>
        <div className="fgrid g3">
          <div className="fgrp"><label>Nombre Completo</label><input type="text" value={form.name} onChange={e => onChange('name', e.target.value)} placeholder="Tu nombre completo" /></div>
          <div className="fgrp"><label>Correo</label><input type="email" value={form.email} onChange={e => onChange('email', e.target.value)} placeholder="correo@ejemplo.com" /></div>
          <div className="fgrp"><label>Contraseña</label><input type="password" value={form.password} onChange={e => onChange('password', e.target.value)} placeholder="••••••••" /></div>
          <div className="fgrp"><label>Rol</label><select value={form.role} onChange={e => onChange('role', e.target.value)}><option value="owner">Dueño</option><option value="vet">Veterinario</option><option value="admin">Administrador</option></select></div>
        </div>
        <div className="btn-row" style={{ marginTop: 12 }}>
          <button className="btn btn-primary" type="button" onClick={onSubmit}>Registrarse</button>
        </div>
        {message && <p style={{ marginTop: 14 }}>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterView;
