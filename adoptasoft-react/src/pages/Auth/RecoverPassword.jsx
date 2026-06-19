import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthController from '../../controllers/AuthController';

const authController = new AuthController();

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const response = authController.recover(email);
    setMessage(response.message);
  };

  return (
    <div className="view active" style={{ padding: 28, maxWidth: 620, margin: '0 auto' }}>
      <div className="page-hdr">
        <div>
          <h2>🔑 Recuperar contraseña</h2>
          <p>Envía tu correo y recibe instrucciones para restablecer tu cuenta.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="fgrp">
          <label>Correo</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.com" />
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" type="button" onClick={handleSubmit}>Enviar enlace</button>
          <button className="btn btn-ghost" type="button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
        {message && <p style={{ marginTop: 14 }}>{message}</p>}
      </div>
    </div>
  );
}

export default RecoverPassword;
