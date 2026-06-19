import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginView from '../../views/Auth/Login';
import AuthController from '../../controllers/AuthController';

const authController = new AuthController();

function Login() {
  const [email, setEmail] = useState('dueno@demo.com');
  const [password, setPassword] = useState('123');
  const [role, setRole] = useState('owner');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const response = authController.login({ email, password, selectedRole: role });
    if (response.success) {
      navigate(`/${response.role}`);
    } else {
      setError(response.message);
    }
  };

  return (
    <LoginView
      email={email}
      password={password}
      role={role}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onRoleChange={setRole}
      onLogin={handleLogin}
    />
  );
}

export default Login;
