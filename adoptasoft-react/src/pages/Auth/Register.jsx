import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterView from '../../views/Auth/Register';
import AuthController from '../../controllers/AuthController';

const authController = new AuthController();

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'owner' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const response = authController.register({ nombre: form.name, email: form.email, password: form.password, role: form.role });
    setMessage(response.message);
    if (response.success) {
      setTimeout(() => navigate('/'), 500);
    }
  };

  return <RegisterView form={form} message={message} onChange={(field, value) => setForm({ ...form, [field]: value })} onSubmit={handleSubmit} />;
}

export default Register;
