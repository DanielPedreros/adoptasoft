import Veterinario from '../models/Veterinario.js';

class VeterinarioRepository {
  constructor() {
    this.veterinarios = [
      new Veterinario({ id: 'v-1', nombre: 'Dr. Carlos Ramírez', especialidad: 'Medicina General', clinica: 'Clínica VetCare', registro: 'RM 2045', horario: 'Lun–Vie 8–17h', activo: true }),
      new Veterinario({ id: 'v-2', nombre: 'Dra. Laura Torres', especialidad: 'Cirugía', clinica: 'Animal Hospital', registro: 'RM 7401', horario: 'Mar–Sáb 9–18h', activo: true }),
    ];
  }

  getAll() {
    return [...this.veterinarios];
  }
}

export default new VeterinarioRepository();
