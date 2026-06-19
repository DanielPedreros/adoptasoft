import { useState } from 'react';
import MascotaController from '../../controllers/MascotaController';
import MascotaForm from '../../views/Mascotas/MascotaForm';
import MascotaList from '../../views/Mascotas/MascotaList';

const mascotaController = new MascotaController();

function Mascotas() {
  const [mascotas, setMascotas] = useState(mascotaController.getAll());

  const handleAdd = pet => {
    mascotaController.addMascota(pet);
    setMascotas(mascotaController.getAll());
  };

  return (
    <div className="view active">
      <div className="page-hdr">
        <div>
          <h2>🐾 Mis Mascotas</h2>
          <p>Registra y gestiona tus animales</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-title">➕ Registrar Nueva Mascota</div>
        <MascotaForm onSubmit={handleAdd} />
      </div>
      <div className="sec-label">Mis Mascotas</div>
      <MascotaList mascotas={mascotas} />
    </div>
  );
}

export default Mascotas;
