import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import RecoverPassword from '../pages/Auth/RecoverPassword';
import Register from '../pages/Auth/Register';
import AppLayout from '../components/Layout/AppLayout';
import OwnerDashboard from '../pages/Owner/Dashboard';
import Mascotas from '../pages/Owner/Mascotas';
import Citas from '../pages/Owner/Citas';
import Historial from '../pages/Owner/Historial';
import VetDashboard from '../pages/Vet/Dashboard';
import Agenda from '../pages/Vet/Agenda';
import Pacientes from '../pages/Vet/Pacientes';
import RegistrarConsulta from '../pages/Vet/RegistrarConsulta';
import AdminDashboard from '../pages/Admin/Dashboard';
import Usuarios from '../pages/Admin/Usuarios';
import Veterinarios from '../pages/Admin/Veterinarios';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recover" element={<RecoverPassword />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/mascotas" element={<Mascotas />} />
          <Route path="/owner/citas" element={<Citas />} />
          <Route path="/owner/historial" element={<Historial />} />
          <Route path="/vet" element={<VetDashboard />} />
          <Route path="/vet/agenda" element={<Agenda />} />
          <Route path="/vet/pacientes" element={<Pacientes />} />
          <Route path="/vet/consultas" element={<RegistrarConsulta />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/veterinarios" element={<Veterinarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
