import { Link } from 'react-router-dom';

function LoginView({ email, password, role, error, onEmailChange, onPasswordChange, onRoleChange, onLogin }) {
  return (
    <div className="login-screen">
      <div className="login-split">
        <div className="login-left">
          <div className="login-left-top">
            <div className="login-wordmark">Adopta<b>soft</b></div>
          </div>
          <div className="login-illu-wrap">
            <div style={{ fontSize: 120 }}>🐾</div>
          </div>
          <div>
            <div className="login-headline">Encuentra a tu<br />nuevo <span className="hl">mejor amigo</span>.</div>
            <p className="login-tagline">Gestiona mascotas, citas e historiales clínicos en un solo lugar, pensado para dueños, veterinarios y administradores.</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-right-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <span className="login-wordmark" style={{ fontSize: 19 }}>Adopta<b>soft</b></span>
            </div>
            <h2 className="login-right-title">Iniciar sesión en <span style={{ color: 'var(--teal2)' }}>Adoptasoft</span></h2>
            <span className="role-selector-label">Selecciona tu perfil</span>
            <div className="role-selector">
              {['owner', 'vet', 'admin'].map(item => (
                <button key={item} type="button" className={`role-btn${role === item ? ' sel' : ''}`} onClick={() => onRoleChange(item)}>
                  <div className="ri">{item === 'owner' ? '🐶' : item === 'vet' ? '🩺' : '🛡️'}</div>
                  <div className="rl">{item === 'owner' ? 'Dueño' : item === 'vet' ? 'Veterinario' : 'Admin'}</div>
                </button>
              ))}
            </div>
            <div className="login-form">
              <div className="fgrp">
                <label>Correo Electrónico</label>
                <input type="email" value={email} onChange={e => onEmailChange(e.target.value)} placeholder="Correo electrónico o número de celular" />
              </div>
              <div className="fgrp">
                <label>Contraseña</label>
                <input type="password" value={password} onChange={e => onPasswordChange(e.target.value)} placeholder="Contraseña" />
              </div>
              <button className="btn btn-primary" type="button" onClick={onLogin}>Iniciar sesión</button>
              <div className="login-links">
                <Link to="/recover">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="or-div">o continúa con</div>
              <button className="btn btn-ghost" type="button" style={{ width: '100%', marginBottom: 10 }}>🔵 Continuar con Google</button>
              <Link className="btn btn-create-account" to="/register">Crear cuenta nueva</Link>
              {error && <p style={{ marginTop: 14, color: 'var(--red)' }}>{error}</p>}
            </div>
            <div className="login-footer-mark">🐾 Adoptasoft</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
